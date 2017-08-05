import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Section extends Component {
  static propTypes = {
    navigation: PropTypes.string,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired,
    renderChildren: PropTypes.func.isRequired
  };

  static defaultProps = {
    navigation: ''
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {Element, styleClassMap, relax, navigation, renderChildren} = this.props;

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
          {renderChildren()}
        </div>
      </Element>
    );
  }
}
