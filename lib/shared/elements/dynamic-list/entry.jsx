import bind from 'decorators/bind';
import cx from 'classnames';
import Component from 'components/component';
import Droppable from 'components/dnd/droppable';
import React, {PropTypes} from 'react';

import settings from './settings';
import styles from './entry.less';
import Empty from '../element/empty';

export default class DynamicListEntry extends Component {
  static propTypes = {
    dummy: PropTypes.bool,
    columns: PropTypes.number.isRequired,
    isLinkingData: PropTypes.bool,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    editing: PropTypes.bool,
    horizontalGutter: PropTypes.string,
    element: PropTypes.object,
    elementsLinks: PropTypes.object,
    schemaEntry: PropTypes.object,
    renderChildren: PropTypes.func.isRequired,
    context: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  getStyle () {
    const {dummy, columns, isLinkingData, isFirst, isLast, horizontalGutter} = this.props;
    const style = {};
    const spaceThird = Math.round(parseInt(horizontalGutter, 10) / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;

    if (columns > 1) {
      style.width = `${100 / columns}%`;

      const property = !dummy && isLinkingData && 'border' || 'padding';

      if (isFirst) {
        style[`${property}Right`] = cx(`${spaceSides}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      } else if (isLast) {
        style[`${property}Left`] = cx(`${spaceSides}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      } else {
        style[`${property}Right`] = cx(`${spaceThird}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
        style[`${property}Left`] = cx(`${spaceThird}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      }

      if (dummy && isLinkingData) {
        style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      }
    }
    return style;
  }

  render () {
    const {dummy, editing} = this.props;
    let result;

    if (dummy) {
      result = this.renderWrapper();
    } else if (editing) {
      result = this.renderEditing();
    } else {
      result = this.renderWrapper(this.renderContent());
    }

    return result;
  }

  renderWrapper (children) {
    const {columns} = this.props;
    return (
      <div className={cx(columns > 1 && styles.column)} style={this.getStyle()}>
        {children}
      </div>
    );
  }

  renderEditing () {
    const {element, context} = this.props;
    return this.renderWrapper(
      <Droppable
        type={element.tag}
        dropInfo={{id: element.id, context}}
        {...settings.drop}
        placeholder
        placeholderRender={this.renderPlaceholder}
        style={{position: 'relative'}}
      >
        {this.renderContent()}
      </Droppable>
    );
  }

  renderContent () {
    const {elementsLinks, schemaEntry, element, children, renderChildren, context, editing} = this.props;

    return children && renderChildren({
      children: element.children,
      links: elementsLinks,
      entry: schemaEntry,
      context,
      editable: editing
    });
  }

  @bind
  renderPlaceholder (options) {
    const {element} = this.props;
    return (
      <Empty {...options} settings={settings} element={element} />
    );
  }
}
