import bind from 'decorators/bind';
import cx from 'classnames';
import iconsData from 'statics/icons';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import IconSelector from './icon-selector';

export default class IconSelectorContainer extends Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      selectedFamily: 0,
      selected: this.props.value,
      search: ''
    };
  }

  @bind
  changeSelectedFamily (selectedFamily) {
    this.setState({
      selectedFamily
    });
  }

  @bind
  changeSearch (search) {
    this.setState({
      search
    });
  }

  @bind
  onClose () {
    const {selected} = this.state;
    const {value, onClose, onChange} = this.props;

    if (value !== selected) {
      onChange(selected);
    }

    onClose();
  }

  @bind
  onChange (icon) {
    const data = iconsData[this.state.selectedFamily];
    const value = {
      family: data.family,
      className: cx(data.baseClass, data.reference === 'className' && icon),
      content: data.reference === 'content' && icon
    };
    this.setState({
      selected: value
    });
  }

  render () {
    return (
      <IconSelector
        {...this.state}
        changeSelectedFamily={this.changeSelectedFamily}
        changeSearch={this.changeSearch}
        onChange={this.onChange}
        onClose={this.onClose}
        icons={iconsData}
      />
    );
  }
}
