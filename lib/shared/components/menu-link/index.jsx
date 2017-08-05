import React from 'react';
import PropTypes from 'prop-types';

import A from 'components/a';
import Component from 'components/component';

export default class MenuLink extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    url: PropTypes.string
  };

  static defaultProps = {
    url: '#'
  };

  render () {
    const {editing, type} = this.props;
    let result;

    if (editing) {
      result = this.renderPlaceholder();
    } else if (type === 'url') {
      result = this.renderExternal();
    } else {
      result = this.renderInternal();
    }

    return result;
  }

  renderPlaceholder () {
    const {label, className} = this.props;

    return (
      <a className={className}>
        {label}
      </a>
    );
  }

  renderExternal () {
    const {label, className, url} = this.props;

    return (
      <a className={className} href={url}>
        {label}
      </a>
    );
  }

  renderInternal () {
    const {label, className, url} = this.props;

    return (
      <A className={className} href={url}>
        {label}
      </A>
    );
  }
}
