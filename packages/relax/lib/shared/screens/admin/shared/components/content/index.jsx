import cx from 'classnames';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class Content extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    noPadding: PropTypes.bool,
    noOffset: PropTypes.bool,
    scrollableProps: PropTypes.object
  };

  render () {
    const {noPadding, scrollableProps, noOffset} = this.props;
    return (
      <Scrollable className={cx(styles.root, noOffset && styles.noOffset)} {...scrollableProps}>
        <div className={cx(styles.content, noPadding && styles.noPadding)}>
          {this.props.children}
        </div>
      </Scrollable>
    );
  }
}
