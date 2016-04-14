import cx from 'classnames';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class MenuEntry extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['url', 'page', 'schema']).isRequired
  };

  render () {
    const {label, type} = this.props;
    return (
      <div className={cx(styles.root, styles[type])}>
        {label || type === 'url' && 'Where Link appears to be dragged'}
      </div>
    );
  }
}
