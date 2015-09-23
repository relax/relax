import React from 'react';
import {Droppable} from '../drag';
import {Component} from 'relax-framework';
import displays from '../../displays';
import forEach from 'lodash.foreach';

export default class Canvas extends Component {
  componentDidMount () {
    super.componentDidMount();
    React.findDOMNode(this.refs.canvas).addEventListener('scroll', this.onScroll.bind(this));
  }

  getChildContext () {
    return {
      renderElement: this.renderElement.bind(this, {}),
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

  getElementsModelLinks () {
    let elementsLinks = {};
    if (this.context.schemaEntry && this.context.page.schemaLinks) {
      forEach(this.context.page.schemaLinks, (links, propertyId) => {
        forEach(links, link => {
          elementsLinks[link.elementId] = elementsLinks[link.elementId] || [];
          elementsLinks[link.elementId].push({
            propertyId,
            action: link.action
          });
        });
      });
    }
    return elementsLinks;
  }

  renderElement (elementsLinks, element) {
    if ((!element.hide || !element.hide[this.context.display]) && element.display !== false) {

      if (this.context.schemaEntry && elementsLinks[element.id]) {
        let schemaEntry = this.context.schemaEntry;
        forEach(elementsLinks[element.id], (link) => {
          if (link.action === 'children') {
            if (schemaEntry[link.propertyId] && schemaEntry[link.propertyId] !== '') {
              element.children = schemaEntry[link.propertyId];
            } else {
              element.display = false;
            }
          } else if (link.action === 'show' && (!schemaEntry[link.propertyId] || schemaEntry[link.propertyId] === '')) {
            element.display = false;
          } else if (link.action === 'hide' && schemaEntry[link.propertyId] && schemaEntry[link.propertyId] !== '') {
            element.display = false;
          } else if (link.action) { // setting
            element.props[link.action] = schemaEntry[link.propertyId];
          }
        });
      }

      if (element.display !== false) {
        var FactoredElement = this.context.elements[element.tag];
        var selected = this.context.selected && this.context.selected.id === element.id;

        return (
          <FactoredElement {...element.props} key={element.id} selected={selected} element={element}>
            {this.renderChildren(element.children || '', elementsLinks)}
          </FactoredElement>
        );
      }
    }
  }

  renderChildren (children, elementsLinks) {
    // group of elements (array)
    if ( children instanceof Array ) {
      return children.map(this.renderElement.bind(this, elementsLinks));
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

    // Process schema links if any
    const elementsLinks = this.getElementsModelLinks();

    return (
      <div>
        <div className='page-builder-canvas' ref='canvas'>
          <div className='body-element' style={bodyStyle} ref='body'>
            <Droppable type='body' dropInfo={dropInfo} accepts='Section' placeholder={true}>
              {this.renderChildren(this.context.page.data, elementsLinks)}
            </Droppable>
          </div>
        </div>
      </div>
    );
  }
}

Canvas.childContextTypes = {
  renderElement: React.PropTypes.func.isRequired,
  dropHighlight: React.PropTypes.string.isRequired
};

Canvas.contextTypes = {
  schemaEntry: React.PropTypes.object,
  dragging: React.PropTypes.bool,
  selected: React.PropTypes.any.isRequired,
  elements: React.PropTypes.object.isRequired,
  selectElement: React.PropTypes.func.isRequired,
  addElementAtSelected: React.PropTypes.func.isRequired,
  page: React.PropTypes.object.isRequired,
  display: React.PropTypes.string.isRequired,
  editing: React.PropTypes.bool.isRequired
};
