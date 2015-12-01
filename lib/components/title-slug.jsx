import slugify from 'slug';
import React from 'react';
import {Component} from 'relax-framework';

import Input from './data-types/input';

export default class TitleSlug extends Component {
  static propTypes = {
    validateSlug: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    isSlugValid: React.PropTypes.string,
    titlePlaceholder: React.PropTypes.string,
    slugPlaceholder: React.PropTypes.string
  }

  constructor (props) {
    super(props);

    this.onTitleChange = ::this.onTitleChange;
    this.onSlugChange = ::this.onSlugChange;
  }

  getInitState () {
    const {slug} = this.props;

    return {
      slugValid: slug !== '',
      hasTypedSlug: false,
      isSlugValidating: true,
      slug
    };
  }

  componentDidMount () {
    this.validateSlug();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.slug !== nextProps.slug) {
      this.setState({slug: nextProps.slug}, () => {
        this.validateSlug();
      });
    }
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
    const {slug, isSlugValidating} = this.state;

    if (slug) {
      !isSlugValidating && this.setState({isSlugValidating: true});
      await this.props.validateSlug(slug);
      this.setState({isSlugValidating: false});
    } else {
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
          <Input label='Title' type='text' onChange={this.onTitleChange} value={title} placeholder={this.props.titlePlaceholder} />
        </div>
        <div className='option'>
          <div className='label'>Slug</div>
          <Input label='Slug' state={state} type='text' onChange={this.onSlugChange} value={slug} placeholder={this.props.slugPlaceholder} />
        </div>
      </div>
    );
  }
}
