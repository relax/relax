import {Component} from 'relax-framework';
import React from 'react';
import Combobox from '../combobox';
import forEach from 'lodash.foreach';
import Utils from '../../utils';

export default class Field extends Component {
  onClick (event) {
    event.preventDefault();
    this.props.onClick(this.props.id);
  }

  onElementLinkChange (value) {
    this.props.onChange(this.props.id, {
      link: value,
      prop: this.props.value.prop || ''
    });
  }

  onElementPropChange (value) {
    this.props.onChange(this.props.id, {
      link: this.props.value.link,
      prop: value
    });
  }

  getElementsArray (children, info) {
    forEach(children, (element) => {
      info.labels.push(element.label || element.tag);
      info.values.push(element.id);

      if (element.children instanceof Array && element.children.length > 0) {
        this.getElementsArray(element.children, info);
      }
    });
  }

  renderLinkTo () {
    var props = {
      value: this.props.value.link || 'none',
      values: ['none'],
      labels: ['None'],
      onChange: this.onElementLinkChange.bind(this)
    };
    if (this.context.selected.children && this.context.selected.children instanceof Array && this.context.selected.children.length > 0) {
      this.getElementsArray(this.context.selected.children, props);
    }

    return (
      <div>
        <p>Link to element</p>
        <Combobox {...props}/>
      </div>
    );
  }

  renderPropSelect () {
    if (this.props.value.link && this.props.value.link !== 'none') {
      var props = {
        values: ['children'],
        labels: ['Content'],
        value: this.props.value.prop || '',
        onChange: this.onElementPropChange.bind(this)
      };

      var pageElement = this.context.findPageElementById(this.props.value.link);
      if (pageElement.tag && this.context.elements[pageElement.tag]) {
        var element = this.context.elements[pageElement.tag];

        if (element.propsSchema) {
          var propsList = Utils.getPropSchemaList(element.propsSchema);

          forEach(propsList, (propSchema) => {
            if (propSchema.id && propSchema.label) {
              props.values.push(propSchema.id);
              props.labels.push(propSchema.label);
            }
          });
        }

        return (
          <div>
            <p>Link to property</p>
            <Combobox {...props} />
          </div>
        );
      }

    }
  }

  renderOptions () {
    if (this.props.opened) {
      return (
        <div className='options-group'>
          {this.renderLinkTo()}
          {this.renderPropSelect()}
        </div>
      );
    }
  }

  render () {
    var className = 'schema-link-field';

    if (this.props.opened) {
      className += ' opened';
    }

    return (
      <div className={className} key={this.props.id}>
        <a href='#' className='label' onClick={this.onClick.bind(this)}>
          <span>{this.props.id}</span>
          <i className={this.props.opened ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
        </a>
        {this.renderOptions()}
      </div>
    );
  }
}

Field.contextTypes = {
  selected: React.PropTypes.any.isRequired,
  elements: React.PropTypes.object.isRequired,
  findPageElementById: React.PropTypes.func.isRequired
};

Field.propTypes = {
  id: React.PropTypes.string.isRequired,
  opened: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.object.isRequired
};
