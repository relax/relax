import Component from 'components/component';
import ContextMenu from 'components/element-context-menu';
import Draggable from 'components/dnd/draggable';
import bind from 'decorators/bind';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './entry.less';

export default class Entry extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    hasChildren: PropTypes.bool.isRequired,
    ElementClass: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isOvered: PropTypes.bool.isRequired,
    hasLinks: PropTypes.bool.isRequired,
    isSelectable: PropTypes.bool.isRequired,
    positionInParent: PropTypes.number.isRequired,
    dragging: PropTypes.bool
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      options: false
    };
  }

  @bind
  onClick () {
    const {element, context, pageBuilderActions} = this.props;
    pageBuilderActions.selectElement(element.id, context);
  }

  @bind
  onMouseOver () {
    const {pageBuilderActions, element, context, hasChildren, isExpanded, dragging} = this.props;

    if (!dragging) {
      clearTimeout(this.closeOptionsTimeout);
      pageBuilderActions.overElement(element.id, context);
    } else if (hasChildren && !isExpanded) {
      this.openInterval = setTimeout(pageBuilderActions.toggleExpandElement.bind(this, element.id, context), 500);
    }
  }

  @bind
  onMouseOut () {
    const {pageBuilderActions, element, context, dragging} = this.props;

    if (!dragging) {
      pageBuilderActions.outElement(element.id, context);

      if (this.state.options) {
        clearTimeout(this.closeOptionsTimeout);
        this.closeOptionsTimeout = setTimeout(this.closeOptions, 300);
      }
    } else if (this.openInterval) {
      clearTimeout(this.openInterval);
    }
  }

  @bind
  openOptions (event) {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(this.closeOptionsTimeout);
    this.setState({
      options: true
    });
  }

  @bind
  closeOptions () {
    this.setState({
      options: false
    });
  }

  @bind
  duplicate (event) {
    const {pageBuilderActions, element, context} = this.props;
    event.preventDefault();

    pageBuilderActions.duplicateElement(element.id, context);
    this.setState({
      options: false
    });
  }

  @bind
  remove (event) {
    const {pageBuilderActions, element, context} = this.props;
    event.preventDefault();

    pageBuilderActions.removeElement(element.id, context);
    this.setState({
      options: false
    });
  }

  @bind
  toggleExpand (event) {
    event.preventDefault();
    event.stopPropagation();
    const {pageBuilderActions, element, context} = this.props;

    pageBuilderActions.toggleExpandElement(element.id, context);
  }

  render () {
    const {ElementClass, element, context, isSelectable, positionInParent} = this.props;
    let result;

    if (element.subComponent || !isSelectable) {
      result = (
        <div>
          {this.renderContent()}
        </div>
      );
    } else {
      const dragInfo = {
        type: 'move',
        id: element.id,
        context,
        parentId: element.parent,
        positionInParent
      };

      result = (
        <div>
          <Draggable type={element.tag} dragInfo={dragInfo} {...ElementClass.settings.drag}>
            {this.renderContent()}
          </Draggable>
        </div>
      );
    }
    return result;
  }

  renderContent () {
    const {ElementClass, isSelected, isOvered, element, hasChildren, hasLinks, isSelectable} = this.props;
    const subComponent = element.subComponent;
    const settings = ElementClass.settings;

    const events = {};
    if (isSelectable) {
      events.onClick = this.onClick;
      events.onMouseEnter = this.onMouseOver;
      events.onMouseLeave = this.onMouseOut;
    }
    if (isSelected) {
      events.id = 'selected-element'; // for scroll initial position
    }

    return (
      <div
        className={cx(
          styles.entry,
          isSelected && styles.selected,
          isOvered && styles.overed,
          hasChildren && styles.hasChildren,
          subComponent && styles.subComponent,
          hasLinks && styles.linked,
          !isSelectable && styles.disabled
        )}
        {...events}
      >
        {this.renderOptions()}
        {this.renderCaret()}
        <div className={cx(styles.part, styles.info)}>
          <i className={settings.icon && settings.icon.class}>
            {settings.icon && settings.icon.content}
          </i>
          <span>{element.label || element.tag}</span>
        </div>
      </div>
    );
  }

  renderCaret () {
    const {hasChildren, isExpanded} = this.props;
    if (hasChildren) {
      return (
        <span
          className={cx(styles.part, styles.caret, !isExpanded && styles.collapsed)}
          onClick={this.toggleExpand}
        >
          <i className='nc-icon-mini arrows-1_small-triangle-down'></i>
        </span>
      );
    }
  }

  renderOptions () {
    const {isSelectable, element, context} = this.props;

    if (isSelectable && !element.subComponent) {
      return (
        <div className={styles.contextHolder}>
          <ContextMenu
            element={element}
            context={context}
            dark
          />
        </div>
      );
    }
  }
}
