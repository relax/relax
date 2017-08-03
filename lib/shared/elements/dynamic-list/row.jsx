import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './row.less';

export default class DynamicListRow extends Component {
  static propTypes = {
    isLast: PropTypes.bool,
    isLinkingData: PropTypes.bool,
    verticalGutter: PropTypes.string,
    children: PropTypes.node
  };

  render () {
    const {isLast, isLinkingData, verticalGutter} = this.props;
    const style = {};

    if (!isLast) {
      if (isLinkingData) {
        style.borderBottom = `${verticalGutter} solid rgba(0, 0, 0, 0.8)`;
      } else {
        style.marginBottom = verticalGutter;
      }
    }

    return (
      <div className={styles.root} style={style}>
        {this.props.children}
      </div>
    );
  }
}
