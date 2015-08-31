import React from 'react';
import Component from '../../component';
import Element from '../../element';
import Utils from '../../../utils';

import settings from './settings';
import propsSchema from './props-schema';

export default class Video extends Component {
  getInitialState () {
    this.onResizeBind = this.onResize.bind(this);
    return {
      mounted: false
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResizeBind);
    this.onResize();
  }

  onResize () {
    var dom = React.findDOMNode(this);
    var rect = dom.getBoundingClientRect();

    var width = Math.round(rect.right-rect.left);

    this.setState({
      mounted: true,
      width
    });
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResizeBind);
  }

  renderIframe () {
    var height = 300;
    if (this.state.width) {
      height = Math.round(this.state.width * (this.props.videoHeight / 100));
    }

    if (this.props.videoId && this.props.videoId !== '') {
      var src = '';

      if (this.props.type === 'youtube') {
        let parsedID = Utils.parseYoutubeURL(this.props.videoId);
        src = 'http://www.youtube.com/embed/' + (parsedID || this.props.videoId);
      } else if (this.props.type === 'vimeo') {
        let parsedID = Utils.parseVimeoURL(this.props.videoId);
        src = 'http://player.vimeo.com/video/' + (parsedID || this.props.videoId);
      } else if (this.props.type === 'dailymotion') {
        let parsedID = Utils.parseDailymotionURL(this.props.videoId);
        src = 'http://www.dailymotion.com/embed/video/' + (parsedID || this.props.videoId);
      }

      var iframe = <iframe src={src} width="100%" height={height} frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>;

      if (this.context.editing) {
        return (
          <div className='editing-wrapper'>
            {iframe}
            <div className='editing-cover'></div>
          </div>
        );
      } else {
        return iframe;
      }
    } else {
      let style = {
        height
      };
      return (
        <div style={style} className='dummy-placeholder'>
          <i className='fa fa-video-camera'></i>
        </div>
      );
    }
  }

  render () {
    var style = {};

    return (
      <Element tag='div' style={style} element={this.props.element} settings={this.constructor.settings}>
        {this.renderIframe()}
      </Element>
    );
  }
}

Video.contextTypes = {
  editing: React.PropTypes.bool.isRequired
};

Video.propTypes = {
  type: React.PropTypes.string.isRequired,
  videoId: React.PropTypes.string.isRequired,
  videoHeight: React.PropTypes.number.isRequired
};

Video.defaultProps = {
  type: 'youtube',
  videoId: '',
  videoHeight: 56
};

Video.propsSchema = propsSchema;
Video.settings = settings;
