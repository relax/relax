import Component from 'components/component';
import css from 'helpers/styles/css';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Column extends Component {
  static propTypes = {
    relax: PropTypes.object.isRequired,
    styleClassMap: PropTypes.object.isRequired,
    type: PropTypes.string,
    left: PropTypes.number,
    right: PropTypes.number,
    children: PropTypes.any
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  getStyles () {
    const {type} = this.props;
    const styles = {
      root: {}
    };

    if (type !== 'block') {
      const {left, right} = this.props;

      css(styles.root)
        .setProperty('display', 'table-cell')
        .setProperty('paddingLeft', left)
        .setProperty('paddingRight', right);
    }

    return styles;
  }

  render () {
    const {styleClassMap, relax} = this.props;
    const {Element} = this.context;
    const styles = this.getStyles();

    return (
      <div className={styleClassMap.root} style={styles.root}>
        <Element
          {...relax}
          htmlTag='div'
          className={styleClassMap.content}
          settings={settings}
        >
          {this.props.children}
        </Element>
      </div>
    );
  }
}
