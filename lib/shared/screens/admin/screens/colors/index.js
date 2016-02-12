import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Colors from './components/colors.jsx';

@dataConnect()
@connect(
  (state) => ({
    colors: state.pages.data.items
  })
)
export default class ColorsContainer extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired
  };

  initialize () {
    this.props.fetchData({
      fragments: Colors.fragments
    });
  }

  render () {
    const {colors} = this.props;
    return (
      <Colors
        colors={colors}
      />
    );
  }
}
