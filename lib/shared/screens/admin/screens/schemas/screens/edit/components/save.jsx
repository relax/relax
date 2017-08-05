import Button from 'components/button';
import Component from 'components/component';
import Warning from 'components/warning';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'components/animate';
import Spinner from 'components/spinner';

import styles from './save.less';

export default class SaveSchema extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    editingSchema: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired
  };

  getWarnings () {
    const {schema, editingSchema} = this.props;
    const result = [];

    // type has changed
    if (schema.type !== editingSchema.type) {
      if (editingSchema.type === 'data') {
        // changed from single -> data
        result.push({
          severity: 'alert',
          message: 'By changing the type from single to data means you\'ll loose all non custom properties (such as title, slug, pageData). This is not reversable!' // eslint-disable-line max-len
        });
      } else {
        // changed from data -> single
        result.push({
          severity: 'warning',
          message: 'By changing the type from data to single means unfilled properties (such as title and slug) will be filled with dummy content.' // eslint-disable-line max-len
        });
      }
    }

    // properties
    let removedProperty = false;
    let changedTitleProperty = false;
    let changedTypeProperty = false;

    forEach(schema.properties, (property) => {
      const editingProperty = find(editingSchema.properties, {_id: property._id});

      if (editingProperty) {
        // title changed
        if (property.title !== editingProperty.title || property.slug !== editingProperty.slug) {
          changedTitleProperty = true;
        }

        // type changed
        if (property.type !== editingProperty.type) {
          changedTypeProperty = true;
        }
      } else {
        // was removed
        removedProperty = true;
      }
    });

    // removed property
    if (removedProperty) {
      result.push({
        severity: 'alert',
        message: 'You have removed one or more properties. Data associated to removed properties will be forever lost!' // eslint-disable-line max-len
      });
    }

    // title changed
    if (changedTitleProperty) {
      result.push({
        severity: 'alert',
        message: 'You have changed one or more properties titles. Data links to components from these properties, if any, will brake. You will need to update these on the page builder where you\'re linking these properties.' // eslint-disable-line max-len
      });
    }

    // prop type changed
    if (changedTypeProperty) {
      result.push({
        severity: 'alert',
        message: 'You have changed one or more properties types. This might lead to data loss if the native types don\'t match. Be extra careful when doing this!' // eslint-disable-line max-len
      });
    }

    return result;
  }

  render () {
    return (
      <div className={styles.root}>
        {this.renderWarnings()}
        {this.renderSubmit()}
      </div>
    );
  }

  renderWarnings () {
    const warnings = this.getWarnings();
    let result;

    if (warnings.length) {
      result = warnings.map(this.renderWarning, this);
    } else {
      result = (
        <Warning severity='info'>
          No critical changes made, you can save without worrying to loose data
        </Warning>
      );
    }

    return result;
  }

  renderWarning (warning, key) {
    return (
      <Warning severity={warning.severity} key={key}>
        {warning.message}
      </Warning>
    );
  }

  renderSubmit () {
    const {saving, onSave} = this.props;
    let result;

    if (saving) {
      result = (
        <Animate key='saving'>
          <Spinner />
        </Animate>
      );
    } else {
      result = (
        <Animate key='buttons'>
          <Button
            primary
            big
            bordered
            noBackground
            thin
            onClick={onSave}
          >
            Save Changes
          </Button>
        </Animate>
      );
    }

    return (
      <div className={styles.submitHolder}>
        {result}
      </div>
    );
  }
}
