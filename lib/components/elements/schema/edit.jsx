import React from 'react';
import {Component} from 'relax-framework';

import SchemaModuleBuilder from '../../page-builder/schema-module-builder';

export default class Edit extends Component {
  getInitialState () {
    return {
      value: this.props.data
    };
  }

  getChildContext () {
    return {
      editing: true,
      elements: this._reactInternalInstance._context && this._reactInternalInstance._context.elements,
      useSchema: true,
      display: 'desktop'
    };
  }

  onChange (data) {
    this.setState({
      value: data
    });
  }

  render () {
    return (
      <SchemaModuleBuilder value={this.state.value} onSave={this.props.onSave} onChange={this.onChange.bind(this)} onClose={this.props.onClose} onSwitch={this.props.onSwitch} />
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
  onClose: React.PropTypes.func.isRequired,
  onSwitch: React.PropTypes.func.isRequired
};
