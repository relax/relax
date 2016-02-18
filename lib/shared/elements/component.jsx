import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

export default class ElementComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    relax: PropTypes.object.isRequired
  };

  renderContent (customProps, children = this.props.children) {
    const {relax} = this.props;
    let result;
    const editing = relax.editing;
    if (editing) {
      const dropInfo = {
        id: relax.element.id
      };

      result = (
        <Droppable
          type={relax.element.tag}
          dropInfo={dropInfo}
          {...this.constructor.settings.drop}
          {...customProps}
          placeholder
        >
          {children}
        </Droppable>
      );
    } else {
      result = children;
    }

    return result;
  }
}
