import cx from 'classnames';
import forEach from 'lodash.foreach';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import React, {PropTypes} from 'react';

import styles from './list.less';

export default class List extends Component {
  static propTypes = {
    elementAcceptable: PropTypes.func.isRequired,
    addElement: PropTypes.func.isRequired,
    addSymbol: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    symbols: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    categoriesCollapsed: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired
  };

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
    const {categories} = this.props;
    return (
      <div className={styles.root}>
        <Scrollable>
          {categories.map(this.renderCategory, this)}
          {this.renderSymbolsCategory()}
        </Scrollable>
      </div>
    );
  }

  renderCategory (category) {
    const {elements, categoriesCollapsed} = this.props;
    const categoryElements = [];

    forEach(elements, (element, index) => {
      if (element.settings && element.settings.category) {
        if (element.settings.category === category &&
            this.props.elementAcceptable(index, element) &&
            index !== 'Symbol') {
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
      const onClick = this.toggleCategory.bind(this, category);

      return (
        <div className={cx(styles.category, collapsedCategory && styles.collapsed)} key={category}>
          <div className={styles.categoryInfo} onClick={onClick}>
            <i className='nc-icon-mini arrows-1_small-triangle-down'></i>
            <span>{category}</span>
          </div>
          <div>
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
    const addElement = this.addElement.bind(this, label);

    return (
      <div className={styles.elementEntry} onClick={addElement} key={label}>
        <i className={icon.class}>{icon.content}</i>
        <span>{label}</span>
      </div>
    );
  }

  renderSymbolsCategory () {
    if (Object.keys(this.props.symbols).length > 0) {
      const {categoriesCollapsed} = this.props;
      const collapsedCategory = categoriesCollapsed.symbols;

      const symbols = [];
      forEach(this.props.symbols, (symbol) => {
        symbols.push(this.renderSymbol(symbol));
      });
      const onClick = this.toggleCategory.bind(this, 'symbols');

      return (
        <div className={cx(styles.category, collapsedCategory && styles.collapsed)} key='symbols'>
          <div className={styles.categoryInfo} onClick={onClick}>
            <i className='nc-icon-mini arrows-1_small-triangle-down'></i>
            <span>Symbols</span>
          </div>
          <div>
            {!collapsedCategory && symbols}
          </div>
        </div>
      );
    }
  }

  renderSymbol (symbol) {
    const onClick = this.addSymbol.bind(this, symbol._id);
    return (
      <div className={styles.elementEntry} onClick={onClick} key={symbol._id}>
        <i className='nc-icon-mini objects_puzzle-10'></i>
        <span>{symbol.title}</span>
      </div>
    );
  }
}
