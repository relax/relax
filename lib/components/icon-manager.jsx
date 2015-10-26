import React from 'react';
import {Component} from 'relax-framework';
import Lightbox from './lightbox';

import icons from '../helpers/icons';

export default class IconManager extends Component {
  getInitialState () {
    return {
      tab: 0,
      search: ''
    };
  }

  changeTab (tab, event) {
    event.preventDefault();
    this.setState({
      tab
    });
  }

  searchChange (event) {
    this.setState({
      search: event.target.value
    });
  }

  toggleIcon (icon, event) {
    event.preventDefault();
    this.props.toggleIcon(icon);
  }

  renderTab (info, key) {
    var className = 'tab-button';

    if (this.state.tab === key) {
      className += ' active';
    }

    return (
      <div className={className} onClick={this.changeTab.bind(this, key)} key={key}>
        {info.family}
        <span className='number'> ({info.icons.length})</span>
      </div>
    );
  }

  renderIcon (icon, key) {
    var valid = true;

    if (this.state.search !== '') {
      valid = icon.indexOf(this.state.search) !== -1;
    }

    if (valid) {
      var className = 'icon';

      if (this.props.icons.indexOf(icon) !== -1) {
        className += ' active';
      }

      return (
        <div className={className} key={key} onClick={this.toggleIcon.bind(this, icon)}>
          <i className={icon}></i>
          <p>{icon}</p>
        </div>
      );
    }
  }

  renderContent () {
    if (icons[this.state.tab] && icons[this.state.tab].icons) {
      return icons[this.state.tab].icons.map(this.renderIcon, this);
    }
  }

  render () {
    return (
      <Lightbox onClose={this.props.onClose} title={'Icons Manager'}>
        <div className='icons-manager'>
          <div className='tabs'>
            <p className='label'>ICONS FONTS</p>
            <div>
              {icons.map(this.renderTab, this)}
            </div>
          </div>
          <div className='content'>
            <div className='label'>
              <span>AVAILABLE ICONS</span>
              <input className='input right' onChange={this.searchChange.bind(this)} value={this.state.search} />
              <span className='right'>SEARCH</span>
            </div>
            <div className='icons'>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </Lightbox>
    );
  }
}

IconManager.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  icons: React.PropTypes.array.isRequired,
  toggleIcon: React.PropTypes.func.isRequired
};
