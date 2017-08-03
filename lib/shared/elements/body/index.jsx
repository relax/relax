import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import settings from './settings';

export default class BodyElement extends Component {
  static propTypes = {
    renderChildren: PropTypes.func.isRequired
  };

  static settings = settings;

  render () {
    const {renderChildren} = this.props;

    return (
      <div>
        {renderChildren()}
      </div>
    );
  }
}
