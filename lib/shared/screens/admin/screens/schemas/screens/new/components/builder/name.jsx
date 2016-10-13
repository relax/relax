import React, {PropTypes} from 'react';

import Component from 'components/component';
import Input from 'components/modal-input';
import Permission from './permission';
import Scrollable from 'components/scrollable';
import bind from 'decorators/bind';
import cx from 'classnames';
import styles from './name.less';

export default class SchemaName extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaStepBack: PropTypes.func.isRequired,
    schemaStepForward: PropTypes.func.isRequired,
    changeSchemaTitle: PropTypes.func.isRequired,
    changeSchemaPermission: PropTypes.func.isRequired
  };

  @bind
  onSubmit (event) {
    event.preventDefault();
    this.props.schemaStepForward();
  }

  render () {
    const {schema, schemaStepBack, schemaStepForward, changeSchemaTitle, changeSchemaPermission} = this.props;
    return (
      <Scrollable>
        <div className={styles.content}>
          <div>
            {this.renderSchemaType(schema.type)}
          </div>
          <form className={styles.holder} onSubmit={this.onSubmit}>
            <div className={styles.header}>Let's give it a name!</div>
            <Input
              value={schema.title}
              onChange={changeSchemaTitle}
              focus
              placeholder='Content type name'
            />
          </form>
          <div className={styles.permissions}>
            <Permission
              value={schema.publicReadable}
              index='publicReadable'
              iconNegative='ui-1_eye-ban-20'
              titleNegative='Non public readable'
              labelNegative='This means only admins can see this schema entries'
              iconPositive='ui-1_eye-19'
              titlePositive='Public readable'
              labelPositive='This means anyone can see this schema entries'
              onChange={changeSchemaPermission}
            />
            <Permission
              value={schema.publicWritable}
              index='publicWritable'
              iconNegative='ui-1_edit-77'
              titleNegative='Non public writable'
              labelNegative='This means only admins can create new entries to this schema'
              iconPositive='ui-1_edit-76'
              titlePositive='Public writable'
              labelPositive='This means anyone can create new entries to this schema'
              onChange={changeSchemaPermission}
            />
          </div>
          <div className={styles.buttons}>
            <div className={styles.button} onClick={schemaStepBack}>
              Back
            </div>
            <div className={cx(styles.button, styles.primary)} onClick={schemaStepForward}>
              Next
            </div>
          </div>
        </div>
      </Scrollable>
    );
  }

  renderSchemaType (type) {
    let result;
    if (type === 'single') {
      result = (
        <div className={styles.option}>
          <i className={'nc-icon-outline design_webpage'} />
          <div className={styles.title}>With URL</div>
          <div className={styles.subTitle}>Single Page</div>
        </div>
      );
    } else if (type === 'data') {
      result = (
        <div className={styles.option}>
          <i className={'nc-icon-outline files_single-copy-04'} />
          <div className={styles.title}>Without URL</div>
          <div className={styles.subTitle}>Multiple Table Entries</div>
        </div>
      );
    }
    return result;
  }
}
