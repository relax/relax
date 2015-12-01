import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import {Component} from 'relax-framework';

import A from '../../../a';
import Lightbox from '../../../lightbox';

export default class Entry extends Component {
  static fragments = {
    schemaEntry: {
      _id: 1,
      title: 1,
      slug: 1,
      date: 1,
      state: 1,
      properties: 1
    },
    schema: {
      _id: 1,
      slug: 1
    }
  }
  static propTypes = {
    schema: React.PropTypes.object.isRequired,
    schemaEntry: React.PropTypes.object.isRequired,
    removeSchemaEntry: React.PropTypes.func.isRequired
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
    this.props.removeSchemaEntry(this.constructor.fragments, this.props.schema._id, this.props.schemaEntry._id);
    this.setState({
      removing: false
    });
  }

  render () {
    const {schemaEntry} = this.props;
    const editLink = '/admin/schema/' + this.props.schema._id + '/' + schemaEntry._id;
    const viewLink = '/' + this.props.schema.slug + '/' + schemaEntry.slug;
    const published = schemaEntry.state === 'published';
    const date = 'Created - ' + moment(schemaEntry.date).format('MMMM Do YYYY');

    return (
      <div key={schemaEntry._id} className='entry'>
        <div className={cx('icon-part', !published && 'unpublished')}>
          <i className='material-icons'>{published ? 'cloud_queue' : 'cloud_off'}</i>
        </div>
        <div className='info-part'>
          <div>
            <span className='title'>{schemaEntry.title}</span>
            <a className='sub-title' href={viewLink} target='_blank'>
              <i className='material-icons'>link</i>
              <span>{viewLink}</span>
            </a>
          </div>
          <div className='under-title'>{date}</div>
          <div className='under-title'>{schemaEntry.state}</div>
          <div className='actions'>
            <A href={editLink}>
              <i className='material-icons'>mode_edit</i>
              <span>Edit</span>
            </A>
            <a href={viewLink} target='_blank'>
              <i className='material-icons'>link</i>
              <span>View</span>
            </a>
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
      const label = 'Are you sure you want to remove the post ' + this.props.schemaEntry.title + '?';
      const label1 = 'This action cannot be reverted';
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
