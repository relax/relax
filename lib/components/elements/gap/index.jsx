import React from 'react';
import Component from '../../component';
import Element from '../../element';

import settings from './settings';
import propsSchema from './props-schema';

export default class Gap extends Component {
  render () {
    var style = {
      height: this.props.amount
    };

    return (
      <Element tag='div' style={style} settings={this.constructor.settings} element={this.props.element} />
    );
  }
}

Gap.propTypes = {
  amount: React.PropTypes.number.isRequired
};

Gap.defaultProps = {
  amount: 30
};

Gap.propsSchema = propsSchema;
Gap.settings = settings;
