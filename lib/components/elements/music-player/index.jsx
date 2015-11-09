import $ from 'jquery';
import cx from 'classnames';
import React, {PropTypes} from 'react';
import {soundManager} from 'soundmanager2';

import classes from './classes';
import defaultChildren from './default-children';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import utils from '../../../utils';
import BackgroundImage from '../../background-image';
import Component from '../../component';
import Element from '../../element';

const CONSUMER_KEY = '6c786345f5161898f1e1380802ce9226';

export default class MusicPlayer extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['local', 'soundcloud']).isRequired,
    soundcloud: PropTypes.string,
    sound: PropTypes.string,
    pageBuilder: PropTypes.object,
    element: PropTypes.object.isRequired,
    children: PropTypes.node,
    useBackgroundImage: PropTypes.bool,
    display: PropTypes.string,
    styleClassMap: PropTypes.object,
    defaultVolume: PropTypes.number,
    repeat: PropTypes.string,
    backgroundImage: PropTypes.string,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
    opacity: PropTypes.number
  }

  static defaultProps = {
    type: 'local',
    defaultVolume: 50
  }

  static style = style
  static defaultChildren = defaultChildren
  static propsSchema = propsSchema
  static settings = settings

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
    if (this.sound) {
      this.sound.destruct();
    }
  }

  // getInitialModels () {
  //   let models = {};
  //
  //   if (!this.context.editing && this.props.type === 'local' && this.props.sound && this.props.sound !== '') {
  //     models.sound = mediaStore.getModel(this.props.sound);
  //   }
  //
  //   return models;
  // }

  componentDidUpdate (prevProps, prevState) {
    if (!this.props.pageBuilder.editing && !prevState.sound && this.state.sound) {
      this.url = this.state.sound.url;
      soundManager.onready(this.createSound.bind(this));
    }
  }

  loadSoundcloud () {
    $.getJSON('http://api.soundcloud.com/resolve?url=' + this.props.soundcloud + '&format=json&consumer_key=' + CONSUMER_KEY + '&callback=?', ::this.soundcloudLoaded);
  }

  soundcloudLoaded (soundcloudInfo) {
    this.url = soundcloudInfo.stream_url;

    if (this.url.indexOf('secret_token') === -1) {
      this.url += '?';
    } else {
      this.url += '&';
    }

    this.url += 'consumer_key=' + CONSUMER_KEY;
    soundManager.onready(this.createSound.bind(this));
  }

  createSound () {
    this.sound = soundManager.createSound({
      id: 'sound_' + this.props.element.id,
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

    var secondsPassed = Math.round(this.sound.duration / 1000);
    var minutesPassed = 0;
    if (secondsPassed >= 60) {
      minutesPassed = Math.floor(secondsPassed / 60);
      secondsPassed = secondsPassed - minutesPassed * 60;
    }
    var loadedLabel = (minutesPassed < 10 ? '0' + minutesPassed : minutesPassed) + ':' + (secondsPassed < 10 ? '0' + secondsPassed : secondsPassed);

    this.setState({
      loadedPercentage,
      loadedLabel
    });
  }

  whilePlaying () {
    let playedPercentage;
    if (this.sound.loaded) {
      playedPercentage = this.sound.position / this.sound.duration;
    } else {
      playedPercentage = this.sound.position / this.sound.durationEstimate;
    }

    let secondsPassed = Math.round(this.sound.position / 1000);
    let minutesPassed = 0;
    if (secondsPassed >= 60) {
      minutesPassed = Math.floor(secondsPassed / 60);
      secondsPassed = secondsPassed - minutesPassed * 60;
    }
    const playedLabel = (minutesPassed < 10 ? '0' + minutesPassed : minutesPassed) + ':' + (secondsPassed < 10 ? '0' + secondsPassed : secondsPassed);

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

    const bounds = utils.getOffsetRect(this.refs.bars);
    const percStream = (event.pageX - bounds.left) / bounds.width;

    this.sound.setPosition(percStream * this.sound.duration);
  }

  onVolumeClick (event) {
    event.preventDefault();

    const bounds = utils.getOffsetRect(this.refs.volume);
    const percVolume = Math.round(((event.pageX - bounds.left) / bounds.width) * 100);

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

  render () {
    const classMap = this.props.styleClassMap;
    const displayVolume = this.props.display !== 'mobile' && this.props.display !== 'tablet';

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

  renderDivider (classMap) {
    return (
      <div className={cx(classes.part, classes.divider, classMap.divider)}></div>
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

  renderVolumeBar (classMap) {
    const volume = this.context.editing ? this.props.defaultVolume : this.state.volume;
    const activeStyle = {
      width: volume + '%'
    };
    return (
      <div ref='volume' className={cx(classes.bar, classMap.bars, classes.volumeBar)} onClick={this.onVolumeClick.bind(this)}>
        <div className={cx(classes.streamBars, classMap.active)} style={activeStyle}></div>
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

  renderProgressBar (classMap) {
    const streamStyle = {
      width: (this.state.loadedPercentage * 100) + '%'
    };
    const activeStyle = {
      width: (this.state.playedPercentage * 100) + '%'
    };
    return (
      <div ref='bars' className={cx(classes.bar, classMap.bars)}>
        <div className={cx(classes.streamBars, classMap.stream)} style={streamStyle} onClick={this.onProgressClick.bind(this)}></div>
        <div className={cx(classes.streamBars, classMap.active)} style={activeStyle} onClick={this.onProgressClick.bind(this)}></div>
      </div>
    );
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
}
