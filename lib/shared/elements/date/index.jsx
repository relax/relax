import Component from 'components/component';
import cx from 'classnames';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

import propsSchema from './props-schema';
import settings from './settings';

export default class DateElement extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object.isRequired,
    date: PropTypes.number.isRequired,
    format: PropTypes.string.isRequired,
    customFormat: PropTypes.string,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired
  };

  static defaultProps = {
    date: new Date(),
    format: 'LL',
    customFormat: 'MMMM Do YYYY, h:mm:ss a'
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = 'text';

  render () {
    const {Element, styleClassMap} = this.props;

    const props = {
      ...this.props.relax,
      htmlTag: 'div',
      settings,
      className: cx(styleClassMap.holder, styleClassMap.text)
    };

    const format = this.props.format;
    const date = moment(this.props.date);

    let dateStr = '';
    if (format === 'fromNow') {
      dateStr = date.fromNow();
    } else if (format === 'custom') {
      dateStr = date.format(this.props.customFormat);
    } else {
      dateStr = date.format(format);
    }

    return (
      <Element {...props}>
        {dateStr}
      </Element>
    );
  }
}
