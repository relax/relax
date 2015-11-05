import * as adminActions from '../../client/actions/admin';

import cx from 'classnames';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Component, buildQueryAndVariables} from 'relax-framework';

import iconsData from '../../helpers/icons';
import IconSelector from '../../components/data-types/icon-selector';

@connect(
  (state) => ({
    iconsFamilies: state.settings.data.icons || {}
  }),
  (dispatch) => bindActionCreators(adminActions, dispatch)
)
export default class IconSelectorContainer extends Component {
  static fragments = {
    settings: {
      _id: 1,
      value: 1
    }
  }

  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.string.isRequired,
    getAdmin: PropTypes.func.isRequired
  }

  getInitialState () {
    return {
      selectedFamily: 0,
      selected: this.props.value
    };
  }

  componentDidMount () {
    const vars = {
      settings: {
        ids: {
          value: ['icons'],
          type: '[String]!'
        }
      }
    };

    this.props.getAdmin(buildQueryAndVariables(
      this.constructor.fragments,
      vars
    )).done();
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

  render () {
    return (
      <IconSelector
        {...this.props}
        {...this.state}
        icons={iconsData}
        changeSelectedFamily={::this.changeSelectedFamily}
        onSelectedChange={::this.onSelectedChange}
      />
    );
  }
}
