import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import {getBestImageUrl} from '../utils';

export default class Image extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
    editing: PropTypes.bool
  }

  render () {
    if (this.props.id && this.props.id !== '') {
      const url = getBestImageUrl(this.props.id, this.props.width);
      var extraProps = {};

      forEach(this.props, (value, key) => {
        if (key !== 'id' && key !== 'width' && key !== 'height') {
          extraProps[key] = value;
        }
      });

      return (
        <img src={url} {...extraProps} />
      );
    } else if (this.props.editing) {
      const style = {};

      if (this.props.height) {
        style.height = this.props.height;
      }

      return (
        <div className='dummy-placeholder' style={style}>
          <i className='fa fa-image'></i>
        </div>
      );
    }

    return null;
  }
}
