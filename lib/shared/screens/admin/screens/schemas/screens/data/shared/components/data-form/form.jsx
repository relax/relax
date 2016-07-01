import cx from 'classnames';
import Animate from 'components/animate';
import Button from 'components/button';
import Component from 'components/component';
import Content from 'components/content';
import ContentHeader from 'components/content-header';
import ContentLoading from 'components/content-loading';
import OptionsList from 'components/options-list';
import Spinner from 'components/spinner';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './form.less';

export default class DataSchemaForm extends Component {
  static propTypes = {
    schemaId: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    properties: PropTypes.array,
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    saved: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const {loading, properties} = this.props;
    let result;

    if (loading) {
      result = this.renderLoading();
    } else if (properties) {
      result = this.renderForm();
    }

    return result;
  }

  renderLoading () {
    return (
      <ContentLoading />
    );
  }

  renderForm () {
    const {properties, onChange, values, schemaId} = this.props;
    return (
      <div>
        <ContentHeader>
          <Link
            to={`/admin/schemas/data/${schemaId}`}
            className={styles.back}
          >
            <i className='nc-icon-outline arrows-1_small-triangle-left' />
            <span>Back to list</span>
          </Link>
        </ContentHeader>
        <Content>
          <OptionsList
            options={properties}
            values={values}
            onChange={onChange}
            white
          />
          <div className={styles.state}>
            {this.renderState()}
          </div>
        </Content>
      </div>
    );
  }

  renderState () {
    const {saving, saved, onSubmit} = this.props;
    let result;

    if (saving) {
      result = (
        <Animate key='saving'>
          <div>
            <Spinner />
            <span className={styles.savingLabel}>Creating</span>
          </div>
        </Animate>
      );
    } else if (saved) {
      result = (
        <Animate key='saved'>
          <div>
            <i className={cx(styles.success, 'nc-icon-mini ui-1_check')} />
            <span className={cx(styles.success, styles.successLabel)}>Saved successfuly</span>
          </div>
        </Animate>
      );
    } else {
      result = (
        <Animate key='button'>
          <Button primary onClick={onSubmit}>Create entry</Button>
        </Animate>
      );
    }

    return result;
  }
}
