import request from 'superagent';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {soundManager} from 'soundmanager2';

import Player from './player';

const CONSUMER_KEY = '6c786345f5161898f1e1380802ce9226';

export default class PlayerContainer extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['local', 'soundcloud']).isRequired,
    soundcloud: PropTypes.string,
    sound: PropTypes.string,
    pageBuilder: PropTypes.object,
    elementId: PropTypes.string.isRequired,
    defaultVolume: PropTypes.number
  };

  getInitState () {
    const editing = this.props.pageBuilder && this.props.pageBuilder.editing;
    if (!editing && this.isClient()) {
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

  componentDidUpdate () {
    // if (!this.props.pageBuilder.editing && !prevState.sound && this.state.sound) {
    //   this.url = this.state.sound.url;
    //   soundManager.onready(this.createSound.bind(this));
    // }
  }

  componentWillUnmount () {
    if (this.sound) {
      this.sound.destruct();
    }
  }

  loadSoundcloud () {
    request
      .get(`http://api.soundcloud.com/resolve?url=${this.props.soundcloud}&format=json&consumer_key=${CONSUMER_KEY}&callback=?`)
      .set('Accept', 'application/json')
      .end(::this.soundcloudLoaded);
  }

  soundcloudLoaded (err, soundcloudInfo) {
    if (!err && soundcloudInfo && soundcloudInfo.stream_url) {
      this.url = soundcloudInfo.stream_url;

      if (this.url.indexOf('secret_token') === -1) {
        this.url += '?';
      } else {
        this.url += '&';
      }

      this.url += `consumer_key=${CONSUMER_KEY}`;
      soundManager.onready(::this.createSound);
    }
  }

  createSound () {
    this.sound = soundManager.createSound({
      id: `sound_${this.props.elementId}`,
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
    const loadedPercentage = this.sound.bytesLoaded / this.sound.bytesTotal;

    let secondsPassed = Math.round(this.sound.duration / 1000);
    let minutesPassed = 0;
    if (secondsPassed >= 60) {
      minutesPassed = Math.floor(secondsPassed / 60);
      secondsPassed = secondsPassed - minutesPassed * 60;
    }
    const minutesLabel = (minutesPassed < 10 ? `0${minutesPassed}` : minutesPassed);
    const secondsLabel = (secondsPassed < 10 ? `0${secondsPassed}` : secondsPassed);
    const loadedLabel = `${minutesLabel}:${secondsLabel}`;

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
    const minutesLabel = (minutesPassed < 10 ? `0${minutesPassed}` : minutesPassed);
    const secondsLabel = (secondsPassed < 10 ? `0${secondsPassed}` : secondsPassed);
    const playedLabel = `${minutesLabel}:${secondsLabel}`;

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

  togglePlay () {
    this.sound.togglePause();
    this.playingStatusChanged();
  }

  toggleMute () {
    this.sound.toggleMute();

    if (!this.sound.muted && this.sound.volume === 0) {
      this.sound.setVolume(this.props.defaultVolume);
    }

    this.setState({
      volume: this.sound.muted ? 0 : this.sound.volume,
      muted: this.sound.muted || this.sound.volume === 0
    });
  }

  setVolume (perc) {
    this.sound.setVolume(perc);

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

  goTo (perc) {
    this.sound.setPosition(perc * this.sound.duration);
  }

  render () {
    return (
      <Player
        {...this.state}
        {...this.props}
        togglePlay={::this.togglePlay}
        toggleMute={::this.toggleMute}
        setVolume={::this.setVolume}
        goTo={::this.goTo}
        editing={this.props.pageBuilder && this.props.pageBuilder.editing}
      />
    );
  }
}
