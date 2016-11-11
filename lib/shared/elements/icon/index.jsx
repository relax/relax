import Component from 'components/component';
import cx from 'classnames';
import React, {PropTypes} from 'react';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Icon extends Component {
  static propTypes = {
    icon: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  static contextTypes = {
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
    const {relax, styleClassMap, icon} = this.props;
    const {Element} = this.context;
    const classMap = styleClassMap || {};
    const props = {
      htmlTag: 'div',
      ...relax,
      settings,
      className: classMap.root
    };

    return (
      <Element {...props}>
        <div className={cx(classes.holder, classMap.holder)}>
          <i className={cx(icon && icon.className, classMap.icon)}>
            {icon && icon.content}
          </i>
        </div>
      </Element>
    );
  }
}
