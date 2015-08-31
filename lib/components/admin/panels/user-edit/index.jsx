import React from 'react';
import {Component} from 'relax-framework';
import Breadcrumbs from '../../../breadcrumbs';

export default class UserEdit extends Component {
  render () {
    //const user = this.context.editUser;

    return (
      <div className='admin-user-edit'>
        <div className='filter-menu'>
          <Breadcrumbs data={this.context.breadcrumbs} />
        </div>
        <div className='admin-scrollable'>
          <div className='list'>

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
