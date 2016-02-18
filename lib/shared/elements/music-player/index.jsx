import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';
import PlayerContainer from './container';

export default class MusicPlayer extends Component {
  static propTypes = {
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    type: 'local',
    defaultVolume: 50
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    return (
      <Element {...this.props.relax} htmlTag='div' settings={settings}>
        <PlayerContainer {...this.props} />
      </Element>
    );
  }
}
