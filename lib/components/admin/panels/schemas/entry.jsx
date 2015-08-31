import React from 'react';
import {Component} from 'relax-framework';
import A from '../../../a';
import Lightbox from '../../../lightbox';

import schemaActions from '../../../../client/actions/schema';

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
    schemaActions.remove(this.props.schema._id);
    this.setState({
      removing: false
    });
  }

  renderRemoving () {
    if (this.state.removing) {
      const label = 'Are you sure you want to remove the schema '+this.props.schema.title+'?';
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

  render () {
    const schema = this.props.schema;
    let viewLink = '/admin/schemas/'+schema.slug;

    return (
      <div key={schema._id} className='entry'>
        <div className='icon-part'>
          <i className='material-icons'>archive</i>
        </div>
        <div className='info-part'>
          <div>
            <span className='title'>{schema.title}</span>
            <A className='sub-title' href={viewLink}>
              <i className='material-icons'>inbox</i>
              <span>Entries</span>
            </A>
          </div>
          <div className='under-title'>{schema.slug}</div>
          <div className='actions'>
            <A href={viewLink}>
              <i className='material-icons'>inbox</i>
              <span>Entries</span>
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
}

Entry.propTypes = {
  schema: React.PropTypes.object.isRequired
};
