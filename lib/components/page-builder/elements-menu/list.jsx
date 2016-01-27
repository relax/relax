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
    addSymbol: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    symbols: PropTypes.object.isRequired
  }

  toggleCategory (category, event) {
    event.preventDefault();
    this.props.toggleCategory(category);
  }

  addElement (tag, event) {
    event.preventDefault();
    this.props.addElement(tag);
  }

  addSymbol (symbolId) {
    this.props.addSymbol(symbolId);
  }

  render () {
    const {categories} = this.props.pageBuilder;
    return (
      <div className='categories-list'>
        <GeminiScrollbar autoshow className='gm-scrollbar-black'>
          {categories.map(this.renderCategory, this)}
          {this.renderSymbolsCategory()}
        </GeminiScrollbar>
      </div>
    );
  }

  renderCategory (category) {
    const {elements, categoriesCollapsed} = this.props.pageBuilder;
    const categoryElements = [];

    forEach(elements, (element, index) => {
      if (element.settings && element.settings.category) {
        if (element.settings.category === category && this.props.elementAcceptable(index, element) && index !== 'Symbol') {
          categoryElements.push({
            label: index,
            element
          });
        }
      } else if (category === 'other' && this.props.elementAcceptable(index, element) && index !== 'Symbol') {
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

  renderSymbolsCategory () {
    if (Object.keys(this.props.symbols).length > 0) {
      const {categoriesCollapsed} = this.props.pageBuilder;
      const collapsedCategory = categoriesCollapsed.symbols;

      const symbols = [];
      forEach(this.props.symbols, (symbol) => {
        symbols.push(this.renderSymbol(symbol));
      });

      return (
        <div className={cx('category', collapsedCategory && 'collapsed')} key='symbols'>
          <div className='category-info' onClick={this.toggleCategory.bind(this, 'symbols')}>
            <i className='material-icons'>arrow_drop_down</i>
            <span>Symbols</span>
          </div>
          <div className='category-list'>
            {!collapsedCategory && symbols}
          </div>
        </div>
      );
    }
  }

  renderSymbol (symbol) {
    return (
      <div className='element-entry' onClick={this.addSymbol.bind(this, symbol._id)} key={symbol._id}>
        <i className='material-icons'>extension</i>
        <span>{symbol.title}</span>
      </div>
    );
  }
}
