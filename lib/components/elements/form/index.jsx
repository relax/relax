import forEach from 'lodash.foreach';
import request from 'superagent';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';

// import slugify from 'slug';

export default class Form extends Component {
  static propTypes = {
    action: PropTypes.string,
    schema: PropTypes.string,
    custom: PropTypes.string,
    children: PropTypes.node
  }

  static propsSchema = propsSchema
  static settings = settings

  sendEmail (formData) {
    request
      .post('/send-email')
      .set('Content-Type', 'application/json')
      .type('json')
      .send(formData)
      .end((error, res) => {
        console.log(error);
        console.log(res);
      });
  }

  addToSchema (formData) {
    // let actions = schemaEntriesActionsFactory(this.props.schema);
    //
    // // Check required fields
    // if (formData._title && !formData._slug) {
    //   formData._slug = slugify(formData._title, {lower: true}).toLowerCase();
    // }
    //
    // actions
    //   .add(formData)
    //   .then((result) => {
    //
    //   })
    //   .catch(() => {
    //
    //   });
  }

  sendCustom (formData) {
    // $
    //   .post(this.props.custom, formData)
    //   .done((response) => {
    //
    //   })
    //   .fail((error) => {
    //
    //   });
  }

  onSubmit (event) {
    event.preventDefault();
    const formElement = findDOMNode(this);
    const formData = {};

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
    return (
      <Element info={this.props} htmlTag='form' settings={settings} onSubmit={::this.onSubmit}>
        {this.props.children}
        <input type='submit' hidden />
      </Element>
    );
  }
}
