import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import StylePicker from './style-picker';
import TabEmpty from '../tab-empty';

export default class StyleTab extends Component {
  static propTypes = {
    stylable: PropTypes.bool.isRequired,
    eligable: PropTypes.bool.isRequired,
    isTemplate: PropTypes.bool.isRequired
  };

  render () {
    const {stylable, eligable, isTemplate} = this.props;
    let result;

    if (!eligable) {
      result = this.renderNoneSelected();
    } else if (isTemplate) {
      result = this.renderIsTemplate();
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

  renderIsTemplate () {
    return (
      <TabEmpty icon='nc-icon-outline ui-1_circle-remove'>
        Current selected element is from the template and can only be edit there.
      </TabEmpty>
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
