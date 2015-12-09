import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class Overlays extends Component {
  static propTypes = {
    overlays: PropTypes.array.isRequired
  }

  render () {
    return (
      <div>
        {this.props.overlays.map(this.renderOverlay, this)}
      </div>
    );
  }

  renderOverlay (overlay) {
    var result;

    if (overlay.component.prototype) {
      result = <overlay.component key={overlay.id} />;
    } else {
      result = overlay.component;
    }

    return result;
  }
}
