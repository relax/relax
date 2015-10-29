import React from 'react';
import {Component} from 'relax-framework';
import IconManager from './icon-manager';

// import settingsStore from '../client/stores/settings';
// import settingsActions from '../client/actions/settings';

export default class IconPicker extends Component {
  getInitialState () {
    return {
      opened: false,
      manager: false,
      icons: []
    };
  }

  open (event) {
    event.preventDefault();
    this.setState({
      opened: true
    });
  }

  close () {
    this.setState({
      opened: false
    });
  }

  onManagerOpen (event) {
    event.preventDefault();
    this.setState({
      manager: true
    });
  }

  onManagerClose () {
    this.setState({
      manager: false
    });
  }

  closeDelay () {
    this.closeTimeout = setTimeout(this.close.bind(this), 600);
  }

  enter () {
    clearTimeout(this.closeTimeout);
  }

  onIconClick (icon) {
    this.props.onChange(icon);
    this.close();
  }

  toggleIcon (icon) {
    this.state.icons = this.state.icons || {};

    var icons = this.state.icons.value || [];
    var ind = icons.indexOf(icon);

    if (ind === -1) {
      icons.push(icon);
    } else {
      icons.splice(ind, 1);
    }

    // Confident set state before save completed
    this.setState({
      icons: {
        value: icons
      }
    });

  //   settingsActions.saveSettings({
  //     icons
  //   });
  }

  renderSelected () {
    if (this.props.value) {
      return (
        <div className='selected' onClick={this.open.bind(this)}>
          <i className={this.props.value}></i>
        </div>
      );
    } else {
      return <p onClick={this.open.bind(this)}>No icon selected</p>;
    }
  }

  renderIcon (icon) {
    var className = 'icon';

    if (this.props.value === icon) {
      className += ' active';
    }

    return (
      <div className={className} onClick={this.onIconClick.bind(this, icon)} key={icon}>
        <i className={icon}></i>
      </div>
    );
  }

  renderIcons () {
    if (this.state.icons.value && this.state.icons.value.length > 0) {
      return this.state.icons.value.map(this.renderIcon, this);
    } else {
      return <p>No icons selected yet, you can add icons by opening the icon manager below</p>;
    }
  }

  renderPicker () {
    if (this.state.opened) {
      return (
        <div className='icon-picker-opened' onMouseEnter={this.enter.bind(this)} onMouseLeave={this.closeDelay.bind(this)}>
          <div className='scrollable'>
            {this.renderIcons()}
          </div>
          <a className='manage-icons' href='#' onClick={this.onManagerOpen.bind(this)}><i className='fa fa-plus'></i> Manage icons</a>
        </div>
      );
    }
  }

  renderManager () {
    if (this.state.manager) {
      var icons = this.state.icons.value || [];
      return <IconManager toggleIcon={this.toggleIcon.bind(this)} onClose={this.onManagerClose.bind(this)} icons={icons} />;
    }
  }

  render () {
    return (
      <div className='icon-picker'>
        {this.renderSelected()}
        {this.renderPicker()}
        {this.renderManager()}
      </div>
    );
  }
}

IconPicker.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
};
