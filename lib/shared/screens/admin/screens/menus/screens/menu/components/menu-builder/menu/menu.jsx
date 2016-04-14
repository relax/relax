import bind from 'decorators/bind';
import Component from 'components/component';
import Dragger from 'components/dnd/dragger';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

import styles from './menu.less';

export default class Menu extends Component {
  static fragments = {
    menu: {
      _id: 1,
      data: 1
    }
  };

  static propTypes = {
    dragging: PropTypes.bool.isRequired
  };

  render () {
    return (
      <div>
        <Droppable
          placeholder
          placeholderRender={this.renderPlaceholder}
          dropInfo={{}}
          minHeight='100%'
        >
        </Droppable>
        {this.renderDragger()}
      </div>
    );
  }

  @bind
  renderPlaceholder () {
    return (
      <div className={styles.empty}>
        <div className={styles.title}>Drop your links here!</div>
        <div className={styles.text}>
          Drag pages or custom links from the left and drop them in this
          section to start building your menu structure.
        </div>
        <div className={styles.text}>
          Remember you can also sort them by moving them above or bellow other items.
        </div>
      </div>
    );
  }

  renderDragger () {
    const {dragging} = this.props;
    if (dragging) {
      return (
        <Dragger shadow={false} />
      );
    }
  }
}
