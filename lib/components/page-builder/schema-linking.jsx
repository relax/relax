import React from 'react';
import {Component} from 'relax-framework';

import DepthSelectMenu from './depth-select-menu';

class SchemaLinking extends Component {
  getInitialState () {
    this.drawDraggingLineBind = this.drawDraggingLine.bind(this);
    this.undrawDraggingLineBind = this.undrawDraggingLine.bind(this);
    this.linkingPossibilitiesBind = this.linkingPossibilities.bind(this);
    return {};
  }

  getChildContext () {
    return {
      drawDraggingLine: this.drawDraggingLineBind,
      undrawDraggingLine: this.undrawDraggingLineBind,
      linkingPossibilities: this.linkingPossibilitiesBind
    };
  }

  drawDraggingLine (info) {
    this.setState({
      draggingLine: true,
      draggingLineInfo: info
    });
  }

  undrawDraggingLine () {
    this.setState({
      draggingLine: false,
      draggingLineInfo: null,
      possibilities: false
    });
  }

  linkingPossibilities (options) {
    this.setState({
      possibilities: true,
      possibilitiesOptions: options
    });
  }

  renderPossibilities () {
    if (this.state.possibilities) {
      return (
        <DepthSelectMenu {...this.state.possibilitiesOptions} position={this.state.draggingLineInfo.to} />
      );
    }
  }

  renderDraggingLine () {
    if (this.state.draggingLine) {
      const style = {
        zIndex: 10,
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        pointerEvents: 'none'
      };

      return (
        <svg style={style}>
          <line
            x1={this.state.draggingLineInfo.from.left}
            y1={this.state.draggingLineInfo.from.top}
            x2={this.state.draggingLineInfo.to.left}
            y2={this.state.draggingLineInfo.to.top}
            strokeWidth='5'
            stroke={this.state.draggingLineInfo.color}
          />
          <circle
            cx={this.state.draggingLineInfo.from.left}
            cy={this.state.draggingLineInfo.from.top}
            r='5'
            fill={this.state.draggingLineInfo.color}
          />
          <circle
            cx={this.state.draggingLineInfo.to.left}
            cy={this.state.draggingLineInfo.to.top}
            r='5'
            fill={this.state.draggingLineInfo.color}
          />
        </svg>
      );
    }
  }
}

SchemaLinking.childContextTypes = {
  drawDraggingLine: React.PropTypes.func.isRequired,
  undrawDraggingLine: React.PropTypes.func.isRequired,
  linkingPossibilities: React.PropTypes.func.isRequired
};

export default SchemaLinking;
