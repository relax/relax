import forEach from 'lodash.foreach';
import request from 'superagent';
import warning from 'warning';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import Element from '../element';

// import slugify from 'slug';

export default class Form extends Component {
  static propTypes = {
    action: PropTypes.string,
    schema: PropTypes.string,
    custom: PropTypes.string,
    children: PropTypes.node,
    relax: PropTypes.object.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;

  sendEmail (formData) {
    request
      .post('/send-email')
      .set('Content-Type', 'application/json')
      .type('json')
      .send(formData)
      .end((error, res) => {
        warning(false, error);
        warning(false, res);
      });
  }

  addToSchema () {
    // arg: formData
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

  sendCustom () {
    // arg: formData
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
      <form onSubmit={::this.onSubmit}>
        <Element {...this.props.relax} htmlTag='div' settings={settings}>
          {this.props.children}
        </Element>
        <input type='submit' hidden />
      </form>
    );
  }
}
