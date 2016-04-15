import bind from 'decorators/bind';
import cx from 'classnames';
import Animate from 'components/animate';
import Component from 'components/component';
import Draggable from 'components/dnd/draggable';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class MenuEntry extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    children: PropTypes.node,
    dragging: PropTypes.bool,
    draggedMenuItem: PropTypes.func,
    positionInParent: PropTypes.number,
    draggingSelf: PropTypes.bool
  };

  static defaultProps = {
    item: {}
  };

  render () {
    const {item, positionInParent, draggingSelf} = this.props;
    const {label, type} = item;
    const isNew = !(item.id && true);

    const dragInfo = {
      type: isNew ? 'new' : 'move',
      item,
      id: item.id,
      parentId: item.parent,
      positionInParent
    };

    return (
      <Draggable dragInfo={dragInfo}>
        <div className={cx(styles.root, draggingSelf && styles.draggingSelf)}>
          <div className={cx(styles.info, styles[type])}>
            {label || type === 'url' && isNew && 'Where Link appears to be dragged'}
          </div>
          {!isNew && this.renderChildren()}
        </div>
      </Draggable>
    );
  }

  renderChildren () {
    const {item, dragging} = this.props;
    return (
      <Droppable
        className={styles.sub}
        dropInfo={{
          id: item.id
        }}
        placeholder={dragging}
        placeholderRender={this.renderPlaceholder}
        hidePlaceholder
        minHeight={dragging ? 30 : 0}
      >
        {this.props.children}
      </Droppable>
    );
  }

  @bind
  renderPlaceholder ({isActive}) {
    let placeholderContent;

    if (isActive) {
      placeholderContent = (
        <Animate transition='slideDownIn' key='drop'>
          <i className={cx('nc-icon-outline weather_drop-12', styles.dropIcon)} />
        </Animate>
      );
    } else {
      placeholderContent = (
        <Animate transition='slideUpIn' key='info'>
          <div className={styles.emptyText}>Drop here for sub link!</div>
        </Animate>
      );
    }

    return (
      <div className={cx(styles.empty, isActive && styles.active)}>
        {placeholderContent}
      </div>
    );
  }
}
