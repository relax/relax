import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class LinkType extends Component {
  static propTypes = {
    value: PropTypes.object
  };

  render () {
    const {value} = this.props;
    let result;

    if (!value || !value.type) {
      result = this.renderEmpty();
    } else {
      switch (value.type) {
        case 'external':
          result = this.renderExternal();
          break;
        case 'internal':
          result = this.renderInternal();
          break;
        case 'anchor':
          result = this.renderAnchor();
          break;
        default:
          result = this.renderEmpty();
      }
    }

    return result;
  }

  renderEmpty () {
    return (
      <div>-</div>
    );
  }

  renderExternal () {
    const {value} = this.props;
    const options = value.options || {};

    return (
      <a href={options.url} className={styles.link}>
        {options.url}
      </a>
    );
  }

  renderInternal () {
    // TODO
    return (
      <span className={styles.link}>Internal</span>
    );
  }

  renderAnchor () {
    // TODO
    return (
      <span className={styles.link}>Internal</span>
    );
  }
}
