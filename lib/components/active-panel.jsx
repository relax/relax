import React from 'react';
import {Component} from 'relax-framework';

export default class ActivePanel extends Component {
  render () {
    return (
      <div className={this.props.className || ''}>
        {this.context.activePanel}
      </div>
    );
  }
}

ActivePanel.contextTypes = {
  activePanel: React.PropTypes.any
};
