import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';

export default class Textarea extends Component {
  static propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired
  };

  static defaultProps = {
    rows: 6
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = 'input';

  render () {
    const {Element, styleClassMap, relax, name, placeholder, rows} = this.props;

    return (
      <Element
        htmlTag='div'
        {...relax}
        settings={settings}
        className={cx(classes.holder, styleClassMap.holder)}
      >
        <textarea
          name={name}
          placeholder={placeholder}
          className={cx(classes.input, styleClassMap.input)}
          rows={rows}
        ></textarea>
      </Element>
    );
  }
}
