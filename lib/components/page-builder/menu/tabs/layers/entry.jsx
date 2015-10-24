import cx from 'classnames';
import React from 'react';
import {Component} from 'relax-framework';

import OptionsMenu from '../../../../options-menu';
import {Draggable} from '../../../../dnd';

export default class Entry extends Component {
  getInitialState () {
    return {
      options: false
    };
  }

  onClick () {
    this.context.selectElement(this.props.id);
  }

  onMouseOver (event) {
    if (!this.context.dragging) {
      this.context.overElement(this.props.id);
    } else if (this.props.hasChildren && !this.props.isExpanded) {
      this.openInterval = setTimeout(this.context.toggleExpandElement.bind(this, this.props.id), 500);
    }
  }

  onMouseOut () {
    if (!this.context.dragging) {
      this.context.outElement(this.props.id);

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
    this.context.duplicateElement(this.props.id);
    this.setState({
      options: false
    });
  }

  remove (event) {
    event.preventDefault();
    this.context.removeElement(this.props.id);
    this.setState({
      options: false
    });
  }

  toggleExpand (event) {
    event.preventDefault();
    event.stopPropagation();
    this.context.toggleExpandElement(this.props.id);
  }

  renderOptionsMenu () {
    if (this.state.options) {
      return (
        <OptionsMenu options={[
          {label: 'Duplicate', action: this.duplicate.bind(this), icon: 'fa fa-copy'},
          {label: 'Remove', action: this.remove.bind(this), icon: 'fa fa-trash-o'}
        ]} />
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

  renderContent () {
    var element = this.context.elements[this.props.elementInfo.tag];

    let selected = this.context.selected && this.context.selected.id === this.props.id;
    let overed = this.context.overedElement && this.context.overedElement === this.props.id;
    let hasChildren = this.props.hasChildren;
    let subComponent = this.props.elementInfo.subComponent;

    return (
      <div
        className={cx('structure-entry-element', selected && 'selected', overed && 'overed', hasChildren && 'hasChildren', subComponent && 'sub-component')}
        onClick={this.onClick.bind(this)}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
      >
        <i className={element.settings.icon.class}>{element.settings.icon.content}</i>
        <span>{this.props.display === 'tag' ? this.props.elementInfo.tag : (this.props.elementInfo.label || this.props.elementInfo.tag)}</span>
        {this.props.hasChildren ? <a href='#' onClick={this.toggleExpand.bind(this)}><i className={this.props.isExpanded ? 'fa fa-caret-up' : 'fa fa-caret-down'}></i></a> : null}
        {this.renderOptions()}
      </div>
    );
  }

  render () {
    var element = this.context.elements[this.props.elementInfo.tag];

    if (this.props.elementInfo.subComponent) {
      return (
        <div>
          {this.renderContent()}
        </div>
      );
    } else {
      var dragInfo = {
        type: 'move',
        id: this.props.id
      };

      return (
        <div>
          <Draggable type={this.props.elementInfo.tag} dragInfo={dragInfo} {...element.settings.drag}>
            {this.renderContent()}
          </Draggable>
        </div>
      );
    }
  }
}

Entry.propTypes = {
  id: React.PropTypes.number.isRequired,
  elementInfo: React.PropTypes.object.isRequired,
  toggleExpand: React.PropTypes.func.isRequired,
  isExpanded: React.PropTypes.bool.isRequired,
  hasChildren: React.PropTypes.bool.isRequired,
  display: React.PropTypes.string.isRequired
};

Entry.contextTypes = {
  dragging: React.PropTypes.bool.isRequired,
  elements: React.PropTypes.object.isRequired,
  selected: React.PropTypes.any.isRequired,
  selectElement: React.PropTypes.func.isRequired,
  overElement: React.PropTypes.func.isRequired,
  outElement: React.PropTypes.func.isRequired,
  overedElement: React.PropTypes.any.isRequired,
  duplicateElement: React.PropTypes.func.isRequired,
  removeElement: React.PropTypes.func.isRequired,
  toggleExpandElement: React.PropTypes.func.isRequired
};
