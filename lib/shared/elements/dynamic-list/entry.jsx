import Component from 'components/component';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './entry.less';

export default class DynamicListEntry extends Component {
  static propTypes = {
    dummy: PropTypes.bool,
    columns: PropTypes.number.isRequired,
    isLinkingData: PropTypes.bool,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    editing: PropTypes.bool,
    horizontalGutter: PropTypes.string,
    elementsLinks: PropTypes.object,
    schemaEntry: PropTypes.object,
    renderChildren: PropTypes.func.isRequired,
    relax: PropTypes.object.isRequired
  };

  getStyle () {
    const {dummy, columns, isLinkingData, isFirst, isLast, horizontalGutter} = this.props;
    const style = {};
    const spaceThird = Math.round(parseInt(horizontalGutter, 10) / 3 * 100) / 100;
    const spaceSides = spaceThird * 2;

    if (columns > 1) {
      style.width = `${100 / columns}%`;

      const property = !dummy && isLinkingData && 'border' || 'padding';

      if (isFirst) {
        style[`${property}Right`] = cx(`${spaceSides}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      } else if (isLast) {
        style[`${property}Left`] = cx(`${spaceSides}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      } else {
        style[`${property}Right`] = cx(`${spaceThird}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
        style[`${property}Left`] = cx(`${spaceThird}px`, property === 'border' && 'solid rgba(0, 0, 0, 0.8)');
      }

      if (dummy && isLinkingData) {
        style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      }
    }
    return style;
  }

  render () {
    const {dummy} = this.props;
    let result;

    if (dummy) {
      result = this.renderWrapper();
    } else {
      result = this.renderWrapper(this.renderContent());
    }

    return result;
  }

  renderWrapper (children) {
    const {columns} = this.props;

    return (
      <div className={cx(columns > 1 && styles.column)} style={this.getStyle()}>
        {children}
      </div>
    );
  }

  renderContent () {
    const {
      elementsLinks,
      schemaEntry,
      renderChildren
    } = this.props;

    return renderChildren({
      links: elementsLinks,
      linksData: schemaEntry
    });
  }
}
