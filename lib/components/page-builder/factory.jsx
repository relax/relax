import React from 'react';
import Common from './common';
import cx from 'classnames';

export default (Component, props = {}) => {
  class Factory extends Common {
    render () {
      var className = 'page-builder';

      if (!this.context.editing) {
        className += ' preview';
      }

      return (
        <div className={cx('page-builder', !this.context.editing && 'preview', props.className)}>
          <Component {...this.props} />
          {this.renderElementsMenu()}
          {this.renderDragger({top: -60})}
        </div>
      );
    }
  }

  return Factory;
};
