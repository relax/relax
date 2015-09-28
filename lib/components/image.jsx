import React from 'react';
import {Component} from 'relax-framework';
import Utils from '../utils';
import forEach from 'lodash.foreach';

import mediaStore from '../client/stores/media';

export default class Image extends Component {
  getInitialState () {
    return {
      requested: false
    };
  }

  getInitialModels () {
    var models = {};

    if (this.props.id && this.props.id !== '') {
      models.image = mediaStore.getModel(this.props.id);
    }

    return models;
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id) {
      if (nextProps.id && nextProps.id !== '') {
        this.setModels({
          image: mediaStore.getModel(nextProps.id)
        });
      } else {
        this.unsetModels(['image']);
        this.setState({
          image: null
        });
      }
    }
  }

  render () {
    if (this.state.image && this.state.image._id === this.props.id) {
      const url = Utils.getBestImageUrl(this.state.image._id, this.props.width);
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
