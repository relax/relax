import cx from 'classnames';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';

export default class Section extends Component {
  static propTypes = {
    navigation: PropTypes.string,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    navigation: ''
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap, relax, navigation} = this.props;

    const props = {
      ...relax,
      htmlTag: 'div',
      className: cx(styleClassMap && styleClassMap.section),
      settings
    };

    if (navigation) {
      props.id = navigation;
    }

    return (
      <Element {...props}>
        <div style={{position: 'relative'}} className={cx(styleClassMap.content)}>
          {this.renderContent()}
        </div>
      </Element>
    );
  }
}
