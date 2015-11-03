import moment from 'moment';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Utils from '../../../utils';

export default class RevisionsOverlay extends Component {
  static fragments = {
    revisions: {
      _id: {
        _id: 1,
        __v: 1
      },
      user: {
        email: 1,
        name: 1
      },
      date: 1
    }
  }
  static propTypes = {
    current: PropTypes.object.isRequired,
    revisions: PropTypes.array.isRequired,
    onRestorePage: PropTypes.func.isRequired
  }

  onRestore (version) {
    this.props.onRestorePage(version);
  }

  render () {
    return (
      <div className='revisions-overlay'>
        <div className='title'>{this.props.current.title + ' revisions'}</div>
        <div>
          {this.renderRevision(this.props.current, -1)}
          {this.props.revisions && this.props.revisions.map(::this.renderRevision)}
        </div>
      </div>
    );
  }

  renderRevision (revision, index) {
    const date = moment(revision.date).fromNow();
    return (
      <div className='revision' key={index}>
        <div className='icon-part'>
        </div>
        <div className='info-part'>
          <div className='title'>
            <span className='thumbnail'><img src={Utils.getGravatarImage(revision.user && revision.user.email || 'default', 40)} /></span>
            <span>{revision.user && revision.user.name || 'removed user'}</span>
            <span> updated </span>
            <span>{date}</span>
          </div>
          {index > -1 ?
            <div className='under-title'>
              <div className='action' onClick={this.onRestore.bind(this, revision._id.__v)}>
                <i className='material-icons'>settings_backup_restore</i>
                <span>Restore</span>
              </div>
            </div>
          : <div className='under-title'>Current revision</div> }
        </div>
      </div>
    );
  }
}
