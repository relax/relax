import Component from 'components/component';
import cx from 'classnames';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Section extends Component {
  static propTypes = {
    navigation: PropTypes.string,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    children: PropTypes.any
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired
  };

  static defaultProps = {
    navigation: ''
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap, relax, navigation} = this.props;
    const {Element} = this.context;

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
          {Element.renderContent({
            relax,
            children: this.props.children,
            settings
          })}
        </div>
      </Element>
    );
  }
}
