import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import OptionsMenu from '../../../../options-menu';
import {Draggable} from '../../../../dnd';

export default class Entry extends Component {
  static propTypes = {
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    id: React.PropTypes.string.isRequired,
    elementInfo: React.PropTypes.object.isRequired,
    toggleExpand: React.PropTypes.func.isRequired,
    isExpanded: React.PropTypes.bool.isRequired,
    hasChildren: React.PropTypes.bool.isRequired
  }

  getInitState () {
    return {
      options: false
    };
  }

  onClick () {
    this.props.pageBuilderActions.selectElement(this.props.id);
  }

  onMouseOver (event) {
    const {dragging} = this.props.dnd;
    const {overElement} = this.props.pageBuilderActions;
    if (!dragging) {
      overElement(this.props.id);
    } else if (this.props.hasChildren && !this.props.isExpanded) {
      this.openInterval = setTimeout(this.props.pageBuilderActions.toggleExpandElement.bind(this, this.props.id), 500);
    }
  }

  onMouseOut () {
    const {dragging} = this.props.dnd;
    const {outElement} = this.props.pageBuilderActions;
    if (!dragging) {
      outElement(this.props.id);

      if (this.state.options) {
        this.setState({
          options: false
        });
      }
    } else if (this.openInterval) {
      clearTimeout(this.openInterval);
    }
  }

  openOptions (event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      options: true
    });
  }

  duplicate (event) {
    event.preventDefault();
    this.props.pageBuilderActions.duplicateElement(this.props.id);
    this.setState({
      options: false
    });
  }

  remove (event) {
    event.preventDefault();
    this.props.pageBuilderActions.removeElement(this.props.id);
    this.setState({
      options: false
    });
  }

  toggleExpand (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.pageBuilderActions.toggleExpandElement(this.props.id);
  }

  render () {
    const {elements} = this.props.pageBuilder;
    const element = elements[this.props.elementInfo.tag];
    let result;

    if (this.props.elementInfo.subComponent) {
      result = (
        <div>
          {this.renderContent()}
        </div>
      );
    } else {
      const dragInfo = {
        type: 'move',
        id: this.props.id
      };

      result = (
        <div>
          <Draggable type={this.props.elementInfo.tag} dragInfo={dragInfo} {...element.settings.drag} pageBuilder={this.props.pageBuilder} dnd={this.props.dnd} dndActions={this.props.dndActions}>
            {this.renderContent()}
          </Draggable>
        </div>
      );
    }
    return result;
  }

  renderOptionsMenu () {
    if (this.state.options) {
      return (
        <OptionsMenu options={[
          {label: 'Duplicate', action: ::this.duplicate, icon: 'fa fa-copy'},
          {label: 'Remove', action: ::this.remove, icon: 'fa fa-trash-o'}
        ]} />
      );
    }
  }

  renderContent () {
    const {elements, selectedId, overedId} = this.props.pageBuilder;
    const element = elements[this.props.elementInfo.tag];

    const selected = selectedId === this.props.id;
    const overed = overedId === this.props.id;
    const hasChildren = this.props.hasChildren;
    const subComponent = this.props.elementInfo.subComponent;

    return (
      <div
        className={cx('structure-entry-element', selected && 'selected', overed && 'overed', hasChildren && 'hasChildren', subComponent && 'sub-component')}
        onClick={this.onClick.bind(this)}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        {this.renderCaret()}
        <div className='element-info'>
          <i className={element.settings.icon.class}>{element.settings.icon.content}</i>
          <span>{this.props.elementInfo.label || this.props.elementInfo.tag}</span>
        </div>
        {this.renderOptions()}
      </div>
    );
  }

  renderCaret () {
    if (this.props.hasChildren) {
      return (
        <span className={cx('caret-toggle', !this.props.isExpanded && 'collapsed')} onClick={this.toggleExpand.bind(this)}>
          <i className='material-icons'>arrow_drop_down</i>
        </span>
      );
    }
  }

  renderOptions () {
    if (!this.props.elementInfo.subComponent) {
      return (
        <div className='options' href='#' onClick={this.openOptions.bind(this)}>
          <i className='fa fa-ellipsis-h'></i>
          {this.renderOptionsMenu()}
        </div>
      );
    }
  }
}
