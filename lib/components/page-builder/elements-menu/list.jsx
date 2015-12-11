import cx from 'classnames';
import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

export default class List extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    elementAcceptable: PropTypes.func.isRequired,
    addElement: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired
  }

  toggleCategory (category, event) {
    event.preventDefault();
    this.props.toggleCategory(category);
  }

  addElement (tag) {
    event.preventDefault();
    this.props.addElement(tag);
  }

  render () {
    const {categories} = this.props.pageBuilder;
    return (
      <div className='categories-list'>
        <GeminiScrollbar autoshow className='gm-scrollbar-black'>
          {categories.map(this.renderCategory, this)}
        </GeminiScrollbar>
      </div>
    );
  }

  renderCategory (category) {
    const {elements, categoriesCollapsed} = this.props.pageBuilder;
    const categoryElements = [];

    forEach(elements, (element, index) => {
      if (element.settings && element.settings.category) {
        if (element.settings.category === category && this.props.elementAcceptable(index, element)) {
          categoryElements.push({
            label: index,
            element
          });
        }
      } else if (category === 'other' && this.props.elementAcceptable(index, element)) {
        categoryElements.push({
          label: index,
          element
        });
      }
    });

    if (categoryElements.length > 0) {
      const collapsedCategory = categoriesCollapsed[category];

      return (
        <div className={cx('category', collapsedCategory && 'collapsed')} key={category}>
          <div className='category-info' onClick={this.toggleCategory.bind(this, category)}>
            <i className='material-icons'>arrow_drop_down</i>
            <span>{category}</span>
          </div>
          <div className='category-list'>
            {!collapsedCategory && categoryElements.map(this.renderElement, this)}
          </div>
        </div>
      );
    }
  }

  renderElement (elementObj) {
    const element = elementObj.element;
    const icon = element.settings.icon;
    const label = elementObj.label;

    return (
      <div className='element-entry' onClick={this.addElement.bind(this, label)} key={label}>
        <i className={icon.class}>{icon.content}</i>
        <span>{label}</span>
      </div>
    );
  }
}
