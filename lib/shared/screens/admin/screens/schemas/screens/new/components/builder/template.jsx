import Component from 'components/component';
import TemplatePicker from 'components/template';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/spinner';
import Animate from 'components/animate';
import Progress from './progress';
import styles from './template.less';

export default class SchemaTemplatePick extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaStepBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    newTemplate: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired
  };

  render () {
    const {schema} = this.props;

    return (
      <div className={styles.root}>
        <Progress schema={schema} title properties />
        <div className={styles.header}>
          ...Finally, let's create a new template or <br />
          assign an existing one
        </div>
        <div className={styles.subHeader}>
          What will <span className={styles.primary}>{schema.title}</span> look like?
        </div>
        <TemplatePicker />
        {this.renderButtons()}
      </div>
    );
  }

  renderButtons () {
    const {saving} = this.props;
    let result;

    if (saving) {
      result = (
        <Animate key='saving'>
          <Spinner />
        </Animate>
      );
    } else {
      const {schemaStepBack, onSubmit} = this.props;
      result = (
        <Animate key='buttons'>
          <div>
            <button className={styles.button} onClick={schemaStepBack}>
              Back
            </button>
            <button className={cx(styles.button, styles.primary)} onClick={onSubmit}>
              Create Schema
            </button>
          </div>
        </Animate>
      );
    }

    return (
      <div className={styles.buttons}>
        {result}
      </div>
    );
  }
}
