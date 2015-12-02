import React, {PropTypes} from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';

export default class Column extends Component {
  static propTypes = {
    padding: PropTypes.string.isRequired,
    vertical: PropTypes.string.isRequired,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    layout: PropTypes.object
  }

  static defaultProps = {
    padding: '15px',
    vertical: 'top'
  }

  static propsSchema = propsSchema
  static settings = settings

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
      <div className='column' style={style}>
        <Element info={this.props} htmlTag='div' style={contentStyle} settings={settings}>
          {this.renderContent()}
        </Element>
      </div>
    );
  }
}
