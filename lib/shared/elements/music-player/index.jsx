import Component from 'components/component';
import React, {PropTypes} from 'react';

import PlayerContainer from './container';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class MusicPlayer extends Component {
  static propTypes = {
    relax: PropTypes.object.isRequired
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired
  };

  static defaultProps = {
    type: 'local',
    defaultVolume: 50
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {Element} = this.context;

    return (
      <Element {...this.props.relax} htmlTag='div' settings={settings}>
        <PlayerContainer {...this.props} />
      </Element>
    );
  }
}
