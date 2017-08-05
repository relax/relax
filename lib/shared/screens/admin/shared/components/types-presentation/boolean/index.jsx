import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

export default class BooleanPresentation extends Component {
  static propTypes = {
    value: PropTypes.bool
  };

  render () {
    const {value} = this.props;
    return (
      <div>{value ? 'true' : 'false'}</div>
    );
  }
}
