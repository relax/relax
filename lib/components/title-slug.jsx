import {Component} from 'relax-framework';
import React from 'react';
import slugify from 'slug';
import Q from 'q';

import Input from './input';

export default class TitleSlug extends Component {
  static propTypes = {
    validateSlug: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    isSlugValid: React.PropTypes.string
  }

  static defaultProps = {
    isSlugValid: false
  }

  constructor (props, context) {
    super(props, context);

    this.onTitleChange = ::this.onTitleChange;
    this.onSlugChange = ::this.onSlugChange;
  }

  getInitialState () {
    const {slug} = this.props;

    return {
      slugValid: slug !== '',
      hasTypedSlug: false,
      slug
    };
  }

  componentDidMount () {
    this.validateSlug();
  }

  componentWillUnmount () {
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

  async validateSlug () {
    const {slug} = this.state;

    if (slug) {
      this.setState({isSlugValidating: true});
      await this.props.validateSlug(slug);
      this.setState({isSlugValidating: false});
    }
  }

  render () {
    const {isSlugValid, title, slug} = this.props;
    const {isSlugValidating} = this.state;

    var state;

    if (isSlugValidating) {
      state = 'loading';
    } else if (isSlugValid) {
      state = 'valid';
    } else {
      state = 'invalid';
    }

    return (
      <div>
        <div className='option'>
          <div className='label'>Title</div>
          <Input label='Title' type='text' onChange={this.onTitleChange} value={title} />
        </div>
        <div className='option'>
          <div className='label'>Slug</div>
          <Input label='Slug' state={state} type='text' onChange={this.onSlugChange} value={slug} />
        </div>
      </div>
    );
  }
}
