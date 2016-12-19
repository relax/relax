import Component from 'components/component';
import React, {PropTypes} from 'react';

import settings from './settings';

export default class BodyElement extends Component {
  static propTypes = {
    renderChildren: PropTypes.func.isRequired
  };

  static settings = settings;

  render () {
    return (
      <div>
        {this.props.renderChildren()}
      </div>
    );
  }
}
