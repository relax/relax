import React from 'react';
import Component from '../component';
import {Types} from '../../data-types';
import Element from '../element';
import cloneDeep from 'lodash.clonedeep';
import forEach from 'lodash.foreach';

import schemasStore from '../../client/stores/schemas';
import schemaEntriesStoreFactory from '../../client/stores/schema-entries';

export default class Schema extends Component {

  getInitialModels () {
    var models = {};

    if (this.props.schema && this.props.schema.schema) {
      models.schema = schemasStore.getModel(this.props.schema.schema);
    }

    return models;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.schema && nextProps.schema.schema !== this.props.schema.schema) {
      this.setModels({
        schema: schemasStore.getModel(nextProps.schema.schema)
      });
    }
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

  alterProps (children, entry) {
    forEach(children, (element) => {
      element.props = element.props || {};

      forEach(this.props.schema.fields, (field, key) => {
        if (field.link === element.id) {
          if (field.prop === 'children') {
            element.children = entry[key];
          } else {
            element.props[field.prop] = entry[key];
          }
        }
      });

      element.id = this.props.element.id + '.' + element.id;

      if (element.children instanceof Array && element.children.length > 0) {
        this.alterProps(element.children, entry);
      }
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
    var schemaModuleClone = cloneDeep(this.props.element.children);

    if (this.props.schema && this.props.schema.fields) {
      this.alterProps(schemaModuleClone, entry);
    }

    return (
      <div className='editing-wrapper'>
        {schemaModuleClone.map(this.context.renderElement)}
        {this.renderCover()}
      </div>
    );
  }

  renderEntries () {
    if (
      this.state.entries &&
      this.state.entries.length &&
      this.state.entries.length > 0 &&
      this.props.element.children &&
      this.props.element.children.length > 0
    ) {
      return (
        <div>
          {this.state.entries.map(this.renderEntry, this)}
        </div>
      );
    }
  }

  renderTemplateModule () {
    if (this.context.editing) {
      var style = {
        position: 'relative'
      };
      return (
        <div style={style}>
          {this.renderContent()}
          <div className='element-module-highlight'></div>
        </div>
      );
    }
  }

  render () {
    var props = {
      tag: 'div',
      element: this.props.element,
      settings: this.constructor.settings
    };

    return (
      <Element {...props}>
        {this.renderTemplateModule()}
        {this.renderEntries()}
      </Element>
    );
  }
}

Schema.contextTypes = {
  renderElement: React.PropTypes.func.isRequired,
  editing: React.PropTypes.bool.isRequired
};

Schema.propTypes = {

};

Schema.defaultProps = {

};

Schema.propsSchema = [
  {
    label: 'Schema',
    type: Types.SchemaLink,
    id: 'schema'
  }
];

Schema.settings = {
  icon: {
    class: 'fa fa-sitemap',
    content: ''
  },
  drop: {
    customDropArea: true
  },
  drag: {}
};
