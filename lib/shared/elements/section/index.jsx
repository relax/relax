import cx from 'classnames';
import BackgroundImage from 'components/background-image';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';

export default class Section extends Component {
  static propTypes = {
    useBackgroundImage: PropTypes.bool,
    backgroundImage: PropTypes.string,
    repeat: PropTypes.string,
    vertical: PropTypes.number,
    horizontal: PropTypes.number,
    navigation: PropTypes.string,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    backgroundImage: '',
    repeat: 'no-repeat',
    vertical: '50%',
    horizontal: '50%',
    navigation: ''
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const classMap = this.props.styleClassMap || {};

    const props = {
      ...this.props.relax,
      htmlTag: 'div',
      style: {
        position: 'relative'
      },
      className: cx(classMap && classMap.section),
      settings
    };

    if (this.props.navigation && this.props.navigation !== '') {
      props.id = this.props.navigation;
    }

    return (
      <Element {...props}>
        {this.renderBackground()}
        <div style={{position: 'relative'}} className={cx(classMap.content)}>
          {this.renderContent()}
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
          vertical={parseInt(this.props.vertical, 10)}
          horizontal={parseInt(this.props.horizontal, 10)}
        />
      );
    }
  }
}
