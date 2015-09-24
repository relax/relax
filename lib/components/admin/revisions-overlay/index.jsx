import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import Utils from '../../../utils';

import revisionsStore from '../../../client/stores/revisions';

export default class RevisionsOverlay extends Component {
  getInitialState () {
    return {
      revisions: [],
      state: false,
      message: '',
      restored: false
    };
  }

  getInitialCollections () {
    return {
      revisions: revisionsStore.getCollection({
        fetch: true,
        options: {
          id: this.props.current._id._id,
          projection: 'user date'
        }
      })
    };
  }

  onRestore (version) {
    this.props.onRestore(version);
  }

  renderRevision (revision, index) {
    const date = moment(revision.date).fromNow();
    return (
      <div className='revision' key={index}>
        <div className='icon-part'>
        </div>
        <div className='info-part'>
          <div className='title'>
            <span className='thumbnail'><img src={Utils.getGravatarImage(revision.user.email, 40)} /></span>
            <span>{revision.user.name}</span>
            <span> updated </span>
            <span>{date}</span>
          </div>
          {index > -1 ?
            <div className='under-title'>
              <div className='action' onClick={this.onRestore.bind(this, revision._id.__v)}>
                <i className='material-icons'>settings_backup_restore</i>
                <span>Restore</span>
              </div>
              <div className='action'>
                <i className='material-icons'>compare</i>
                <span>Compare</span>
              </div>
            </div>
          : <div className='under-title'>Current revision</div> }
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className='revisions-overlay'>
        <div className='title'>{this.props.current.title + ' revisions'}</div>
        <div>
          {this.renderRevision(this.props.current, -1)}
          {this.state.revisions.map(this.renderRevision, this)}
        </div>
      </div>
    );
  }
}

RevisionsOverlay.propTypes = {
  current: React.PropTypes.object.isRequired,
  onRestore: React.PropTypes.func.isRequired
};
