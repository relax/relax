import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

import Empty from './element/empty';

export default class ElementComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    relax: PropTypes.object.isRequired
  };

  renderContent (customProps, children = this.props.children) {
    const {relax} = this.props;
    const editing = relax.editing;
    let result;

    if (editing) {
      const droppableProps = Object.assign({
        dropInfo: {
          id: relax.element.id
        },
        type: relax.element.tag,
        placeholder: true,
        placeholderRender: ::this.renderPlaceholder
      }, this.constructor.settings.drop);

      result = (
        <Droppable {...droppableProps}>
          {children}
        </Droppable>
      );
    } else {
      result = children;
    }

    return result;
  }

  renderPlaceholder (options) {
    const {relax} = this.props;
    return (
      <Empty {...options} settings={this.constructor.settings} element={relax.element} />
    );
  }
}
