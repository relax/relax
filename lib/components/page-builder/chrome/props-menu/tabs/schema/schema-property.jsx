import React from 'react';
import {Component} from 'relax-framework';
import Utils from '../../../../../../utils';
import SchemaPropertyLink from './schema-property-link';

var LEFT_BUTTON = 0;

export default class SchemaProperty extends Component {
  getInitialState () {
    this.onMouseUpListener = this.onMouseUp.bind(this);
    this.onMouseMoveListener = this.onMouseMove.bind(this);
    return {};
  }

  onMouseDown (event) {
    if (event.button === LEFT_BUTTON) {
      event.preventDefault();
      event.stopPropagation();

      let anchorOffset = Utils.getOffsetRect(React.findDOMNode(this.refs.anchor));
      this.from = {
        top: anchorOffset.top + anchorOffset.height / 2,
        left: anchorOffset.left + anchorOffset.width / 2
      };

      document.addEventListener('mouseup', this.onMouseUpListener);
      document.addEventListener('mousemove', this.onMouseMoveListener);
    }
  }

  onMouseMove (event) {
    event.preventDefault();

    this.context.drawDraggingLine({
      from: this.from,
      to: {
        top: event.pageY,
        left: event.pageX
      },
      color: this.props.color
    });
  }

  onMouseUp () {
    document.removeEventListener('mouseup', this.onMouseUpListener);
    document.removeEventListener('mousemove', this.onMouseMoveListener);

    if (this.context.overedElement) {
      let elements = this.context.overedPath.concat(this.context.overedElement);
      elements.splice(0, 1);
      this.context.linkingPossibilities({
        elements,
        onClick: this.onPossibleClick.bind(this)
      });
    } else {
      this.context.undrawDraggingLine();
    }
  }

  onPossibleClick (element) {
    this.context.undrawDraggingLine();
    this.context.addSchemaLink(this.props.property.id, element.id);
  }

  renderLink (link) {
    let element = this.context.findPageElementById(link.elementId);

    if (element) {
      return (
        <SchemaPropertyLink
          link={link}
          element={element}
          property={this.props.property}
          key={link.id}
          color={this.props.color}
        />
      );
    } else {
      this.context.removeSchemaLink(this.props.property.id, link.id);
    }
  }

  renderLinks () {
    const schemaLinks = this.context.page.schemaLinks;
    let linked = schemaLinks && schemaLinks[this.props.property.id] && schemaLinks[this.props.property.id].length > 0;
    if (linked) {
      let links = schemaLinks[this.props.property.id];
      return (
        <div className='linked-info'>
          <div className='linked-info-option'>
            <div className='label'>Linked to</div>
            <div className='links'>
              {links.map(this.renderLink, this)}
            </div>
          </div>
        </div>
      );
    }
  }

  render () {
    let style = {
      borderColor: this.props.color
    };

    return (
      <div className='property'>
        <div className='table'>
          <div className='link'>
            <span style={style} onMouseDown={this.onMouseDown.bind(this)} ref='anchor'></span>
          </div>
          <div className='info'>
            <div className='title'>{this.props.property.title}</div>
            <div className='type'>{this.props.property.type}</div>
          </div>
        </div>
        {this.renderLinks()}
      </div>
    );
  }
}

SchemaProperty.contextTypes = {
  page: React.PropTypes.object.isRequired,
  setPageSchema: React.PropTypes.func.isRequired,
  drawDraggingLine: React.PropTypes.func.isRequired,
  undrawDraggingLine: React.PropTypes.func.isRequired,
  linkingPossibilities: React.PropTypes.func.isRequired,
  overedElement: React.PropTypes.any,
  overedPath: React.PropTypes.array,
  findPageElementById: React.PropTypes.func.isRequired,
  overElement: React.PropTypes.func.isRequired,
  outElement: React.PropTypes.func.isRequired,
  elements: React.PropTypes.object.isRequired,
  addSchemaLink: React.PropTypes.func.isRequired,
  removeSchemaLink: React.PropTypes.func.isRequired
};
