import {Component} from 'relax-framework';
import MediaSelector from './media-selector';
import React from 'react';
import MediaItem from './media-item';

import mediaStore from '../client/stores/media';

export default class ImagePicker extends Component {
  getInitialState () {
    return {
      style: {
        width: this.props.width,
        height: this.props.height
      },
      opened: false,
      mounted: false
    };
  }

  getInitialModels () {
    var models = {};

    if (this.props.value && this.props.value !== '') {
      models.image = mediaStore.getModel(this.props.value);
    }

    return models;
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      if (nextProps.value && nextProps.value !== '' && typeof nextProps.value !== 'undefined') {
        this.setModels({
          image: mediaStore.getModel(nextProps.value)
        });
      } else {
        this.unsetModels(['image']);
        this.setState({
          image: null
        });
      }
    }
  }

  componentDidMount () {
    super.componentDidMount();
    var dom = this.refs.imageHolder;
    var rect = dom.getBoundingClientRect();

    var width = Math.round(rect.right-rect.left);

    this.setState({
      mounted: true,
      width
    });
  }

  onClick (event) {
    event.preventDefault();
    this.context.addLightbox((
      <MediaSelector onChange={this.changedSelected.bind(this)} selected={this.props.value} />
    ), {title: 'Select an image'});
  }

  changedSelected (id) {
    this.props.onChange(id);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.value !== nextProps.value ||
      this.state.opened !== nextState.opened ||
      this.state.mounted !== nextState.mounted ||
      this.state.image !== nextState.image
    );
  }

  renderSelected () {
    if (this.state.mounted && this.state.image && this.state.image._id) {
      return <MediaItem item={this.state.image} width={this.state.width} height={this.props.height} useThumbnail={false} />;
    }
  }

  render () {
    return (
      <div className='image-picker-wrapper'>
        <div className='image-picker' style={this.state.style}>
          <div className='image-selected' onClick={this.onClick.bind(this)} ref='imageHolder'>
            {this.renderSelected()}
            <div className='image-change'>Choose Image</div>
          </div>
        </div>
        {this.props.value && this.props.value !== '' && <div className='button button-faded-grey full vmargined' style={{width: this.state.width || this.props.width}} onClick={this.changedSelected.bind(this, '')}>Unselect Image</div>}
      </div>
    );
  }
}

ImagePicker.propTypes = {
  width: React.PropTypes.any,
  height: React.PropTypes.number,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired
};

ImagePicker.contextTypes = {
  addLightbox: React.PropTypes.func.isRequired
};

ImagePicker.defaultProps = {
  width: '100%',
  height: 135
};
