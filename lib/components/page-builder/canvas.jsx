import React from 'react';
import {Droppable} from '../drag';
import {Component} from 'relax-framework';
import ContextMenu from './context-menu';
import key from 'keymaster';
import displays from '../../displays';

export default class Canvas extends Component {

  getInitialState () {
    this.keyDownBind = this.onContextMenu.bind(this);

    return {
      contextMenu: false
    };
  }

  componentDidMount () {
    this.openContextBind();

    React.findDOMNode(this.refs.canvas).addEventListener('scroll', this.onScroll.bind(this));
  }

  getChildContext () {
    return {
      renderElement: this.renderElement.bind(this),
      dropHighlight: this.context.dragging ? 'vertical' : 'none'
    };
  }

  onScroll () {
    /* jshint ignore:start */
    window.dispatchEvent(new Event('scroll'));
    /* jshint ignore:end */
  }

  onElementClick (id, event) {
    event.preventDefault();
    this.context.selectElement(id);
  }

  onContextMenu (event) {
    return; // XXX temp for debug
    if (this.context.editing) {
      if (!event.keyCode) {
        event.preventDefault();
      } else if (key.command || key.ctrl || key.control || key.alt) {
        return;
      }

      document.removeEventListener('keydown', this.keyDownBind);

      this.setState({
        contextMenu: true,
        contextMenuSearch: event.keyCode ? true : false,
        contextMenuX: event.clientX,
        contextMenuY: event.clientY
      });
    }
  }

  openContextBind () {
    //document.addEventListener('keydown', this.keyDownBind);
  }

  contextMenuClose () {
    this.openContextBind();
    this.setState({
      contextMenu: false
    });
  }

  renderContextMenu () {
    if (this.state.contextMenu) {
      return (
        <ContextMenu
          x={this.state.contextMenuX}
          y={this.state.contextMenuY}
          onClose={this.contextMenuClose.bind(this)}
          search={this.state.contextMenuSearch}
        />
      );
    }
  }

  renderElement (element) {
    if ((!element.hide || !element.hide[this.context.display]) && element.display !== false) {
      var FactoredElement = this.context.elements[element.tag];
      var selected = this.context.selected && this.context.selected.id === element.id;

      return (
        <FactoredElement {...element.props} key={element.id} selected={selected} element={element}>
          {this.renderChildren(element.children || '')}
        </FactoredElement>
      );
    }
  }

  renderChildren (children) {
    // group of elements (array)
    if( children instanceof Array ){
      return children.map(this.renderElement.bind(this));
    }
    // String or other static content
    else {
      return children;
    }
  }

  render () {
    var dropInfo = {
      type: 'body'
    };

    var bodyStyle = {
      margin: '0 auto',
      maxWidth: displays[this.context.display]
    };

    return (
      <div>
        <div className='page-builder-canvas' onContextMenu={this.onContextMenu.bind(this)} ref='canvas'>
          <div className='body-element' onClick={this.contextMenuClose.bind(this)} style={bodyStyle} ref='body'>
            <Droppable type='body' dropInfo={dropInfo} accepts='Section' placeholder={true}>
              {this.renderChildren(this.context.page.data)}
            </Droppable>
          </div>
        </div>
        {this.renderContextMenu()}
      </div>
    );
  }
}

Canvas.childContextTypes = {
  renderElement: React.PropTypes.func.isRequired,
  dropHighlight: React.PropTypes.string.isRequired
};

Canvas.contextTypes = {
  dragging: React.PropTypes.bool,
  selected: React.PropTypes.any.isRequired,
  elements: React.PropTypes.object.isRequired,
  selectElement: React.PropTypes.func.isRequired,
  addElementAtSelected: React.PropTypes.func.isRequired,
  page: React.PropTypes.object.isRequired,
  display: React.PropTypes.string.isRequired,
  editing: React.PropTypes.bool.isRequired
};
