import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './editing.less';

export default class EditingSymbol extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    element: PropTypes.any,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className={styles.root}>
        {this.renderState()}
      </div>
    );
  }

  renderState () {
    const {loading} = this.props;
    let result;

    if (loading) {
      result = (
        <div>Loading</div>
      );
    } else {
      const {onCancel, onSave} = this.props;
      result = (
        <div>
          <button
            className={styles.button}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={cx(styles.button, styles.save)}
            onClick={onSave}
          >
            Save changes
          </button>
        </div>
      );
    }

    return result;
  }
}
