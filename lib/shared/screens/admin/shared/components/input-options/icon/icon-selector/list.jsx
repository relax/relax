import cx from 'classnames';
import Component from 'components/component';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './list.less';
import Icon from './icon';

export default class FontsList extends Component {
  static propTypes = {
    family: PropTypes.object.isRequired,
    search: PropTypes.string,
    selected: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render () {
    const {family} = this.props;
    return (
      <div className={styles.root}>
        {family.icons.map(this.renderIcon, this)}
      </div>
    );
  }

  renderIcon (icon) {
    const {search, selected, family, onChange, onClose} = this.props;
    const valid = !search || icon.indexOf(search) !== -1;

    if (valid) {
      const className = cx(family.baseClass, family.reference === 'className' && icon);
      const content = family.reference === 'content' && icon;
      const isSelected =
        selected &&
        selected.family === family.family &&
        className === selected.className &&
        content === selected.content;

      return (
        <Icon
          className={className}
          selected={isSelected}
          icon={icon}
          onClick={onChange}
          onDoubleClick={onClose}
        >
          {family.reference === 'content' && icon}
        </Icon>
      );
    }
  }
}
