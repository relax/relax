import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';
import cx from 'classnames';

import settings from './settings';
import propsSchema from './props-schema';

import Edit from './edit';
import Component from '../../component';
import Element from '../../element';

import schemasStore from '../../../client/stores/schemas';
import schemaEntriesStoreFactory from '../../../client/stores/schema-entries';

export default class Schema extends Component {
  getInitialState () {
    return {
      elementsLinks: this.getElementsModelLinks()
    };
  }

  getInitialModels () {
    var models = {};

    if (this.props.model && this.props.model.schema && this.props.model.schema.schema) {
      models.schema = schemasStore.getModel(this.props.model.schema.schema);
    }

    return models;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.model && nextProps.model.schema.schema !== this.props.model.schema.schema) {
      this.setModels({
        schema: schemasStore.getModel(nextProps.model.schema.schema)
      });
    }
    this.setState({
      elementsLinks: this.getElementsModelLinks()
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      this.state.schema && this.state.schema.slug && (
      (!prevState.schema) ||
      ( prevState.schema && this.state.schema.slug !== prevState.schema.slug)
    )) {
      this.setCollections({
        entries: schemaEntriesStoreFactory(this.state.schema.slug).getCollection()
      });
    }
  }

  getElementsModelLinks () {
    const model = this.props.model;
    let elementsLinks = {};
    if (model && model.schema && model.schema.properties) {
      let properties = model.schema.properties;
      forEach(properties, (links, propertyId) => {
        forEach(links, link => {
          elementsLinks[link.elementId] = elementsLinks[link.elementId] || [];
          elementsLinks[link.elementId].push({
            propertyId,
            action: link.action,
            actionExtra: link.actionExtra
          });
        });
      });
    }
    return elementsLinks;
  }

  alterProps (data, schemaEntry) {
    forEach(data, (element, index) => {
      element.props = element.props || {};

      if (this.state.elementsLinks[element.id]) {
        forEach(this.state.elementsLinks[element.id], link => {
          if (link.action === 'children') {
            element.children = schemaEntry[link.propertyId];
          } else if (link.action === 'setting') {
            element.props[link.actionExtra] = schemaEntry[link.propertyId];
          } else if (link.action === 'display' && schemaEntry[link.propertyId] === false) {
            element.display = false;
          }
        });
      }

      if (element.display !== false) {
        element.id = this.props.element.id + '.' + element.id;

        if (element.children && element.children instanceof Array && element.children.length > 0) {
          this.alterProps(element.children, schemaEntry);
        }
      }
    });
  }

  onClose () {
    this.context.closeOverlay();
  }

  onSave (data) {
    this.context.onPropChange('model', data);
    this.context.closeOverlay();
  }

  onDoubleClick (event) {
    event.preventDefault();
    event.stopPropagation();

    this.context.addOverlay((
      <Edit
        onSave={this.onSave.bind(this)}
        onClose={this.onClose.bind(this)}
        onSwitch={this.context.switchOverlayBackground}
        data={this.props.model || {}}
      />
    ), {
      transition: 'fadeIn',
      closable: false,
      switch: this.props.model.switchBackground
    });
  }

  renderCover () {
    if (this.context.editing) {
      return (
        <div className='editing-cover' key='cover'></div>
      );
    }
  }

  renderEntry (entry) {
    var schemaModuleClone = cloneDeep(this.props.model.data);

    this.alterProps(schemaModuleClone, entry);

    return schemaModuleClone.map(this.context.renderElement);
  }

  renderEntries () {
    if (
      this.state.entries &&
      this.state.entries.constructor === Array &&
      this.state.entries.length > 0 &&
      this.props.model &&
      this.props.model.data &&
      this.props.model.data.length > 0
    ) {
      return (
        <div>
          {this.state.entries.map(this.renderEntry, this)}
        </div>
      );
    } else {
      return (
        <div>Double click to edit</div>
      );
    }
  }

  render () {
    var props = {
      tag: 'div',
      element: this.props.element,
      settings: this.constructor.settings,
      className: cx(this.context.editing && 'editing-wrapper')
    };

    if (this.context.editing) {
      props.onDoubleClick = this.onDoubleClick.bind(this);
    }

    return (
      <Element {...props}>
        {this.renderEntries()}
        {this.renderCover()}
      </Element>
    );
  }
}

Schema.contextTypes = {
  renderElement: React.PropTypes.func.isRequired,
  editing: React.PropTypes.bool.isRequired,
  addOverlay: React.PropTypes.func,
  closeOverlay: React.PropTypes.func,
  onPropChange: React.PropTypes.func,
  switchOverlayBackground: React.PropTypes.func
};
Schema.propTypes = {};
Schema.defaultProps = {};

Schema.propsSchema = propsSchema;
Schema.settings = settings;
