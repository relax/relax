import React from 'react';
import Component from '../../component';
import Element from '../../element';
import styles from '../../../styles';
import cx from 'classnames';
import utils from '../../../utils';
import mediaStore from '../../../client/stores/media';

import BackgroundImage from '../../background-image';

import settings from './settings';
import style from './style';
import classes from './classes';
import propsSchema from './props-schema';
import defaultChildren from './default-children';

import $ from 'jquery';
import {soundManager} from 'soundmanager2';

const consumer_key = '6c786345f5161898f1e1380802ce9226';

export default class MusicPlayer extends Component {
  getInitialState () {
    if (!this.context.editing && this.isClient()) {
      if (this.props.type === 'soundcloud') {
        this.loadSoundcloud();
      }
    }

    return {
      playing: false,
      muted: false,
      loadedPercentage: 0,
      loadedLabel: '00:00',
      playedPercentage: 0,
      playedLabel: '00:00',
      volume: this.props.defaultVolume
    };
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    if (this.sound) {
      this.sound.destruct();
    }
  }

  getInitialModels () {
    let models = {};

    if (!this.context.editing && this.props.type === 'local' && this.props.sound && this.props.sound !== '') {
      models.sound = mediaStore.getModel(this.props.sound);
    }

    return models;
  }

  componentDidUpdate (prevProps, prevState) {
    if (!this.context.editing && !prevState.sound && this.state.sound) {
      this.url = this.state.sound.url;
      soundManager.onready(this.createSound.bind(this));
    }
  }

  loadSoundcloud () {
    $.getJSON('http://api.soundcloud.com/resolve?url=' + this.props.soundcloud + '&format=json&consumer_key=' + consumer_key + '&callback=?', this.soundcloudLoaded.bind(this));
  }

  soundcloudLoaded (soundcloudInfo) {
    this.url = soundcloudInfo.stream_url;

    if (this.url.indexOf('secret_token') === -1) {
      this.url += '?';
    } else {
      this.url += '&';
    }

    this.url += 'consumer_key=' + consumer_key;
    soundManager.onready(this.createSound.bind(this));
  }

  createSound () {
    this.sound = soundManager.createSound({
      id: 'sound_'+this.props.element.id,
      url: this.url,
      autoLoad: false,
      autoPlay: false,
      onfinish: this.playingStatusChanged.bind(this),
      whileloading: this.whileLoading.bind(this),
      whileplaying: this.whilePlaying.bind(this),
      volume: this.state.volume
    });

    this.playingStatusChanged();
  }

  whileLoading () {
    var loadedPercentage = this.sound.bytesLoaded / this.sound.bytesTotal;

    var secondsPassed = Math.round(this.sound.duration/1000);
    var minutesPassed = 0;
    if (secondsPassed >= 60) {
      minutesPassed = Math.floor(secondsPassed/60);
      secondsPassed = secondsPassed - minutesPassed*60;
    }
    var loadedLabel = (minutesPassed < 10 ? '0'+minutesPassed : minutesPassed) + ':' + (secondsPassed < 10 ? '0'+secondsPassed : secondsPassed);

    this.setState({
      loadedPercentage,
      loadedLabel
    });
  }

  whilePlaying () {
    var playedPercentage;
    if (this.sound.loaded) {
      playedPercentage = this.sound.position / this.sound.duration;
    } else {
      playedPercentage = this.sound.position / this.sound.durationEstimate;
    }

    var secondsPassed = Math.round(this.sound.position/1000);
    var minutesPassed = 0;
    if (secondsPassed >= 60) {
      minutesPassed = Math.floor(secondsPassed/60);
      secondsPassed = secondsPassed - minutesPassed*60;
    }
    var playedLabel = (minutesPassed < 10 ? '0'+minutesPassed : minutesPassed) + ':' + (secondsPassed < 10 ? '0'+secondsPassed : secondsPassed);

    this.setState({
      playedPercentage,
      playedLabel
    });
  }

  playingStatusChanged () {
		if (this.sound.paused || this.sound.playState === 0) {
			this.setState({
        playing: false
      });
		} else {
			this.setState({
        playing: true
      });
		}
	}

  togglePlay (event) {
    event.preventDefault();

		this.sound.togglePause();
		this.playingStatusChanged();
  }

  toggleMute (event) {
    event.preventDefault();

    this.sound.toggleMute();

    if (!this.sound.muted && this.sound.volume === 0) {
      this.sound.setVolume(this.props.defaultVolume);
    }

    this.setState({
      volume: this.sound.muted ? 0 : this.sound.volume,
      muted: this.sound.muted || this.sound.volume === 0
    });
  }

  onProgressClick (event) {
    event.preventDefault();

    let bounds = utils.getOffsetRect(React.findDOMNode(this.refs.bars));
    let percStream = (event.pageX - bounds.left) / bounds.width;

    this.sound.setPosition(percStream * this.sound.duration);
  }

