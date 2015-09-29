import React from 'react';
import Component from '../../component';
import Element from '../../element';
import BackgroundImage from '../../background-image';
import styles from '../../../styles';

import settings from './settings';
import style from './style';
import propsSchema from './props-schema';

export default class Section extends Component {
  renderBackground () {
    if (this.props.useBackgroundImage) {
      return (
        <BackgroundImage
          backgroundImage={this.props.backgroundImage}
          repeat={this.props.repeat}
          vertical={this.props.vertical}
          horizontal={this.props.horizontal}
        />
      );
    }
  }

  render () {
    let classMap = this.props.style && styles.getClassesMap(this.props.style);
    let className = classMap && classMap.section || '';
    let classNameContent = classMap && classMap.content || '';

    let props = {
      tag: 'div',
      style: {
        position: 'relative'
      },
      className,
      settings: this.constructor.settings,
      element: this.props.element
    };

    if (this.props.navigation && this.props.navigation !== '') {
      props.id = this.props.navigation;
    }

    return (
      <Element {...props}>
        {this.renderBackground()}
        <div style={{position: 'relative'}} className={classNameContent}>
          {this.renderContent()}
        </div>
      </Element>
    );
  }
}

Section.propTypes = {
  backgroundImage: React.PropTypes.string.isRequired,
  repeat: React.PropTypes.string.isRequired,
  vertical: React.PropTypes.number,
  horizontal: React.PropTypes.number,
  navigation: React.PropTypes.string
};

Section.defaultProps = {
  backgroundImage: '',
  repeat: 'no-repeat',
  vertical: 50,
  horizontal: 50,
  navigation: ''
};

styles.registerStyle(style);
Section.propsSchema = propsSchema;
Section.settings = settings;
