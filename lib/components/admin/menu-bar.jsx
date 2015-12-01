import A from '../a';
import React from 'react';
import {Component} from 'relax-framework';
import cx from 'classnames';
import Utils from '../../utils';

export default class MenuBar extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    activePanelType: React.PropTypes.string,
    breadcrumbs: React.PropTypes.array
  }

  getInitState () {
    return {
      userOpened: false
    };
  }

  toggleUser () {
    this.setState({
      userOpened: !this.state.userOpened
    });
  }

  render () {
    const links = [
      {
        type: 'settings',
        link: '/admin',
        label: 'General Settings'
      },
      {
        type: 'pages',
        link: '/admin/pages',
        label: 'Pages'
      },
      {
        type: 'schemas',
        link: '/admin/schemas',
        label: 'Schemas'
      },
      {
        type: 'menus',
        link: '/admin/menus',
        label: 'Menus'
      },
      {
        type: 'media',
        link: '/admin/media',
        label: 'Media'
      },
      {
        type: 'fonts',
        link: '/admin/fonts',
        label: 'Fonts'
      },
      {
        type: 'colors',
        link: '/admin/colors',
        label: 'Colors'
      },
      {
        type: 'users',
        link: '/admin/users',
        label: 'Users'
      }
    ];

    return (
      <nav className='admin-menu-bar'>
        <div className='top-info'>
          <i className='material-icons'>dashboard</i>
          <span>Dashboard</span>
        </div>
        <div className='menu'>
          <ul>
            {links.map(this.renderLink, this)}
          </ul>
        </div>
        {this.renderUser()}
      </nav>
    );
  }

  renderLink (link) {
    const active = this.props.activePanelType === link.type || (this.props.breadcrumbs && this.props.breadcrumbs.length > 0 && this.props.breadcrumbs[0].type === link.type);

    return (
      <li key={link.type}>
        <A className={cx(active && 'active')} href={link.link}>{link.label}</A>
      </li>
    );
  }

  renderOpenedUser () {
    if (this.state.userOpened) {
      const editLink = '/admin/users/' + this.props.user.username;
      return (
        <div className='toggle-menu'>
          <a href='/admin/logout'>
            <i className='material-icons'>directions_run</i>
            <span>Log out</span>
          </a>
          <A href={editLink}>
            <i className='material-icons'>person</i>
            <span>Profile</span>
          </A>
        </div>
      );
    }
  }

  renderUser () {
    if (this.props.user) {
      var url = Utils.getGravatarImage(this.props.user.email, 25);
      return (
        <div className='user-menu'>
          <div className='thumbnail'>
            <img src={url} />
          </div>
          <span>{this.props.user.name}</span>
          <div className={cx('toggle-btn', this.state.userOpened && 'active')} onClick={this.toggleUser.bind(this)}>
            <i className='material-icons'>{this.state.userOpened ? 'arrow_drop_down' : 'arrow_drop_up'}</i>
            {this.renderOpenedUser()}
          </div>
        </div>
      );
    }
  }
}