  onVolumeClick (event) {
    event.preventDefault();

    let bounds = utils.getOffsetRect(React.findDOMNode(this.refs.volume));
    let percVolume = Math.round(((event.pageX - bounds.left) / bounds.width) * 100);

    this.sound.setVolume(percVolume);

    if (this.sound.muted && this.sound.volume > 0) {
      this.sound.unmute();
    } else if (!this.sound.muted && this.sound.volume === 0) {
      this.sound.mute();
    }

    this.setState({
      volume: this.sound.muted ? 0 : this.sound.volume,
      muted: this.sound.muted || this.sound.volume === 0
    });
  }

  renderControls (classMap) {
    return (
      <div className={cx(classes.part, classes.fit, classMap.controls)}>
        <a href='#' onClick={this.togglePlay.bind(this)}>
          {this.state.playing ? this.props.children[1] : this.props.children[0]}
        </a>
      </div>
    );
  }

  renderProgressBar (classMap) {
    let streamStyle = {
      width: (this.state.loadedPercentage*100)+'%'
    };
    let activeStyle = {
      width: (this.state.playedPercentage*100)+'%'
    };
    return (
      <div ref='bars' className={cx(classes.bar, classMap.bars)}>
        <div className={cx(classes.streamBars, classMap.stream)} style={streamStyle} onClick={this.onProgressClick.bind(this)}></div>
        <div className={cx(classes.streamBars, classMap.active)} style={activeStyle} onClick={this.onProgressClick.bind(this)}></div>
      </div>
    );
  }

  renderPlayback (classMap) {
    // this.state.playedLabel loadedLabel
    return (
      <div className={cx(classes.part, classMap.playback)}>
        {this.props.children[2]}
        {this.props.children[3]}
        <div className={cx(classes.table)}>
          <span className={cx(classes.part, classes.fit)}>
            {React.cloneElement(this.props.children[4], {}, this.state.playedLabel)}
          </span>
          <div className={cx(classes.part)}>
            {this.renderProgressBar(classMap)}
          </div>
          <span className={cx(classes.part, classes.fit)}>
            {React.cloneElement(this.props.children[5], {}, this.state.loadedLabel)}
          </span>
        </div>
      </div>
    );
  }

  renderVolumeBar (classMap) {
    const volume = this.context.editing ? this.props.defaultVolume : this.state.volume;
    let activeStyle = {
      width: volume+'%'
    };
    return (
      <div ref='volume' className={cx(classes.bar, classMap.bars, classes.volumeBar)} onClick={this.onVolumeClick.bind(this)}>
        <div className={cx(classes.streamBars, classMap.active)} style={activeStyle}></div>
      </div>
    );
  }

  renderVolume (classMap) {
    return (
      <div className={cx(classes.part, classes.fit, classes.volume, classMap.volume)}>
        <div className={cx(classes.table)}>
          <div className={cx(classes.part, classes.fit)}>
            <a href='#' onClick={this.toggleMute.bind(this)}>
              {this.state.muted ? this.props.children[7] : this.props.children[6]}
            </a>
          </div>
          <div className={cx(classes.part, classes.volumeBars)}>
            {this.renderVolumeBar(classMap)}
          </div>
        </div>
      </div>
    );
  }

  renderDivider (classMap) {
    return (
      <div className={cx(classes.part, classes.divider, classMap.divider)}></div>
    );
  }

  renderBackground () {
    if (this.props.useBackgroundImage) {
      return (
        <BackgroundImage
          backgroundImage={this.props.backgroundImage}
          repeat={this.props.repeat}
          vertical={this.props.vertical}
          horizontal={this.props.horizontal}
          opacity={this.props.opacity}
        />
      );
    }
  }

  render () {
    let classMap = (this.props.style && styles.getClassesMap(this.props.style)) || {};
    let displayVolume = this.context.display !== 'mobile' && this.context.display !== 'tablet';

    return (
      <Element tag='div' element={this.props.element} settings={this.constructor.settings}>
        <div className={cx(classes.musicPlayer, classMap.player)}>
          {this.renderBackground()}
          <div className={classes.wrapper}>
            {this.renderControls(classMap)}
            {this.renderDivider(classMap)}
            {this.renderPlayback(classMap)}
            {displayVolume && this.renderDivider(classMap)}
            {displayVolume && this.renderVolume(classMap)}
          </div>
        </div>
      </Element>
    );
  }
}

MusicPlayer.propTypes = {
  type: React.PropTypes.oneOf(['local', 'soundcloud']).isRequired,
  soundcloud: React.PropTypes.string,
  sound: React.PropTypes.string
};

MusicPlayer.defaultProps = {
  type: 'local',
  defaultVolume: 50
};

MusicPlayer.contextTypes = {
  display: React.PropTypes.string.isRequired,
  editing: React.PropTypes.bool.isRequired
};

styles.registerStyle(style);
MusicPlayer.defaultChildren = defaultChildren;
MusicPlayer.propsSchema = propsSchema;
MusicPlayer.settings = settings;
