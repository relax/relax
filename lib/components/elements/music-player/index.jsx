import React from 'react';

import defaultChildren from './default-children';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../../component';
import Element from '../../element';
import PlayerContainer from './container';

export default class MusicPlayer extends Component {
  static style = style
  static defaultChildren = defaultChildren
  static propsSchema = propsSchema
  static settings = settings

  render () {
    return (
      <Element info={this.props} htmlTag='div' settings={settings}>
        <PlayerContainer {...this.props} />
      </Element>
    );
  }
}
