import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import cx from 'classnames';
import merge from 'lodash.merge';
import {Draggable} from '../drag';

export default class GeneralElementsMenu extends Component {
  getInitialState () {
    var categories = [
      'structure',
      'content',
      'media'
    ];

    forEach(this.context.elements, (element) => {
      if (element.settings && element.settings.category) {
        if (categories.indexOf(element.settings.category) === -1) {
          categories.push(element.settings.category);
        }
      }
    });

    categories.push('other');

    var collapsed = {};
    forEach(categories, (category) => collapsed[category] = false);

    return {
      categories,
      search: '',
      collapsed
    };
  }

  toggleCategory (category, event) {
    event.preventDefault();
    this.state.collapsed[category] = !this.state.collapsed[category];
    this.setState({
      collapsed: this.state.collapsed
    });
  }

  onToggle (event) {
    event.preventDefault();
    this.setState({
      opened: !this.state.opened
    });
  }

  close () {
    this.setState({
      opened: false
    });
  }

  elementAcceptable (tag, element) {
    if (this.state.search === '') {
      return true;
    }

    return tag.toLowerCase().indexOf(this.state.search.toLowerCase()) === 0;
  }

  onStartDrag () {
    this.context.onStartDrag();
    this.close();
  }

  searchChange (event) {
    this.setState({
      search: event.target.value
    });
  }

  renderElement (elementObj) {
    const element = elementObj.element;
    const icon = element.settings.icon;
    const label = elementObj.label;

    var props = {
      key: label,
      onStartDrag: this.onStartDrag.bind(this),
      dragInfo: {
        type: 'new',
        element: label
      },
      type: label
    };

    if (element.settings && element.settings.drag) {
      merge(props, element.settings.drag);
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

  renderCategory (category) {
    var elements = [];

    forEach(this.context.elements, (element, index) => {
      if (element.settings && element.settings.category) {
        if (element.settings.category === category && this.elementAcceptable(index, element)) {
          elements.push({
            label: index,
            element
          });
        }
      } else if (category === 'other' && this.elementAcceptable(index, element)) {
        elements.push({
          label: index,
          element
        });
      }
    });

    if (elements.length > 0) {
      let collapsed = this.state.collapsed[category];

      return (
        <div className={cx('category', collapsed && 'collapsed')}>
          <div className={cx('category-info')} onClick={this.toggleCategory.bind(this, category)}>
            <span>{category}</span>
            <i className='material-icons'>{collapsed ? 'expand_more' : 'expand_less'}</i>
          </div>
          <div className='category-list'>
            {!collapsed && elements.map(this.renderElement, this)}
          </div>
        </div>
      );
    }
  }

  renderCategories () {
    return (
      <div className='categories'>
        <GeminiScrollbar autoshow={true} className='gm-scrollbar-black'>
          {this.state.categories.map(this.renderCategory, this)}
        </GeminiScrollbar>
      </div>
    );
  }

  renderOpened () {
    if (this.state.opened) {
      return (
        <div className='opened-menu'>
          <div className='list'>
            {this.renderCategories()}
          </div>
          <div className='search'>
            <i className='material-icons'>search</i>
            <input type='text' value={this.state.search} onChange={this.searchChange.bind(this)}></input>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <div className='general-elements-menu'>
        {this.renderOpened()}
        <div className={cx('toggle', this.state.opened && 'opened')} onClick={this.onToggle.bind(this)}>
          <i className='material-icons'>add</i>
        </div>
      </div>
    );
  }
}

GeneralElementsMenu.contextTypes = {
  elements: React.PropTypes.object.isRequired,
  addElementAtId: React.PropTypes.func.isRequired,
  onStartDrag: React.PropTypes.func.isRequired
};

GeneralElementsMenu.propTypes = {
  container: React.PropTypes.any.isRequired,
  targetId: React.PropTypes.number.isRequired,
  onClose: React.PropTypes.func.isRequired
};

GeneralElementsMenu.defaultProps = {

};
