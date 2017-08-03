import {getBestImageUrl} from 'helpers/utils';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

export default class Image extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    width: 200,
    height: 0
  };

  render () {
    const {id, width, height, ...htmlProps} = this.props;
    let result = null;

    if (id) {
      const url = getBestImageUrl(id, width, height);
      result = (
        <img src={url} {...htmlProps} role='presentation' />
      );
    }

    return result;
  }
}
