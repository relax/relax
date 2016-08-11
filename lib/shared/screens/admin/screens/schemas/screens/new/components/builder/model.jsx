import cx from 'classnames';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './model.less';
import Progress from './progress';
import Properties from './properties';

export default class SchemaModel extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaStepBack: PropTypes.func.isRequired,
    schemaStepForward: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const {schema, schemaStepBack, schemaStepForward, onSubmit} = this.props;
    const {type} = schema;
    const isSingle = type === 'single';

    return (
      <Scrollable>
        <div className={styles.root}>
          <Progress schema={schema} title />
          <div className={styles.header}>...and now create the content model.</div>
          <div className={styles.subHeader}>{`What properties will ${schema.title} single contain?`}</div>
          <Properties />
          <div className={styles.buttons}>
            <button className={styles.button} onClick={schemaStepBack}>
              Back
            </button>
            <button
              className={cx(styles.button, styles.primary)}
              onClick={isSingle ? schemaStepForward : onSubmit}
            >
              {isSingle ? 'Next' : 'Create Schema'}
            </button>
          </div>
        </div>
      </Scrollable>
    );
  }
}
