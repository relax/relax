import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';

export default class Column extends Component {
  static propTypes = {
    styleClassMap: PropTypes.object,
    padding: PropTypes.string.isRequired,
    vertical: PropTypes.string.isRequired,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    layout: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    padding: '15px',
    vertical: 'top'
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    const {styleClassMap} = this.props;
    const layout = this.props.layout || {
      width: 'auto'
    };

    const rootStyle = {
      display: layout.width === 'block' ? 'block' : 'table-cell',
      verticalAlign: this.props.vertical
    };

    if (this.props.left || this.props.right) {
      rootStyle.margin = `0px ${this.props.right}px 0px ${this.props.left}px`;
    }
    if (this.props.bottom) {
      rootStyle.marginBottom = this.props.bottom;
    }

    const contentStyle = {
      padding: this.props.padding
    };

    if (layout.width !== 'block') {
      rootStyle.width = `${layout.widthPerc}`;
    }

    return (
      <div className={styleClassMap.root} style={rootStyle}>
        <Element {...this.props.relax} htmlTag='div' style={contentStyle} settings={settings}>
          {this.renderContent()}
        </Element>
      </div>
    );
  }
}
