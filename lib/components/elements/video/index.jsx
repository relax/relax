import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';
import Utils from '../../../utils';

export default class Video extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    videoHeight: PropTypes.number.isRequired,
    element: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object
  }

  static defaultProps = {
    type: 'youtube',
    videoId: '',
    videoHeight: '56%'
  };

  static propsSchema = propsSchema
  static settings = settings

  getInitState () {
    this.onResizeBind = ::this.onResize;
    return {
      mounted: false
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResizeBind);
    this.onResize();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResizeBind);
  }

  onResize () {
    const dom = findDOMNode(this);
    const rect = dom.getBoundingClientRect();
    const width = Math.round(rect.right - rect.left);
    this.setState({
      mounted: true,
      width
    });
  }

  render () {
    return (
      <Element info={this.props} htmlTag='div' settings={settings}>
        {this.renderIframe()}
      </Element>
    );
  }

  renderIframe () {
    let result;
    let height = 300;
    if (this.state.width) {
      height = Math.round(this.state.width * (parseInt(this.props.videoHeight, 10) / 100));
    }

    if (this.props.videoId && this.props.videoId !== '') {
      let src = '';
      if (this.props.type === 'youtube') {
        const parsedID = Utils.parseYoutubeURL(this.props.videoId);
        src = 'http://www.youtube.com/embed/' + (parsedID || this.props.videoId);
      } else if (this.props.type === 'vimeo') {
        const parsedID = Utils.parseVimeoURL(this.props.videoId);
        src = 'http://player.vimeo.com/video/' + (parsedID || this.props.videoId);
      } else if (this.props.type === 'dailymotion') {
        const parsedID = Utils.parseDailymotionURL(this.props.videoId);
        src = 'http://www.dailymotion.com/embed/video/' + (parsedID || this.props.videoId);
      }

      const iframe = <iframe src={src} width='100%' height={height} frameBorder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>;

      if (this.props.pageBuilder && this.props.pageBuilder.editing) {
        result = (
          <div className='editing-wrapper'>
            {iframe}
            <div className='editing-cover'></div>
          </div>
        );
      } else {
        result = iframe;
      }
    } else {
      const style = {
        height
      };
      result = (
        <div style={style} className='dummy-placeholder'>
          <i className='fa fa-video-camera'></i>
        </div>
      );
    }
    return result;
  }
}
