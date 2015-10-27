import cx from 'classnames';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import BackgroundImage from '../../background-image';
import Component from '../../component';
import Element from '../../element';

// import style from './style';
// import styles from '../../../styles';

export default class Section extends Component {
  static propTypes = {
    element: PropTypes.object.isRequired,
    useBackgroundImage: PropTypes.bool,
    backgroundImage: PropTypes.string,
    repeat: PropTypes.string,
    vertical: PropTypes.number,
    horizontal: PropTypes.number,
    navigation: PropTypes.string
  }

  static defaultProps = {
    backgroundImage: '',
    repeat: 'no-repeat',
    vertical: 50,
    horizontal: 50,
    navigation: ''
  }

  static propsSchema = propsSchema

  static settings = settings

  render () {
    const classMap = {}; // this.props.style && styles.getClassesMap(this.props.style);
    const classNameContent = classMap && classMap.content || '';

    const props = {
      ...this.props,
      htmlTag: 'div',
      style: {
        position: 'relative'
      },
      className: cx(classMap && classMap.section),
      settings: this.constructor.settings
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
}
