import Component from 'components/component';
import React, {PropTypes} from 'react';

export default class Revision extends Component {
  static fragments = {
    revision: {
      _id: 1,
      version: 1,
      itemId: 1,
      user: {
        _id: 1,
        name: 1,
        email: 1
      },
      date: 1
    }
  };

  static propTypes = {
    revision: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        revision
      </div>
    );
  }
}
