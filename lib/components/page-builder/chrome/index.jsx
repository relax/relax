import React from 'react';
import {Component} from 'relax-framework';

import PropsMenu from './props-menu';

export default class Chrome extends Component {
  getInitialState () {
    return {
      panel: false
    };
  }

  renderPropsMenu () {
    if (this.context.editing) {
      return (
        <PropsMenu panel={this.state.panel} />
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderPropsMenu()}
      </div>
    );
  }
}

Chrome.contextTypes = {
  editing: React.PropTypes.bool.isRequired
};
