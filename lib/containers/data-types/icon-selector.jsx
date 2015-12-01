import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import iconsData from '../../helpers/icons';
import IconSelector from '../../components/data-types/icon-selector';

export default class IconSelectorContainer extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.string.isRequired,
    getAdmin: PropTypes.func.isRequired
  }

  getInitState () {
    return {
      selectedFamily: 0,
      selected: this.props.value,
      search: ''
    };
  }

  changeSelectedFamily (value) {
    this.setState({
      selectedFamily: value
    });
  }

  onSelectedChange (icon) {
    const data = iconsData[this.state.selectedFamily];
    const value = {
      family: data.family,
      className: cx(data.baseClass, data.reference === 'className' && icon),
      content: data.reference === 'content' && icon
    };
    this.props.onChange(value);
    this.setState({
      selected: value
    });
  }

  changeSearch (value) {
    this.setState({
      search: value
    });
  }

  render () {
    return (
      <IconSelector
        {...this.props}
        {...this.state}
        icons={iconsData}
        changeSelectedFamily={::this.changeSelectedFamily}
        onSelectedChange={::this.onSelectedChange}
        changeSearch={::this.changeSearch}
      />
    );
  }
}
