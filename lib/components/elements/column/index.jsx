import React from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';

export default class Column extends Component {
  static propTypes = {
    padding: React.PropTypes.string.isRequired,
    vertical: React.PropTypes.string.isRequired,
    columnsDisplay: React.PropTypes.string.isRequired,
    left: React.PropTypes.number,
    right: React.PropTypes.number,
    bottom: React.PropTypes.number,
    layout: React.PropTypes.object
  }

  static defaultProps = {
    padding: '15px',
    vertical: 'top'
  }

  static settings = settings
  static propsSchema = propsSchema

  render () {
    const layout = this.props.layout || {
      width: 'auto'
    };

    const style = {
      display: layout.width === 'block' ? 'block' : 'table-cell',
      verticalAlign: this.props.vertical
    };

    if (this.props.left || this.props.right) {
      style.padding = '0px ' + this.props.right + 'px 0px ' + this.props.left + 'px';
    }
    if (this.props.bottom) {
      style.marginBottom = this.props.bottom;
    }

    var contentStyle = {
      padding: this.props.padding
    };

    if (layout.width !== 'block') {
      style.width = layout.widthPerc + '%';
    }

    return (
      <Element info={this.props} className='column' htmlTag='div' style={style} settings={settings}>
        <div style={contentStyle}>
          {this.renderContent()}
        </div>
      </Element>
    );
  }
}
