import Animate from 'components/animate';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import Entry from './entry';

export default class StylePickerList extends Component {
  static propTypes = {
    styles: PropTypes.array.isRequired,
    changeStyle: PropTypes.func.isRequired,
    removeStyle: PropTypes.func.isRequired,
    currentId: PropTypes.string
  };

  render () {
    const {styles} = this.props;

    return (
      <Scrollable>
        <Animate transition='slideUpIn' duration={300}>
          <div>
            {styles.map(this.renderEntry, this)}
          </div>
        </Animate>
      </Scrollable>
    );
  }

  renderEntry (entry) {
    const {changeStyle, removeStyle, currentId} = this.props;

    if (entry._id !== currentId) {
      return (
        <Entry
          entry={entry}
          onClick={changeStyle}
          removeStyle={removeStyle}
          key={entry._id}
        />
      );
    }
  }
}
