import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './model.less';
import Properties from './properties';

export default class SchemaModel extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaStepBack: PropTypes.func.isRequired,
    schemaStepForward: PropTypes.func.isRequired,
    addSchema: PropTypes.func.isRequired
  };

  @bind
  onDone () {
    const {schema, addSchema} = this.props;
    addSchema(schema);
  }

  render () {
    const {schema, schemaStepBack} = this.props;
    return (
      <Scrollable>
        <div className={styles.root}>
          <div>
            {this.renderSchemaType(schema.type)}
          </div>
          <div className={styles.header}>...and now create the content model.</div>
          <div className={styles.subHeader}>{`What properties will ${schema.title} single contain?`}</div>
          <Properties />
          <div className={styles.buttons}>
            <button className={styles.button} onClick={schemaStepBack}>
              Back
            </button>
            <button className={cx(styles.button, styles.primary)} onClick={this.onDone}>
              Done
            </button>
          </div>
        </div>
      </Scrollable>
    );
  }

  renderSchemaType (type) {
    const {schema} = this.props;
    let result;
    if (type === 'single') {
      result = (
        <div className={styles.option}>
          <i className={'nc-icon-outline design_webpage'} />
          <div className={styles.title}>{schema.title}</div>
        </div>
      );
    } else if (type === 'data') {
      result = (
        <div className={styles.option}>
          <i className={'nc-icon-outline files_single-copy-04'} />
          <div className={styles.title}>{schema.title}</div>
        </div>
      );
    }
    return result;
  }
}
