import Component from 'components/component';
import TemplatePicker from 'components/template';
import cx from 'classnames';
import React, {PropTypes} from 'react';

import Progress from './progress';
import styles from './template.less';

export default class SchemaTemplatePick extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaStepBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    newTemplate: PropTypes.bool.isRequired
  };

  render () {
    const {
      schema,
      schemaStepBack,
      onSubmit
    } = this.props;

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
        <div className={styles.buttons}>
          <button className={styles.button} onClick={schemaStepBack}>
            Back
          </button>
          <button className={cx(styles.button, styles.primary)} onClick={onSubmit}>
            Create Schema
          </button>
        </div>
      </div>
    );
  }
}
