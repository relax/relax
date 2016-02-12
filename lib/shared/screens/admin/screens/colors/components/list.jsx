import Component from 'components/component';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class List extends Component {
  static fragments = {
    colors: Entry.fragments.color
  };

  static propTypes = {
    colors: PropTypes.array.isRequired
  };

  render () {
    const {colors} = this.props;
    return (
      <div>
        {colors.map(this.renderEntry, this)}
      </div>
    );
  }

  renderEntry (color) {
    return (
      <Entry color={color} key={color._id} />
    );
  }
}
