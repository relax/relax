import React from 'react';
import {Component} from 'relax-framework';
import TitleSlug from '../../../title-slug';
import FormState from '../../../form-state';

import pageActions from '../../../../client/actions/page';

export default class Manage extends Component {
  getInitialState () {
    return {
      title: '',
      slug: '',
      state: false
    };
  }

  onChange (values) {
    this.setState(values);
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  renderState () {
    let message = false;

    if (this.props.state === 'loading') {
      message = 'Creating page';
    } else if (this.props.state === 'error') {
      message = 'Error creating page';
    }

    if (message !== false) {
      return (
        <FormState
          state={this.props.state}
          message={message}
        />
      );
    }
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <TitleSlug
          title={this.state.title}
          slug={this.state.slug}
          validateSlug={pageActions.validateSlug}
          onChange={this.onChange.bind(this)}
        />
        <input type='submit' hidden='true' />
        <a className='button button-primary' href='#' onClick={this.onSubmit.bind(this)}>Create page</a>
        {this.renderState()}
      </form>
    );
  }
}

Manage.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  state: React.PropTypes.string
};
