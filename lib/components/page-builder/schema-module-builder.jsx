import React from 'react';
import {Component} from 'relax-framework';

import Canvas from './canvas';
import Chrome from './chrome';
import factory from './factory';
import DepthSelectMenu from './depth-select-menu';

class SchemaModuleBuilder extends Component {
  getInitialState () {
    this.drawDraggingLineBind = this.drawDraggingLine.bind(this);
    this.undrawDraggingLineBind = this.undrawDraggingLine.bind(this);
    this.linkingPossibilitiesBind = this.linkingPossibilities.bind(this);
    return {};
  }

  onSave () {
    this.props.onSave(this.context.page);
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
      let style = {
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

  render () {
    return (
      <div className='schema-module-builder-wrapper'>
        <div className='header'>
          <div className='title'>Create the model to be replicated for each entry</div>
          <div className='button button-primary' onClick={this.onSave.bind(this)}>Save model</div>
          <div className='button button-faded-grey' onClick={this.props.onClose}>Close without saving</div>
        </div>
        <div className='editing-part'>
          <Canvas />
        </div>
        <div className='options-part'>
          <Chrome />
        </div>
        {this.renderDraggingLine()}
        {this.renderPossibilities()}
      </div>
    );
  }
}

SchemaModuleBuilder.childContextTypes = {
  drawDraggingLine: React.PropTypes.func.isRequired,
  undrawDraggingLine: React.PropTypes.func.isRequired,
  linkingPossibilities: React.PropTypes.func.isRequired
};

SchemaModuleBuilder.contextTypes = {
  page: React.PropTypes.object.isRequired
};

export default factory(SchemaModuleBuilder, {
  className: 'schema-module-builder'
});
