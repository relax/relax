import Component from 'components/component';
import Properties from 'components/properties';
import Scrollable from 'components/scrollable';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'components/animate';
import Spinner from 'components/spinner';
import Progress from './progress';
import styles from './model.less';

export default class SchemaModel extends Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    schemaStepBack: PropTypes.func.isRequired,
    schemaStepForward: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired
  };

  render () {
    const {schema} = this.props;

    return (
      <Scrollable>
        <div className={styles.root}>
          <Progress schema={schema} title />
          <div className={styles.header}>...and now create the content model.</div>
          <div className={styles.subHeader}>{`What properties will ${schema.title} single contain?`}</div>
          <Properties />
          {this.renderButtons()}
        </div>
      </Scrollable>
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
      const {schema, schemaStepBack, schemaStepForward, onSubmit} = this.props;
      const {type} = schema;
      const isSingle = type === 'single';

      result = (
        <Animate key='buttons'>
          <div>
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
