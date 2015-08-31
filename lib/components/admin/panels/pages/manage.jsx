import React from 'react';
import {Component} from 'relax-framework';
import TitleSlug from '../../../title-slug';

import pageActions from '../../../../client/actions/page';

export default class Manage extends Component {
  getInitialState () {
    return {
      title: '',
      slug: ''
    };
  }

  onChange (values) {
    this.setState(values);
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
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
      </form>
    );
  }
}

Manage.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};
