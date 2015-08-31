import React from 'react';
import Component from '../../component';
import Element from '../../element';
import styles from '../../../styles';
import cx from 'classnames';

import settings from './settings';
import style from './style';
import classes from './classes';
import propsSchema from './props-schema';

export default class LineDivider extends Component {
  render () {
    let classMap = (this.props.style && styles.getClassesMap(this.props.style)) || {};
    let style = {
      padding: this.props.padding
    };

    return (
      <Element tag='div' className={cx(classes.holder, classMap.holder)} style={style} settings={this.constructor.settings} element={this.props.element}>
        <div className={cx(classes.line, classMap.line)}></div>
      </Element>
    );
  }
}

LineDivider.propTypes = {
  padding: React.PropTypes.string.isRequired
};
LineDivider.defaultProps = {
  padding: '0px'
};

styles.registerStyle(style);
LineDivider.propsSchema = propsSchema;
LineDivider.settings = settings;
