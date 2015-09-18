import {Component} from 'relax-framework';
import Lightbox from './lightbox';
import MediaSelector from './media-selector';
import React from 'react';
import Image from './image';

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

  componentDidMount () {
    super.componentDidMount();
    var dom = React.findDOMNode(this.refs.imageHolder);
    var rect = dom.getBoundingClientRect();

    var width = Math.round(rect.right-rect.left);

    this.setState({
      mounted: true,
      width
    });
  }

  onClick (event) {
    event.preventDefault();

    this.setState({
      opened: true
    });
  }

  onClose () {
    this.setState({
      opened: false
    });
  }

  changedSelected (id) {
    this.props.onChange(id);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.value !== nextProps.value ||
      this.state.opened !== nextState.opened ||
      this.state.mounted !== nextState.mounted
    );
  }

  renderLightbox () {
    if (this.state.opened) {
      return (
        <Lightbox onClose={this.onClose.bind(this)} title='Select an image'>
          <MediaSelector onChange={this.changedSelected.bind(this)} selected={this.props.value} />
        </Lightbox>
      );
    }
  }

  renderSelected () {
    if (this.state.mounted) {
      return (
        <Image id={this.props.value} width={this.state.width} height={this.props.height} />
      );
    }
  }

  render () {
    return (
      <div>
        <div className='image-picker' style={this.state.style}>
          <div className='image-selected' onClick={this.onClick.bind(this)} ref='imageHolder'>
            {this.renderSelected()}
            <div className='image-change'>Choose Image</div>
          </div>
        </div>
        {this.props.value !== '' && <div className='button button-faded-grey full vmargined ' onClick={this.changedSelected.bind(this, '')}>Unselect Image</div>}
        {this.renderLightbox()}
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

ImagePicker.defaultProps = {
  width: '100%',
  height: 135
};
