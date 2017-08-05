import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Icon extends Component {
  static propTypes = {
    icon: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired
  };

  static defaultProps = {
    icon: {
      family: 'fontawesome',
      className: 'fa fa-beer'
    }
  };
  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {Element, relax, styleClassMap, icon} = this.props;
    const props = {
      htmlTag: 'div',
      ...relax,
      settings,
      className: styleClassMap.root
    };

    return (
      <Element {...props}>
        <div className={cx(classes.holder, styleClassMap.holder)}>
          <i className={cx(icon && icon.className, styleClassMap.icon)}>
            {icon && icon.content}
          </i>
        </div>
      </Element>
    );
  }
}
