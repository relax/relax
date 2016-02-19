import forEach from 'lodash.foreach';
import key from 'keymaster';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './search.less';
import Autocomplete from './autocomplete';

export default class Search extends Component {
  static propTypes = {
    elementAcceptable: PropTypes.func.isRequired,
    addElement: PropTypes.func.isRequired,
    addSymbol: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    suggestions: PropTypes.array.isRequired,
    suggestion: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    symbols: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired
  };

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
    const {categories, elements} = this.props;

    let counter = 0;
    let added = false;
    forEach(categories, (category) => {
      forEach(suggestions, (suggestion) => {
        if (typeof suggestion === 'string') {
          const element = elements[suggestion];
          const elementCategory = element.settings && element.settings.category || 'other';
          if (category === elementCategory) {
            if (counter === num) {
              this.props.addElement(suggestion);
              added = true;
            } else {
              counter++;
            }
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

    if (!added) {
      forEach(suggestions, (suggestion) => {
        if (typeof suggestion !== 'string') {
          if (counter === num) {
            this.props.addSymbol(suggestion.id);
            added = true;
          } else {
            counter++;
          }
        }
        if (added) {
          return false;
        }
      });
    }
  }

  addElement (tag, event) {
    event.preventDefault();
    this.props.addElement(tag);
  }

  addSymbol (symbolId) {
    this.props.addSymbol(symbolId);
  }

  render () {
    this.suggestionsCounter = -1;

    return (
      <div>
        <Autocomplete
          value={this.props.search}
          onChange={this.props.onSearchChange}
          suggestion={this.props.suggestion.title || this.props.suggestion}
          focused
        />
      <div className={styles.searchList}>
          <Scrollable>
            {this.renderContent()}
          </Scrollable>
        </div>
      </div>
    );
  }

  renderContent () {
    let result;

    if (this.props.suggestions.length > 0) {
      const {categories} = this.props;
      result = (
        <div>
          {categories.map(this.renderCategory, this)}
          {this.renderSymbols()}
        </div>
      );
    } else {
      result = <div className={styles.noResults}>No results from your search</div>;
    }

    return result;
  }

  renderCategory (category) {
    const {suggestions, elements} = this.props;
    const categoryElements = [];

    forEach(suggestions, (elementName) => {
      if (typeof elementName === 'string') {
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
      }
    });

    if (categoryElements.length > 0) {
      return (
        <div className={styles.suggestionCategory} key={category}>
          <div className={styles.categoryInfo}>{category}</div>
          <div>
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
      <div className={styles.elementEntry} onClick={this.addElement.bind(this, label)} key={label}>
        <i className={icon.class}>{icon.content}</i>
        <span>{before}</span>
        <span className={styles.searched}>{searched}</span>
        <span>{after}</span>
        {this.suggestionsCounter < 10 && <span className={styles.hotkey}>{this.suggestionsCounter === 0 ? 'enter' : ('cmd+' + this.suggestionsCounter)}</span>}
      </div>
    );
  }

  renderSymbols () {
    const {suggestions} = this.props;
    const symbolsSuggestions = [];

    forEach(suggestions, (suggestion) => {
      if (typeof suggestion !== 'string') {
        symbolsSuggestions.push(this.renderSymbol(suggestion.id));
      }
    });

    if (symbolsSuggestions.length > 0) {
      return (
        <div className={styles.suggestionCategory} key='symbols'>
          <div className={styles.categoryInfo}>Symbols</div>
          <div>
            {symbolsSuggestions}
          </div>
        </div>
      );
    }
  }

  renderSymbol (id) {
    const symbol = this.props.symbols[id];
    const label = symbol.title;

    const index = label.toLowerCase().indexOf(this.props.search.toLowerCase());
    const before = index > 0 && label.slice(0, index);
    const searched = label.slice(index, index + this.props.search.length);
    const after = label.slice(index + this.props.search.length);

    this.suggestionsCounter++;

    return (
      <div className={styles.elementEntry} onClick={this.addSymbol.bind(this, id)} key={id}>
        <i className='nc-icon-mini objects_puzzle-10'></i>
        <span>{before}</span>
        <span className={styles.searched}>{searched}</span>
        <span>{after}</span>
        {this.suggestionsCounter < 10 && <span className={styles.hotkey}>{this.suggestionsCounter === 0 ? 'enter' : ('cmd+' + this.suggestionsCounter)}</span>}
      </div>
    );
  }
}
