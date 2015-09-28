import React from 'react';
import {Component} from 'relax-framework';
import moment from 'moment';
import Breadcrumbs from '../../../breadcrumbs';
import utils from '../../../../utils';

export default class UserEdit extends Component {
  render () {
    //const user = this.context.editUser;
    let url = utils.getGravatarImage(this.context.editUser.email, 70);
    const createdDate = moment(this.context.editUser.date).format('MMMM Do YYYY');

    return (
      <div className='admin-user-edit'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.context.breadcrumbs} />
        </div>
        <div className='admin-scrollable'>
          <div className='list'>
            <div>
              <div className='image-part'>
                <img src={url} />
              </div>
              <div className='info-part'>
                {this.context.editUser.name}
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
                <div>{this.context.editUser.username}</div>
              </div>
              <div className='info'>
                <i className='material-icons'>mail</i>
                <span>Email</span>
                <div>{this.context.editUser.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserEdit.contextTypes = {
  editUser: React.PropTypes.object.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired
};
