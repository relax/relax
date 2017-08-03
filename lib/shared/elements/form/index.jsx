import Component from 'components/component';
import bind from 'decorators/bind';
import forEach from 'lodash/forEach';
import set from 'lodash/set';
import React from 'react';
import PropTypes from 'prop-types';
import {addSchemaEntry} from 'actions/schema-entry';
import {findDOMNode} from 'react-dom';

import propsSchema from './props-schema';
import settings from './settings';

export default class Form extends Component {
  static propTypes = {
    action: PropTypes.string,
    schema: PropTypes.string,
    custom: PropTypes.string,
    relax: PropTypes.object.isRequired,
    schemaLinks: PropTypes.object,
    Element: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;

  getInitState () {
    return {
      state: 'normal'
    };
  }

  // sendEmail (formData) {
  //   request
  //     .post('/send-email')
  //     .set('Content-Type', 'application/json')
  //     .type('json')
  //     .send(formData)
  //     .end((error, res) => {
  //       warning(false, error);
  //       warning(false, res);
  //     });
  // }

  addToSchema (formData) {
    const schemaId = this.props.relax.element.props.schemaId;

    this.context.store
      .dispatch(addSchemaEntry(schemaId, null, formData))
      .then(() => {
        this.setState({
          state: 'success'
        });
      })
      .catch(() => {
        this.setState({
          state: 'error'
        });
      });
  }

  @bind
  onSubmit (event) {
    event.preventDefault();
    const formElement = findDOMNode(this);
    const formData = {};

    this.setState({
      state: 'loading'
    });

    forEach(formElement.elements, (element) => {
      if (element.name) {
        const splitted = element.name.split('#');
        set(formData, splitted, element.value);
      }
    });

    this.addToSchema(formData);
  }

  render () {
    const {Element, relax} = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Element {...relax} htmlTag='div' settings={settings}>
          {this.renderContent()}
        </Element>
        <input type='submit' hidden />
      </form>
    );
  }

  renderContent () {
    const {schemaLinks, renderChildren} = this.props;
    const {state} = this.state;

    return renderChildren({
      links: schemaLinks,
      linksData: {
        state: {
          loading: state === 'loading',
          success: state === 'success',
          error: state === 'error'
        }
      }
    });
  }
}
