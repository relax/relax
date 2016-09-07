import Component from 'components/component';
import React, {PropTypes} from 'react';

import StylePicker from './style-picker';
import TabEmpty from '../tab-empty';

export default class StyleTab extends Component {
  static propTypes = {
    stylable: PropTypes.bool.isRequired,
    eligable: PropTypes.bool.isRequired
  };

  render () {
    const {stylable, eligable} = this.props;
    let result;

    if (!eligable) {
      result = this.renderNoneSelected();
    } else if (stylable) {
      result = this.renderStylePicker();
    } else {
      result = this.renderNotStylable();
    }

    return result;
  }

  renderStylePicker () {
    return (
      <StylePicker />
    );
  }

  renderNoneSelected () {
    return (
      <TabEmpty />
    );
  }

  renderNotStylable () {
    return (
      <TabEmpty icon='nc-icon-outline media-1_edit-color'>
        Current selected element has no style options.
      </TabEmpty>
    );
  }
}
