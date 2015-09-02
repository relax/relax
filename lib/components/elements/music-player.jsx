import React from 'react';
import Component from '../component';
import Element from '../element';

import {Types} from '../../data-types';
import $ from 'jquery';
import {soundManager} from 'soundmanager2';

import classNames from 'classnames';
import jss from '../../react-jss';

const consumer_key = '6c786345f5161898f1e1380802ce9226';

export default class MusicPlayer extends Component {

  getInitialState () {
    if (!this.context.editing && this.isClient()) {
      if (this.props.type === 'soundcloud') {
        this.loadSoundcloud();
      } else {

      }
    }

    return {
      playing: false,
      loadedPercentage: 0,
      loadedLabel: '00:00',
      playedPercentage: 0,
      playedLabel: '00:00'
    };
  }

  componentWillUnmount () {
    if (this.sound) {
      this.sound.destruct();
    }
  }

  loadSoundcloud () {
    $.getJSON("http://api.soundcloud.com/resolve?url=" + this.props.soundcloud + "&format=json&consumer_key=" + consumer_key + "&callback=?", this.soundcloudLoaded.bind(this));
  }

  soundcloudLoaded (soundcloudInfo) {
    this.url = soundcloudInfo.stream_url;

    if (this.url.indexOf('secret_token') === -1) {
      this.url += '?';
    } else {
      this.url += "&";
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
      volume: this.props.defaultVolume
    });

    this.playingStatusChanged();
    //this.volumeChanged();
  }

  whileLoading () {
    var loadedPercentage = this.sound.bytesLoaded / this.sound.bytesTotal;

    var secondsPassed = Math.round(this.sound.duration/1000);
    var minutesPassed = 0;
    if(secondsPassed >= 60){
      minutesPassed = Math.floor(secondsPassed/60);
      secondsPassed = secondsPassed - minutesPassed*60;
    }
    var loadedLabel = (minutesPassed < 10 ? "0"+minutesPassed : minutesPassed) + ":" + (secondsPassed < 10 ? "0"+secondsPassed : secondsPassed);

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
    var playedLabel = (minutesPassed < 10 ? "0"+minutesPassed : minutesPassed) + ":" + (secondsPassed < 10 ? "0"+secondsPassed : secondsPassed);

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

  renderControls () {
    var icon = this.state.playing ? 'fa fa-pause' : 'fa fa-play';
    return (
      <div className={classNames(classes.part, classes.fit)}>
        <a href='#' onClick={this.togglePlay.bind(this)}>
          <i className={icon}></i>
        </a>
      </div>
    );
  }

  renderProgressBar () {
    return (
      <div className={classes.bar}>
        <div className={classes.streamBars}></div>
        <div className={classes.streamBars}></div>
      </div>
    );
  }

  renderPlayback () {
    return (
      <div className={classes.part}>
        <div>{this.props.artist}</div>
        <div>{this.props.title}</div>
        <div>
          <span className={classes.part}>{this.state.playedLabel}</span>
          <div className={classes.part}>
            {this.renderProgressBar()}
          </div>
          <span className={classes.part}>{this.state.loadedLabel}</span>
        </div>
      </div>
    );
  }

  renderVolume () {
    return (
      <div className={classNames(classes.part, classes.fit)}>

      </div>
    );
  }

  render () {
    return (
      <Element tag='div' className={classes.musicPlayer} element={this.props.element} settings={this.constructor.settings}>
        {this.renderControls()}
        {this.renderPlayback()}
        {this.renderVolume()}
      </Element>
    );
  }
}

var classes = jss.createRules({
  musicPlayer: {
    position: 'relative',
    backgroundColor: '#333333'
  },
  part: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  fit: {
    width: '1%',
    whiteSpace: 'nowrap'
  },
  bar: {
    position: 'relative',
    height: 7,
    backgroundColor: '#cccccc'
  },
  streamBars: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0
  }
});

MusicPlayer.propTypes = {
  artist: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['local', 'soundcloud']).isRequired
};

MusicPlayer.defaultProps = {
  artist: 'Artist/Band name',
  title: 'Song title',
  type: 'local',
  defaultVolume: 50
};

MusicPlayer.propsSchema = [
  {
    label: 'Music',
    type: Types.Select,
    id: 'type',
    props: {
      labels: ['Your Sounds', 'Soundcloud'],
      values: ['local', 'soundcloud']
    },
    unlocks: {
      local: [

      ],
      soundcloud: [
        {
          label: 'Soundcloud music url',
          type: Types.String,
          id: 'soundcloud'
        }
      ]
    }
  }/*,
  {
    label: 'Style',
    type: Types.Style,
    id: 'style',
    props: {
      type: 'musicPlayer',
      options: [
        {
          label: 'Toggle Play Button',
          id: 'togglePlayButton',
          type: Types.Group,
          props: {
            options: [

            ]
          }
        }
        {
          label: 'Font Family',
          id: 'font',
          type: Types.Font
        },
        {
          label: 'Font Size',
          id: 'fontSize',
          type: Types.Pixels
        },
        {
          label: 'Line Height',
          id: 'lineHeight',
          type: Types.Pixels
        },
        {
          label: 'Color',
          id: 'color',
          type: Types.Color
        }
      ],
      defaults: {
        font: {},
        fontSize: 16,
        lineHeight: 16,
        color: '#ffffff'
      }
    }
  }*/
];

MusicPlayer.settings = {
  icon: {
    class: 'fa fa-music',
    content: ''
  },
  category: 'media',
  drop: false,
  drag: {}
};
