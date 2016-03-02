import dataConnect from 'decorators/data-connector';
import Component from 'components/component';
import React, {PropTypes} from 'react';

import Colors from './components/colors.jsx';

@dataConnect(
  () => ({
    fragments: Colors.fragments
  })
)
export default class ColorsContainer extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired
  };

  static defaultProps = {
    colors: []
  };

  render () {
    const {colors} = this.props;
    return (
      <Colors
        colors={colors}
      />
    );
  }
}
