import React from 'react';
import forEach from 'lodash.foreach';
import slugify from 'slug';
import $ from 'jquery';
import Component from '../../component';
import Element from '../../element';

import settings from './settings';
import propsSchema from './props-schema';

import schemaEntriesActionsFactory from '../../../client/actions/schema-entries';

export default class Form extends Component {
  sendEmail (formData) {
    $
      .post('/send-email', formData)
      .done((response) => {

      })
      .fail((error) => {

      });
  }

  addToSchema (formData) {
    let actions = schemaEntriesActionsFactory(this.props.schema);

    // Check required fields
    if (formData._title && !formData._slug) {
      formData._slug = slugify(formData._title, {lower: true}).toLowerCase();
    }

    actions
      .add(formData)
      .then((result) => {

      })
      .catch(() => {

      });
  }

  sendCustom (formData) {
    $
      .post(this.props.custom, formData)
      .done((response) => {

      })
      .fail((error) => {

      });
  }

  onSubmit (event) {
    event.preventDefault();
    const formElement = React.findDOMNode(this);
    let formData = {};

    forEach(formElement.elements, (element) => {
      formData[element.name] = element.value;
    });

    if (this.props.action === 'email') {
      this.sendEmail(formData);
    } else if (this.props.action === 'schema') {
      this.addToSchema(formData);
    } else if (this.props.action === 'custom') {
      this.sendCustom(formData);
    }
  }

  render () {
    let props = {
      tag: 'form',
      element: this.props.element,
      settings: this.constructor.settings,
      onSubmit: this.onSubmit.bind(this)
    };

    return (
      <Element {...props}>
        {this.props.children}
        <input type='submit' hidden='true' />
      </Element>
    );
  }
}

Form.propTypes = {
  action: React.PropTypes.string,
  schema: React.PropTypes.string,
  custom: React.PropTypes.string
};

Form.defaultProps = {};

Form.propsSchema = propsSchema;
Form.settings = settings;
