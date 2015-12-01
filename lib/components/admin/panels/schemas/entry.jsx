import React from 'react';
import {Component} from 'relax-framework';

import A from '../../../a';
import Lightbox from '../../../lightbox';

export default class Entry extends Component {
  static fragments = {
    schema: {
      _id: 1,
      title: 1,
      slug: 1
    }
  }

  static propTypes = {
    removeSchema: React.PropTypes.func.isRequired,
    schema: React.PropTypes.object.isRequired
  }

  getInitState () {
    return {
      removing: false
    };
  }

  onRemove (event) {
    event.preventDefault();
    this.setState({
      removing: true
    });
  }

  cancelRemove (event) {
    event.preventDefault();
    this.setState({
      removing: false
    });
  }

  confirmRemove (event) {
    event.preventDefault();
    this.props.removeSchema(this.constructor.fragments, this.props.schema._id);
    this.setState({
      removing: false
    });
  }

  render () {
    const schema = this.props.schema;
    const viewLink = '/admin/schema/' + schema._id;
    const editLink = '/admin/schemas/' + schema._id;
    const buildTemplateLink = '/admin/schemas/' + schema._id + '/template';

    return (
      <div key={schema._id} className='entry'>
        <div className='icon-part'>
          <i className='material-icons'>library_books</i>
        </div>
        <div className='info-part'>
          <div>
            <span className='title'>{schema.title}</span>
            <A className='sub-title' href={viewLink}>
              <i className='material-icons'>list</i>
              <span>Entries</span>
            </A>
          </div>
          <div className='under-title'>{schema.slug}</div>
          <div className='actions'>
            <A href={viewLink}>
              <i className='material-icons'>list</i>
              <span>Entries</span>
            </A>
            <A href={buildTemplateLink}>
              <i className='material-icons'>build</i>
              <span>Build Template</span>
            </A>
            <A href={editLink}>
              <i className='material-icons'>mode_edit</i>
              <span>Edit</span>
            </A>
            <a href='#' onClick={this.onRemove.bind(this)}>
              <i className='material-icons'>remove_circle_outline</i>
              <span>Remove</span>
            </a>
          </div>
        </div>
        {this.renderRemoving()}
      </div>
    );
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove the schema ' + this.props.schema.title + '?';
      const label1 = 'You will loose the schema and all entries in it';
      return (
        <Lightbox className='small' header={false}>
          <div className='big centered'>{label}</div>
          <div className='medium centered'>{label1}</div>
          <div className='centered space-above'>
            <a className='button button-grey margined' href='#' onClick={this.cancelRemove.bind(this)}>No, abort!</a>
            <a className='button button-alert margined' href='#' onClick={this.confirmRemove.bind(this)}>Yes, delete it!</a>
          </div>
        </Lightbox>
      );
    }
  }
}
