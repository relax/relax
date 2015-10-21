import A from '../../../a';
import Lightbox from '../../../lightbox';
import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import cx from 'classnames';

import schemaEntriesActionsFactory from '../../../../client/actions/schema-entries';

export default class Entry extends Component {
  getInitialState () {
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
    schemaEntriesActionsFactory(this.props.schema.slug).remove(this.props.schemaItem._id);
    this.setState({
      removing: false
    });
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove the post '+this.props.schemaItem._title+'?';
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

  render () {
    const schemaItem = this.props.schemaItem;
    let editLink = '/admin/schema/'+this.props.schema.slug+'/'+schemaItem._slug;
    let viewLink = '/'+this.props.schema.slug+'/'+schemaItem._slug;
    const published = schemaItem._state === 'published';
    let date = 'Created - ' + moment(schemaItem._date).format('MMMM Do YYYY');

    return (
      <div key={schemaItem._id} className='entry'>
        <div className={cx('icon-part', !published && 'unpublished')}>
          <i className='material-icons'>{published ? 'cloud_queue' : 'cloud_off'}</i>
        </div>
        <div className='info-part'>
          <div>
            <span className='title'>{schemaItem._title}</span>
            <a className='sub-title' href={viewLink} target='_blank'>
              <i className='material-icons'>link</i>
              <span>{viewLink}</span>
            </a>
          </div>
          <div className='under-title'>{date}</div>
          <div className='under-title'>{schemaItem._state}</div>
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
}

Entry.propTypes = {
  schema: React.PropTypes.object.isRequired,
  schemaItem: React.PropTypes.object.isRequired
};
