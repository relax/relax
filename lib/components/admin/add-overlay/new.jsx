import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import FormState from '../../form-state';
import TitleSlug from '../../title-slug';

export default class New extends Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    isSlugValid: PropTypes.bool.isRequired,
    validateSlug: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    state: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className='new'>
        <TitleSlug
          title={this.props.page.title}
          slug={this.props.page.slug}
          isSlugValid={this.props.isSlugValid}
          validateSlug={this.props.validateSlug}
          onChange={this.props.onChange}
        />
        <input type='submit' hidden='true' />
        <a className='button button-primary' href='#' onClick={this.props.onSubmit.bind(this)}>Create page</a>
        {this.renderState()}
      </div>
    );
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
}
