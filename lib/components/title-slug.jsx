import {Component} from 'relax-framework';
import Input from './input';
import React from 'react';
import slugify from 'slug';
import Q from 'q';

export default class TitleSlug extends Component {
  getInitialState () {
    return {
      slugValid: this.props.slug !== '',
      hasTypedSlug: false
    };
  }

  componentDidMount () {
    this.validateSlug();
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    clearTimeout(this.slugTimeout);
  }

  onTitleChange (value) {
    var title = value;
    var slug = this.props.slug;

    if (!this.state.hasTypedSlug) {
      slug = slugify(title, {lower: true}).toLowerCase();
      this.validateSlugTimeout();
    }

    this.props.onChange({title, slug});
    this.setState({title, slug});
  }

  onSlugChange (value) {
    var slug = value;

    this.validateSlugTimeout();
    this.setState({
      slug,
      hasTypedSlug: !slug ? false : true
    });

    this.props.onChange({title: this.props.title, slug});
  }

  validateSlugTimeout () {
    clearTimeout(this.slugTimeout);
    this.slugTimeout = setTimeout(this.validateSlug.bind(this), 500);
  }

  validateSlug () {
    if (this.props.slug) {
      this.setState({
        slugValidating: true
      });

      Q()
        .then(() => this.props.validateSlug(this.props.slug))
        .then((response) => {
          this.setState({
            slugValidating: false,
            slugValid: !response
          });
        });
    }
  }

  render () {
    let state = this.state.slugValidating ? 'loading' : (this.state.slugValid ? 'valid' : 'invalid');

    return (
      <div>
        <div className='option'>
          <div className='label'>Title</div>
          <Input label='Title' type='text' onChange={this.onTitleChange.bind(this)} value={this.props.title} />
        </div>
        <div className='option'>
          <div className='label'>Slug</div>
          <Input label='Slug' state={state} type='text' onChange={this.onSlugChange.bind(this)} value={this.props.slug} />
        </div>
      </div>
    );
  }
}

TitleSlug.propTypes = {
  validateSlug: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired
};
