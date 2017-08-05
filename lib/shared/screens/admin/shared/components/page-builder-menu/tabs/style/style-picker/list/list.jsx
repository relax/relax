import Animate from 'components/animate';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React from 'react';
import PropTypes from 'prop-types';

import Entry from './entry';
import TabEmpty from '../../../tab-empty';

export default class StylePickerList extends Component {
  static propTypes = {
    styles: PropTypes.array.isRequired,
    changeStyle: PropTypes.func.isRequired,
    removeStyle: PropTypes.func.isRequired,
    duplicateStyle: PropTypes.func.isRequired,
    currentId: PropTypes.string
  };

  render () {
    return (
      <Scrollable>
        <Animate transition='slideUpIn' duration={300}>
          {this.renderContent()}
        </Animate>
      </Scrollable>
    );
  }

  renderContent () {
    const {styles, changeStyle, currentId} = this.props;
    let result;

    if (styles.length) {
      result = (
        <div>
          {
            currentId &&
            <Entry
              entry={{
                _id: undefined,
                title: 'No style'
              }}
              onClick={changeStyle}
              key={'no_style'}
            />
          }
          {styles.map(this.renderEntry, this)}
        </div>
      );
    } else {
      result = (
        <TabEmpty icon='nc-icon-outline emoticons_puzzled'>
          No styles created for this type of element yet
        </TabEmpty>
      );
    }

    return result;
  }

  renderEntry (entry) {
    const {changeStyle, removeStyle, duplicateStyle, currentId} = this.props;

    if (entry._id !== currentId) {
      return (
        <Entry
          entry={entry}
          onClick={changeStyle}
          removeStyle={removeStyle}
          duplicateStyle={duplicateStyle}
          key={entry._id}
        />
      );
    }
  }
}
