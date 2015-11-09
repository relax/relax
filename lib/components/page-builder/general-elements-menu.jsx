import cx from 'classnames';
import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Input from '../data-types/input';
import {Draggable} from '../dnd';

export default class GeneralElementsMenu extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    dnd: PropTypes.object.isRequired,
    dndActions: PropTypes.object.isRequired
  }

  toggleCategory (category, event) {
    event.preventDefault();
    const {toggleCategory} = this.props.pageBuilderActions;
    toggleCategory(category);
  }

  onToggle (event) {
    event.preventDefault();
    const {generalElementsMenuOpened} = this.props.pageBuilder;
    const {setGeneralElementsMenuOpened} = this.props.pageBuilderActions;
    setGeneralElementsMenuOpened(!generalElementsMenuOpened);
  }

  close () {
    const {setGeneralElementsMenuOpened} = this.props.pageBuilderActions;
    setGeneralElementsMenuOpened(false);
  }

  elementAcceptable (tag, element) {
    const {generalElementsMenuSearch} = this.props.pageBuilder;
    if (generalElementsMenuSearch === '') {
      return true;
    }
    return tag.toLowerCase().indexOf(generalElementsMenuSearch.toLowerCase()) === 0;
  }

  render () {
    const {generalElementsMenuOpened} = this.props.pageBuilder;
    return (
      <div className='general-elements-menu'>
        {this.renderOpened()}
        <div className={cx('toggle', generalElementsMenuOpened && 'opened')} onClick={this.onToggle.bind(this)}>
          <i className='material-icons'>add</i>
        </div>
      </div>
    );
  }

  renderOpened () {
    const {generalElementsMenuOpened, generalElementsMenuSearch} = this.props.pageBuilder;
    const {setGeneralElementsMenuSearch} = this.props.pageBuilderActions;
    if (generalElementsMenuOpened) {
      return (
        <div className='opened-menu'>
          <div className='list'>
            {this.renderCategories()}
          </div>
          <div className='search'>
            <i className='material-icons'>search</i>
            <Input value={generalElementsMenuSearch} onChange={setGeneralElementsMenuSearch} />
          </div>
        </div>
      );
    }
  }

  renderCategories () {
    const {categories} = this.props.pageBuilder;
    return (
      <div className='categories'>
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
        if (element.settings.category === category && this.elementAcceptable(index, element)) {
          categoryElements.push({
            label: index,
            element
          });
        }
      } else if (category === 'other' && this.elementAcceptable(index, element)) {
        categoryElements.push({
          label: index,
          element
        });
      }
    });

    if (categoryElements.length > 0) {
      const collapsed = categoriesCollapsed[category];

      return (
        <div className={cx('category', collapsed && 'collapsed')}>
          <div className={cx('category-info')} onClick={this.toggleCategory.bind(this, category)}>
            <span>{category}</span>
            <i className='material-icons'>{collapsed ? 'expand_more' : 'expand_less'}</i>
          </div>
          <div className='category-list'>
            {!collapsed && categoryElements.map(this.renderElement, this)}
          </div>
        </div>
      );
    }
  }

  renderElement (elementObj) {
    const element = elementObj.element;
    const icon = element.settings.icon;
    const label = elementObj.label;

    const props = {
      key: label,
      dnd: this.props.dnd,
      dndActions: this.props.dndActions,
      dragInfo: {
        type: 'new',
        element: label
      },
      type: label
    };

    if (element.settings && element.settings.drag) {
      Object.assign(props, element.settings.drag);
    }

    return (
      <Draggable {...props}>
        <div className='general-em-element-entry'>
          <i className={icon.class}>{icon.content}</i>
          <span>{label}</span>
          <div className='drag-info'>
            <i className='material-icons'>more_vert</i>
            <i className='material-icons'>more_vert</i>
          </div>
        </div>
      </Draggable>
    );
  }
}
