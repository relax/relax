import cx from 'classnames';
import forEach from 'lodash.foreach';
import Animate from 'components/animate';
import Component from 'components/component';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import styles from './elements-menu.less';
import List from './list';
import Search from './search';

export default class ElementsMenu extends Component {
  static fragments = {
    symbols: {
      _id: 1,
      title: 1
    }
  };

  static propTypes = {
    symbols: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired,
    elementsMenuOptions: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
  };

  getInitState () {
    return {
      top: 0,
      left: 0,
      contentTop: 0,
      side: 'right',
      angleTriangle: false,
      searchOpened: false,
      search: '',
      suggestions: [],
      suggestion: false
    };
  }

  componentDidMount () {
    this.onCloseBind = ::this.onClose;
    this.updatePositionBind = ::this.updatePosition;
    this.stopPropagationBind = ::this.stopPropagation;
    this.keyDownBind = ::this.focusSearch;

    findDOMNode(this).addEventListener('click', this.stopPropagationBind);
    document.addEventListener('keydown', this.keyDownBind);
    document.addEventListener('click', this.onCloseBind);
    window.addEventListener('scroll', this.updatePositionBind);
    window.addEventListener('resize', this.updatePositionBind);
    this.updatePosition();
  }

  componentWillUnmount () {
    findDOMNode(this).removeEventListener('click', this.stopPropagationBind);
    document.removeEventListener('keydown', this.keyDownBind);
    document.removeEventListener('click', this.onCloseBind);
    window.removeEventListener('scroll', this.updatePositionBind);
    window.removeEventListener('resize', this.updatePositionBind);
  }

  focusSearch () {
    if (!this.state.searchOpened) {
      document.removeEventListener('keydown', this.keyDownBind);
      this.setState({
        searchOpened: true
      });
    }
  }

  onSearchChange (search) {
    if (search) {
      const {elements, categories} = this.props;
      const suggestions = [];
      const searchLowered = search.toLowerCase();
      let suggestion = false;
      let suggestionweight = categories.length + 2;

      forEach(elements, (element, name) => {
        if (this.elementAcceptable(name, element) && name.toLowerCase().indexOf(searchLowered) !== -1) {
          let weight = categories.length;
          forEach(categories, (category, ind) => {
            if (category === (element.settings && element.settings.category)) {
              weight = ind;
            }
          });
          if (weight < suggestionweight) {
            suggestion = name;
            suggestionweight = weight;
          }
          suggestions.push(name);
        }
      });

      forEach(this.props.symbols, (symbol) => {
        if (symbol.title.toLowerCase().indexOf(searchLowered) !== -1) {
          const weight = categories.length + 1;
          if (weight < suggestionweight) {
            suggestion = {
              type: 'symbol',
              id: symbol._id,
              title: symbol.title
            };
            suggestionweight = weight;
          }
          suggestions.push({
            type: 'symbol',
            id: symbol._id
          });
        }
      });

      this.setState({
        searchOpened: true,
        search,
        suggestions,
        suggestion
      });
    } else {
      this.state.searchOpened && document.addEventListener('keydown', this.keyDownBind);
      this.setState({
        searchOpened: false,
        search
      });
    }
  }

  toggleCategory (category) {
    const {toggleCategory} = this.props.pageBuilderActions;
    toggleCategory(category);
  }

  stopPropagation () {
    this.clickedInside = true;
  }

  updatePosition (event = null, props = this.props) {
    const containerRect = props.elementsMenuOptions.container.getBoundingClientRect();

    const top = containerRect.top + containerRect.height / 2 - 105;
    let left = containerRect.right + 10;
    let side = 'right';
    let angleTriangle = false;

    // Constraints
    let contentTop = 0;
    const menuWidth = 280;
    const menuHeight = 400;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    if (top + menuHeight > windowHeight) {
      contentTop = windowHeight - (top + menuHeight);

      if (contentTop < -360) {
        contentTop = -360;
      }
    }

    if (top < 46) {
      const dif = 46 - top;
      contentTop = dif;
      if (contentTop > 95) {
        contentTop = 115;
        angleTriangle = true;
      }
    }

    if (left + menuWidth > windowWidth) {
      side = 'left';
      left = containerRect.right - 10 - menuWidth - containerRect.width;
    }

    this.setState({top, left, contentTop, side, angleTriangle});
  }

  onClose () {
    if (!this.clickedInside) {
      this.props.pageBuilderActions.closeElementsMenu();
    }
    this.clickedInside = false;
  }

  addElement (tag) {
    const {elementsMenuOptions} = this.props;
    this.props.pageBuilderActions.closeElementsMenu();
    this.props.pageBuilderActions.addElementAt({tag}, {
      id: elementsMenuOptions.targetId,
      position: elementsMenuOptions.targetPosition
    });
  }

  addSymbol (symbolId) {
    const {elementsMenuOptions} = this.props;
    this.props.pageBuilderActions.closeElementsMenu();
    this.props.pageBuilderActions.addElementAt({
      tag: 'Symbol',
      props: {
        symbolId
      }
    }, {
      id: elementsMenuOptions.targetId,
      position: elementsMenuOptions.targetPosition
    });
  }

  elementAcceptable (elementTag, element) {
    const {elementsMenuOptions} = this.props;
    let is = true;

    if (elementsMenuOptions.accepts) {
      if (elementsMenuOptions.accepts !== 'any' && elementsMenuOptions.accepts !== elementTag) {
        is = false;
      }
    } else if (elementsMenuOptions.rejects) {
      if (elementsMenuOptions.rejects === 'any' || elementsMenuOptions.rejects === elementTag) {
        is = false;
      }
    }

    const droppableOn = element.settings.drag && element.settings.drag.droppableOn;
    if (droppableOn) {
      if (droppableOn !== 'any' && elementsMenuOptions.targetType !== droppableOn) {
        is = false;
      }
    }

    return is;
  }

  render () {
    const style = {
      top: this.state.top,
      left: this.state.left
    };
    const ballonStyle = {
      top: this.state.contentTop
    };

    return (
      <Animate transition='slideLeftIn'>
        <div
          className={cx(styles.root, styles[this.state.side], this.state.angleTriangle && styles.angled)}
          style={style}
        >
          <div className={styles.arrowLeft}></div>
          <div className={styles.ballon} style={ballonStyle}>
            {this.renderContent()}
          </div>
        </div>
      </Animate>
    );
  }

  renderContent () {
    let result;
    if (this.state.searchOpened) {
      result = (
        <Search
          {...this.props}
          suggestions={this.state.suggestions}
          suggestion={this.state.suggestion}
          search={this.state.search}
          elementAcceptable={::this.elementAcceptable}
          onSearchChange={::this.onSearchChange}
          addElement={::this.addElement}
          addSymbol={::this.addSymbol}
        />
      );
    } else {
      result = (
        <List
          {...this.props}
          elementAcceptable={::this.elementAcceptable}
          addElement={::this.addElement}
          addSymbol={::this.addSymbol}
          toggleCategory={::this.toggleCategory}
        />
      );
    }
    return result;
  }
}
