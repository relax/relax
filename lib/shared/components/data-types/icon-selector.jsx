import cx from 'classnames';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class IconSelector extends Component {
  static propTypes = {
    selected: PropTypes.object.isRequired,
    onSelectedChange: PropTypes.func.isRequired,
    icons: PropTypes.array.isRequired,
    selectedFamily: PropTypes.number.isRequired,
    changeSelectedFamily: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    changeSearch: PropTypes.func.isRequired
  }

  changeSelectedFamily (value, event) {
    event.preventDefault();
    this.props.changeSelectedFamily(value);
  }

  onEntryClick (icon) {
    this.props.onSelectedChange(icon);
  }

  onSearchChange (event) {
    this.props.changeSearch(event.target.value);
  }

  render () {
    const {selected, icons} = this.props;
    return (
      <div className='modal-content icon-selector'>
        <div className='modal-menu'>
          <div className='modal-header'>Icons</div>
          <div className='content-scrollable'>
            <GeminiScrollbar autoshow>
              {icons.map(this.renderIconFamily, this)}
            </GeminiScrollbar>
          </div>
          <div className='current-icon'>
            <div className='current-columns'>
              <div className='current-column'>
                <i className={selected && selected.className}>{selected && selected.content}</i>
              </div>
              <div className='current-column'>
                <div className='label'>Current selected</div>
                <span>{selected && selected.family}</span>
                <span>{selected && (selected.content || selected.className)}</span>
              </div>
            </div>
          </div>
          <div className='modal-done'>
            <div className='button button-primary' onClick={this.props.onClose}>DONE</div>
          </div>
        </div>
        <div className='modal-content-area'>
          <div className='search-bar'>
            <a href={icons[this.props.selectedFamily].link} target='_blank'>
              <span>{icons[this.props.selectedFamily].family}</span>
              <span> site</span>
            </a>
            <div className='search-part'>
              <div className='search-input'>
                <i className='material-icons'>search</i>
                <input type='text' value={this.props.search} onChange={::this.onSearchChange} />
              </div>
            </div>
          </div>
          <div className='content-area-scrollable'>
            <GeminiScrollbar autoshow>
              {this.renderFamilyIcons(icons[this.props.selectedFamily])}
            </GeminiScrollbar>
          </div>
        </div>
      </div>
    );
  }

  renderIconFamily (iconFamily, key) {
    return (
      <div className={cx('icon-family', key === this.props.selectedFamily && 'selected')} key={key} onClick={this.changeSelectedFamily.bind(this, key)}>
        <span>{iconFamily.family}</span>
      </div>
    );
  }

  renderFamilyIcons (family) {
    if (family && family.icons) {
      const binded = this.renderIcon.bind(this, family);
      return family.icons.map(binded);
    }
  }

  renderIcon (family, icon) {
    const invalid = this.props.search && icon.indexOf(this.props.search) === -1;
    if (!invalid) {
      const className = cx(family.baseClass, family.reference === 'className' && icon);
      const content = family.reference === 'content' && icon;
      const selected = this.props.selected && this.props.selected.family === family.family && className === this.props.selected.className && content === this.props.selected.content;
      return (
        <div className={cx('icon-entry', selected && 'selected')} key={className + content} onClick={this.onEntryClick.bind(this, icon)}>
          <i className={className}>{content}</i>
          <div>{icon}</div>
        </div>
      );
    }
  }
}
