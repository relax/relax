import React from 'react';
import {Component} from 'relax-framework';
import MediaImage from './image';
import Utils from '../utils';

export default class BackgroundImage extends Component {
  getInitialState () {
    return {
      mounted: false
    };
  }

  componentDidMount () {
    super.componentDidMount();
    this.resize();
  }

  componentDidUpdate () {
    this.resize();
  }

  resize () {
    var dom = React.findDOMNode(this);
    var rect = dom.getBoundingClientRect();

    var width = Math.round(rect.right-rect.left);
    var height = Math.round(rect.bottom-rect.top);

    if (this.state.width !== width || this.state.height !== height) {
      this.setState({
        mounted: true,
        width,
        height
      });
    }
  }

  render () {
    if (this.state.mounted && this.props.backgroundImage && this.props.backgroundImage !== '') {
      let result;
      var style = {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        overflow: 'hidden',
        opacity: this.props.opacity / 100
      };

      if (this.props.repeat === 'no-repeat') {
        var imageStyle= {
          position: 'relative',
          minWidth: '100%',
          minHeight: '100%',
          maxWidth: 'none'
        };
        imageStyle.top = this.state.height * (this.props.vertical / 100);
        imageStyle.left = this.state.width * (this.props.horizontal / 100);
        Utils.translate(imageStyle, (-this.props.horizontal)+'%', (-this.props.vertical)+'%');

        result = (
          <div style={style}>
            <MediaImage id={this.props.backgroundImage} width={this.state.width} height={this.state.height} style={imageStyle} />
          </div>
        );
      } else {
        style.backgroundImage = 'url("'+Utils.getBestImageUrl(this.props.backgroundImage)+'")';
        style.backgroundRepeat = this.props.repeat;
        style.backgroundPosition = (-this.props.horizontal)+'% '+(-this.props.vertical)+'%';
        result = <div style={style}></div>;
      }

      return result;
    }

    return <span/>;
  }
}

BackgroundImage.propTypes = {
  backgroundImage: React.PropTypes.string.isRequired,
  repeat: React.PropTypes.string.isRequired,
  vertical: React.PropTypes.number,
  horizontal: React.PropTypes.number,
  opacity: React.PropTypes.number
};

BackgroundImage.defaultProps = {
  backgroundImage: '',
  repeat: 'no-repeat',
  vertical: 50,
  horizontal: 50,
  opacity: 100
};
