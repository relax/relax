import Component from 'components/component';
import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';

export default class Gap extends Component {
  static propTypes = {
    amount: PropTypes.number.isRequired,
    relax: PropTypes.object.isRequired
  };

  static contextTypes = {
    Element: PropTypes.func.isRequired
  };

  static defaultProps = {
    amount: '30px'
  };

  static propsSchema = propsSchema;
  static settings = settings;

  render () {
    const {Element} = this.context;
    const style = {
      height: this.props.amount
    };

    return (
      <Element {...this.props.relax} htmlTag='div' style={style} settings={settings} />
    );
  }
}
