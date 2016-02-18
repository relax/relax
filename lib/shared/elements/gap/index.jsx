import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../component';
import Element from '../element';

export default class Gap extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    amount: '30px'
  };

  static propsSchema = propsSchema;
  static settings = settings;

  render () {
    const style = {
      height: this.props.amount
    };

    return (
      <Element {...this.props.relax} htmlTag='div' style={style} settings={settings} />
    );
  }
}
