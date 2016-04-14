import cx from 'classnames';
import Component from 'components/component';
import Draggable from 'components/dnd/draggable';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class MenuEntry extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  static defaultProps = {
    item: {}
  };

  render () {
    const {item} = this.props;
    const {label, type} = item;

    const dragInfo = {
      type: 'new',
      item
    };

    return (
      <Draggable dragInfo={dragInfo}>
        <div className={cx(styles.root, styles[type])}>
          {label || type === 'url' && 'Where Link appears to be dragged'}
        </div>
      </Draggable>
    );
  }
}
