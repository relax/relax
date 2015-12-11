import forEach from 'lodash.foreach';
import key from 'keymaster';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Autocomplete from '../../autocomplete';

export default class Search extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    elementAcceptable: PropTypes.func.isRequired,
    addElement: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    suggestions: PropTypes.array.isRequired,
    suggestion: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }

  componentDidMount () {
    key('enter', 'suggestions', this.addElementHotkey.bind(this, 0));
    for (let i = 1; i < 10; i++) {
      key(`⌘+${i}, ctrl+${i}`, 'suggestions', this.addElementHotkey.bind(this, i));
    }
    key.setScope('suggestions');
  }

  componentWillUnmount () {
    key.unbind('enter');
    for (let i = 1; i < 10; i++) {
      key.unbind(`⌘+${i}, ctrl+${i}`);
    }
    key.setScope('all');
  }

  addElementHotkey (num, event) {
    event.preventDefault();
    event.stopPropagation();
    const {suggestions} = this.props;
    const {categories, elements} = this.props.pageBuilder;

    let counter = 0;
    let added = false;
    forEach(categories, (category) => {
      forEach(suggestions, (elementName) => {
        const element = elements[elementName];
        const elementCategory = element.settings && element.settings.category || 'other';
        if (category === elementCategory) {
          if (counter === num) {
            this.props.addElement(elementName);
            added = true;
          } else {
            counter++;
          }
        }
        if (added) {
          return false;
        }
      });
      if (added) {
        return false;
      }
    });
  }

  addElement (tag) {
    event.preventDefault();
    this.props.addElement(tag);
  }

  render () {
    this.suggestionsCounter = -1;

    return (
      <div className='search'>
        <Autocomplete
          value={this.props.search}
          onChange={this.props.onSearchChange}
          suggestion={this.props.suggestion}
          focused
        />
        <div className='search-list'>
          <GeminiScrollbar autoshow className='gm-scrollbar-black'>
            {this.renderContent()}
          </GeminiScrollbar>
        </div>
      </div>
    );
  }

  renderContent () {
    let result;

    if (this.props.suggestions.length > 0) {
      const {categories} = this.props.pageBuilder;
      result = categories.map(this.renderCategory, this);
    } else {
      result = <div className='no-results'>No results from your search</div>;
    }

    return result;
  }

  renderCategory (category) {
    const {suggestions, pageBuilder} = this.props;
    const {elements} = pageBuilder;
    const categoryElements = [];

    forEach(suggestions, (elementName) => {
      const element = elements[elementName];
      if (element.settings && element.settings.category) {
        if (element.settings.category === category) {
          categoryElements.push({
            label: elementName,
            element
          });
        }
      } else if (category === 'other') {
        categoryElements.push({
          label: elementName,
          element
        });
      }
    });

    if (categoryElements.length > 0) {
      return (
        <div className='suggestion-category' key={category}>
          <div className='category-info'>{category}</div>
          <div className='category-elements'>
            {categoryElements.map(this.renderElement, this)}
          </div>
        </div>
      );
    }
  }

  renderElement (elementObj) {
    const element = elementObj.element;
    const icon = element.settings.icon;
    const label = elementObj.label;

    const index = label.toLowerCase().indexOf(this.props.search.toLowerCase());
    const before = index > 0 && label.slice(0, index);
    const searched = label.slice(index, index + this.props.search.length);
    const after = label.slice(index + this.props.search.length);

    this.suggestionsCounter++;

    return (
      <div className='element-entry' onClick={this.addElement.bind(this, label)} key={label}>
        <i className={icon.class}>{icon.content}</i>
        <span>{before}</span>
        <span className='searched'>{searched}</span>
        <span>{after}</span>
        {this.suggestionsCounter < 10 && <span className='hotkey'>{this.suggestionsCounter === 0 ? 'enter' : ('cmd+' + this.suggestionsCounter)}</span>}
      </div>
    );
  }
}
