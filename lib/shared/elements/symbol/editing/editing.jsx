import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Spinner from 'components/spinner';
import React from 'react';
import PropTypes from 'prop-types';

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
        <Animate key='saving'>
          <div>
            <Spinner />
            <span className={styles.loading}>Saving symbol</span>
          </div>
        </Animate>
      );
    } else {
      const {onCancel, onSave} = this.props;
      result = (
        <Animate key='content'>
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
        </Animate>
      );
    }

    return result;
  }
}
