import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import classes from './classes';
import utils from '../../../utils';
import BackgroundImage from '../../background-image';

export default class Player extends Component {
  static propTypes = {
    togglePlay: PropTypes.func.isRequired,
    toggleMute: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    styleClassMap: PropTypes.object,
    display: PropTypes.string,
    useBackgroundImage: PropTypes.bool,
    backgroundImage: PropTypes.string,
    repeat: PropTypes.string,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
    opacity: PropTypes.number,
    defaultVolume: PropTypes.number,
    muted: PropTypes.bool.isRequired,
    playing: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    playedLabel: PropTypes.string.isRequired,
    loadedLabel: PropTypes.string.isRequired,
    loadedPercentage: PropTypes.number.isRequired,
    playedPercentage: PropTypes.number.isRequired,
    editing: PropTypes.bool
  }

  static defaultProps = {
    styleClassMap: {}
  }

  togglePlay (event) {
    event.preventDefault();
    this.props.togglePlay();
  }

  toggleMute (event) {
    event.preventDefault();
    this.props.toggleMute();
  }

  onProgressClick (event) {
    event.preventDefault();

    const bounds = utils.getOffsetRect(this.refs.bars);
    const percStream = (event.pageX - bounds.left) / bounds.width;

    this.props.goTo(percStream);
  }

  onVolumeClick (event) {
    event.preventDefault();

    const bounds = utils.getOffsetRect(this.refs.volume);
    const percVolume = Math.round(((event.pageX - bounds.left) / bounds.width) * 100);

    this.props.setVolume(percVolume);
  }

  render () {
    const classMap = this.props.styleClassMap;
    const displayVolume = this.props.display !== 'mobile' && this.props.display !== 'tablet';
    return (
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
              <i className='material-icons'>{this.props.muted ? 'volume_mute' : 'volume_up'}</i>
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
    const volume = this.props.editing ? this.props.defaultVolume : this.props.volume;
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
    return (
      <div className={cx(classes.part, classMap.playback)}>
        <div>Text 1</div>
        <div>Text 2</div>
        <div className={cx(classes.table)}>
          <span className={cx(classes.part, classes.fit)}>
            {this.props.playedLabel}
          </span>
          <div className={cx(classes.part)}>
            {this.renderProgressBar(classMap)}
          </div>
          <span className={cx(classes.part, classes.fit)}>
            {this.props.loadedLabel}
          </span>
        </div>
      </div>
    );
  }

  renderProgressBar (classMap) {
    const streamStyle = {
      width: (this.props.loadedPercentage * 100) + '%'
    };
    const activeStyle = {
      width: (this.props.playedPercentage * 100) + '%'
    };
    return (
      <div ref='bars' className={cx(classes.bar, classMap.bars)}>
        <div className={cx(classes.streamBars, classMap.stream)} style={streamStyle} onClick={::this.onProgressClick}></div>
        <div className={cx(classes.streamBars, classMap.active)} style={activeStyle} onClick={::this.onProgressClick}></div>
      </div>
    );
  }

  renderControls (classMap) {
    return (
      <div className={cx(classes.part, classes.fit, classMap.controls)}>
        <a href='#' onClick={::this.togglePlay}>
          <i className='material-icons'>{this.props.playing ? 'pause' : 'play_arrow'}</i>
        </a>
      </div>
    );
  }
}
