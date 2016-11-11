import Component from 'components/component';
import Utils from 'helpers/utils';
import elementStyles from 'styles/element.less';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Video extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    relax: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired
  };

  static defaultProps = {
    type: 'youtube',
    videoId: ''
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

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
    const {styleClassMap, relax} = this.props;
    const {Element} = this.context;

    return (
      <Element {...relax} className={styleClassMap.root} htmlTag='div' settings={settings}>
        {this.renderIframe()}
      </Element>
    );
  }

  renderIframe () {
    const {videoId, type, relax} = this.props;
    let result;

    let height = 300;
    if (this.state.width) {
      const videoHeight = relax.styleValues.videoHeight;
      height = Math.round(this.state.width * (parseInt(videoHeight, 10) / 100));
    }

    if (videoId) {
      let src = '';
      if (type === 'youtube') {
        const parsedID = Utils.parseYoutubeURL(videoId);
        src = `http://www.youtube.com/embed/${parsedID || videoId}`;
      } else if (type === 'vimeo') {
        const parsedID = Utils.parseVimeoURL(videoId);
        src = `http://player.vimeo.com/video/${parsedID || videoId}`;
      } else if (type === 'dailymotion') {
        const parsedID = Utils.parseDailymotionURL(videoId);
        src = `http://www.dailymotion.com/embed/video/${parsedID || videoId}`;
      }

      const iframe = (
        <iframe
          src={src}
          width='100%'
          height={height}
          frameBorder='0'
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      );

      if (relax.editing) {
        result = (
          <div className={elementStyles.editingWrapper}>
            {iframe}
            <div className={elementStyles.editingCover}></div>
          </div>
        );
      } else {
        result = iframe;
      }
    } else if (relax.editing) {
      result = (
        <div style={{height}} className={elementStyles.dummy}>
          <i className='nc-icon-outline media-1_video-66'></i>
        </div>
      );
    }

    return result;
  }
}
