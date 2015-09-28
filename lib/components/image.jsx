import React from 'react';
import {Component} from 'relax-framework';
import Utils from '../utils';
import forEach from 'lodash.foreach';

export default class Image extends Component {
  render () {
    if (this.props.id && this.props.id !== '') {
      const url = Utils.getBestImageUrl(this.props.id, this.props.width);
      var extraProps = {};

      forEach(this.props, (value, key) => {
        if (key !== 'id' && key !== 'width' && key !== 'height') {
          extraProps[key] = value;
        }
      });

      return (
        <img src={url} {...extraProps} />
      );
    } else if (this.context.editing) {
      let style = {};

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

Image.contextTypes = {
  editing: React.PropTypes.bool
};

Image.propTypes = {
  id: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number
};
