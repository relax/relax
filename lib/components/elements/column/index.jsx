import React from 'react';
import Component from '../../component';
import Element from '../../element';

import settings from './settings';
import propsSchema from './props-schema';

export default class Column extends Component {
  render () {
    const layout = this.props.layout || {
      width: 'auto'
    };

    var style = {
      display: layout.width === 'block' ? 'block' : 'table-cell',
      verticalAlign: this.props.vertical
    };

    if (this.props.left || this.props.right) {
      style.padding = '0px '+this.props.right+'px 0px '+this.props.left+'px';
    }
    if (this.props.bottom) {
      style.marginBottom = this.props.bottom;
    }

    var contentStyle = {
      padding: this.props.padding
    };

    if (layout.width !== 'block') {
      style.width = layout.widthPerc+'%';
    }

    return (
      <Element className='column' tag='div' style={style} settings={this.constructor.settings} element={this.props.element}>
        <div style={contentStyle}>
          {this.renderContent()}
        </div>
      </Element>
    );
  }
}


Column.propTypes = {
  padding: React.PropTypes.string.isRequired,
  vertical: React.PropTypes.string.isRequired,
  columnsDisplay: React.PropTypes.string.isRequired
};

Column.defaultProps = {
  padding: '15px',
  vertical: 'top'
};

Column.settings = settings;
Column.propsSchema = propsSchema;
