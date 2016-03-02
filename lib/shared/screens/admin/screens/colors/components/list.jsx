import Component from 'components/component';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relax-fragments';

import Entry from './entry';

export default class List extends Component {
  static fragments = mergeFragments({
    colors: Entry.fragments.color
  }, {
    colors: {
      _id: 1,
      label: 1
    }
  });

  static propTypes = {
    colors: PropTypes.array.isRequired,
    search: PropTypes.string
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
    const {search} = this.props;
    let valid = true;

    if (search) {
      valid = color.label.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    }

    if (valid) {
      return (
        <Entry color={color} key={color._id} />
      );
    }
  }
}
