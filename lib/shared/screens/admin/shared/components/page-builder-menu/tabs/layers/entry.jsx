import bind from 'decorators/bind';
import cx from 'classnames';
import isElementSelected from 'helpers/is-element-selected';
import Component from 'components/component';
import Draggable from 'components/dnd/draggable';
import OptionsMenu from 'components/options-menu';
import React, {PropTypes} from 'react';

import styles from './entry.less';

export default class Entry extends Component {
  static propTypes = {
    pageBuilderActions: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    context: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    hasChildren: PropTypes.bool.isRequired,
    dragging: PropTypes.bool.isRequired,
    ElementClass: PropTypes.func.isRequired,
    selected: PropTypes.object,
    overed: PropTypes.object,
    hasLinks: PropTypes.bool.isRequired,
    editable: PropTypes.bool.isRequired
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
    const {dragging, pageBuilderActions, element, context, hasChildren, isExpanded} = this.props;

    if (!dragging) {
      pageBuilderActions.overElement(element.id, context);
    } else if (hasChildren && !isExpanded) {
      this.openInterval = setTimeout(pageBuilderActions.toggleExpandElement.bind(this, element.id), 500);
    }
  }

  @bind
  onMouseOut () {
    const {dragging, pageBuilderActions, element} = this.props;

    if (!dragging) {
      pageBuilderActions.outElement(element.id);

      if (this.state.options) {
        this.setState({
          options: false
        });
      }
    } else if (this.openInterval) {
      clearTimeout(this.openInterval);
    }
  }

  @bind
  openOptions (event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      options: true
    });
  }

  @bind
  duplicate (event) {
    event.preventDefault();
    const {pageBuilderActions, element, context} = this.props;
    pageBuilderActions.duplicateElement(element.id, context);
    this.setState({
      options: false
    });
  }

  @bind
  remove (event) {
    event.preventDefault();
    const {pageBuilderActions, element, context} = this.props;

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
    const {ElementClass, element, context, editable} = this.props;
    let result;

    if (element.subComponent || !editable) {
      result = (
        <div>
          {this.renderContent()}
        </div>
      );
    } else {
      const dragInfo = {
        type: 'move',
        id: element.id,
        context
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

  renderOptionsMenu () {
    if (this.props.editable && this.state.options) {
      return (
        <OptionsMenu
          options={[
            {label: 'Duplicate', action: this.duplicate, icon: 'nc-icon-mini files_single-copy-04'},
            {label: 'Remove', action: this.remove, icon: 'nc-icon-mini ui-1_trash'}
          ]}
        />
      );
    }
  }

  renderContent () {
    const {ElementClass, selected, overed, element, context, hasChildren, hasLinks, editable} = this.props;

    const isSelected = isElementSelected(selected, {id: element.id, context});
    const isOvered = isElementSelected(overed, {id: element.id, context});
    const subComponent = element.subComponent;

    const events = {};
    if (editable) {
      events.onClick = this.onClick;
      events.onMouseEnter = this.onMouseOver;
      events.onMouseLeave = this.onMouseOut;
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
          !editable && styles.disabled
        )}
        {...events}
      >
        {this.renderCaret()}
        <div className={cx(styles.part, styles.info)}>
          <i className={ElementClass.settings.icon.class}>{ElementClass.settings.icon.content}</i>
          <span>{element.label || element.tag}</span>
        </div>
        {this.renderOptions()}
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
    if (this.props.editable && !this.props.element.subComponent) {
      return (
        <div className={cx(styles.part, styles.options)} onClick={this.openOptions}>
          <i className='nc-icon-mini ui-2_menu-dots'></i>
          {this.renderOptionsMenu()}
        </div>
      );
    }
  }
}
