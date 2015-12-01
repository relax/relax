import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import MediaImage from './image';
import Utils from '../utils';

export default class BackgroundImage extends Component {

  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    repeat: PropTypes.string.isRequired,
    vertical: PropTypes.number,
    horizontal: PropTypes.number,
    opacity: PropTypes.number
  }

  static defaultProps = {
    backgroundImage: '',
    repeat: 'no-repeat',
    vertical: 50,
    horizontal: 50,
    opacity: 100
  }

  getInitState () {
    return {
      mounted: false
    };
  }

  componentDidMount () {
    this.resize();
  }

  componentDidUpdate () {
    this.resize();
  }

  resize () {
    const dom = findDOMNode(this);
    const rect = dom.getBoundingClientRect();
    const width = Math.round(rect.right - rect.left);
    const height = Math.round(rect.bottom - rect.top);

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
        var imageStyle = {
          position: 'relative',
          minWidth: '100%',
          minHeight: '100%',
          maxWidth: 'none'
        };
        imageStyle.top = this.state.height * (this.props.vertical / 100);
        imageStyle.left = this.state.width * (this.props.horizontal / 100);
        Utils.translate(imageStyle, (-this.props.horizontal) + '%', (-this.props.vertical) + '%');

        result = (
          <div style={style}>
            <MediaImage id={this.props.backgroundImage} width={this.state.width} height={this.state.height} style={imageStyle} />
          </div>
        );
      } else {
        style.backgroundImage = 'url("' + Utils.getBestImageUrl(this.props.backgroundImage) + '")';
        style.backgroundRepeat = this.props.repeat;
        style.backgroundPosition = (-this.props.horizontal) + '% ' + (-this.props.vertical) + '%';
        result = <div style={style}></div>;
      }

      return result;
    }

    return <span/>;
  }
}
