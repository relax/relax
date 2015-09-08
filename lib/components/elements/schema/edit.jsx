import React from 'react';
import {Component} from 'relax-framework';

import SchemaModuleBuilder from '../../page-builder/schema-module-builder';

export default class Edit extends Component {
  getChildContext () {
    return {
      editing: true,
      elements: this._reactInternalInstance._context && this._reactInternalInstance._context.elements,
      useSchema: true,
      display: 'desktop'
    };
  }

  render () {
    return (
      <SchemaModuleBuilder data={this.props.data} onSave={this.props.onSave} onClose={this.props.onClose} />
    );
  }
}

Edit.childContextTypes = {
  editing: React.PropTypes.bool.isRequired,
  elements: React.PropTypes.object.isRequired,
  useSchema: React.PropTypes.bool.isRequired,
  display: React.PropTypes.string.isRequired
};

Edit.propTypes = {
  data: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired
};
