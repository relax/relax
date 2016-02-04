import React from 'react';
import {Component} from 'relax-framework';

import MediaItem from '../media-item';

export default class ImagePicker extends Component {
  static fragments = MediaItem.fragments

  static propTypes = {
    width: React.PropTypes.any,
    height: React.PropTypes.number,
    calcWidth: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    openSelector: React.PropTypes.func.isRequired,
    onMount: React.PropTypes.func.isRequired,
    mounted: React.PropTypes.bool.isRequired,
    mediaItem: React.PropTypes.object
  }

  static defaultProps = {
    width: '100%',
    height: 135
  }

  componentDidMount () {
    const dom = this.refs.imageHolder;
    const rect = dom.getBoundingClientRect();

    const width = Math.round(rect.right - rect.left);

    this.props.onMount(width);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.value !== nextProps.value ||
      this.props.mounted !== nextProps.mounted ||
      this.props.mediaItem !== nextProps.mediaItem
    );
  }

  onClick (event) {
    event.preventDefault();
    this.props.openSelector();
  }

  render () {
    const style = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div className='image-picker-wrapper'>
        <div className='image-picker' style={style}>
          <div className='image-selected' onClick={this.onClick.bind(this)} ref='imageHolder'>
            {this.renderSelected()}
            <div className='image-change'>Choose Image</div>
          </div>
        </div>
        {this.renderUnselect()}
      </div>
    );
  }

  renderUnselect () {
    if (this.props.value && this.props.value !== '') {
      return (
        <div
          className='button button-faded-grey full vmargined'
          style={{width: this.props.width}}
          onClick={this.props.onChange.bind(this, '')}>
          Unselect Image
        </div>
      );
    }
  }

  renderSelected () {
    if (this.props.mounted && this.props.mediaItem && this.props.mediaItem._id) {
      return <MediaItem item={this.props.mediaItem} width={this.props.calcWidth} height={this.props.height} useThumbnail={false} />;
    }
  }
}
