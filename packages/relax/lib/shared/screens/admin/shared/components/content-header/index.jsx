import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './index.less';

export default class ContentHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    smallPadding: PropTypes.bool
  };

  static defaultProps = {
    smallPadding: false
  };

  render () {
    const {smallPadding} = this.props;
    return (
      <div className={cx(styles.root, smallPadding && styles.smallPadding)}>
        {this.props.children}
      </div>
    );
  }
}
