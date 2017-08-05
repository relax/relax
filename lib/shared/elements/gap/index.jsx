import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import propsSchema from './props-schema';
import settings from './settings';

export default class Gap extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    relax: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired
  };

  static defaultProps = {
    amount: '30px'
  };

  static propsSchema = propsSchema;
  static settings = settings;

  render () {
    const {Element, amount, relax} = this.props;
    const style = {
      height: amount
    };

    return (
      <Element
        {...relax}
        htmlTag='div'
        style={style}
        settings={settings}
      />
    );
  }
}
