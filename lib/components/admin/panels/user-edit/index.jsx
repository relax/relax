import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';

import Breadcrumbs from '../../../breadcrumbs';
import {getGravatarImage} from '../../../../utils';

export default class UserEdit extends Component {
  static fragments = {
    user: {
      email: 1,
      name: 1,
      username: 1,
      date: 1
    }
  }

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    breadcrumbs: React.PropTypes.array.isRequired
  }

  render () {
    const user = this.props.user;
    const url = getGravatarImage(user.email, 70);
    const createdDate = moment(user.date).format('MMMM Do YYYY');

    const breadcrumbs = this.props.breadcrumbs.slice();
    breadcrumbs.push({
      label: this.props.user.name
    });

    return (
      <div className='admin-user-edit'>
        <div className='filter-menu'>
          <Breadcrumbs data={breadcrumbs} />
        </div>
        <div className='admin-scrollable'>
          <div className='list'>
            <div>
              <div className='image-part'>
                <img src={url} />
              </div>
              <div className='info-part'>
                {user.name}
              </div>
            </div>
            <div className='infos'>
              <div className='info'>
                <i className='material-icons'>today</i>
                <span>Created at</span>
                <div>{createdDate}</div>
              </div>
              <div className='info'>
                <i className='material-icons'>person</i>
                <span>Username</span>
                <div>{user.username}</div>
              </div>
              <div className='info'>
                <i className='material-icons'>mail</i>
                <span>Email</span>
                <div>{user.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
