import cx from 'classnames';
import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Component} from 'relax-framework';

import Animate from '../animate';

export default class ElementsMenu extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  getInitState () {
    return {
      top: 0,
      left: 0,
      contentTop: 0,
      side: 'right',
      angleTriangle: false
    };
  }

  componentDidMount () {
    this.onCloseBind = ::this.onClose;
    this.updatePositionBind = ::this.updatePosition;
    this.stopPropagationBind = ::this.stopPropagation;

    findDOMNode(this).addEventListener('click', this.stopPropagationBind);
    document.addEventListener('click', this.onCloseBind);
    window.addEventListener('scroll', this.updatePositionBind);
    window.addEventListener('resize', this.updatePositionBind);
    this.updatePosition();
  }

  componentWillUnmount () {
    findDOMNode(this).removeEventListener('click', this.stopPropagationBind);
    document.removeEventListener('click', this.onCloseBind);
    window.removeEventListener('scroll', this.updatePositionBind);
    window.removeEventListener('resize', this.updatePositionBind);
  }

  toggleCategory (category, event) {
    event.preventDefault();
    const {toggleCategory} = this.props.pageBuilderActions;
    toggleCategory(category);
  }

  stopPropagation (event) {
    this.clickedInside = true;
  }

  updatePosition (event = null, props = this.props) {
    const containerRect = props.pageBuilder.elementsMenuOptions.container.getBoundingClientRect();

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
    const {elementsMenuOptions} = this.props.pageBuilder;
    this.props.pageBuilderActions.closeElementsMenu();
    this.props.pageBuilderActions.addElementAt({tag}, {
      id: elementsMenuOptions.targetId,
      position: elementsMenuOptions.targetPosition
    });
  }

  elementAcceptable (elementTag, element) {
    const {elementsMenuOptions} = this.props.pageBuilder;
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
    const {categories} = this.props.pageBuilder;
    const style = {
      top: this.state.top,
      left: this.state.left
    };
    const ballonStyle = {
      top: this.state.contentTop
    };

    return (
      <Animate transition='slideLeftIn'>
        <div className={cx('elements-menu', this.state.side, this.state.angleTriangle && 'angled')} style={style}>
          <div className='arrow-left'></div>
          <div className='ballon' style={ballonStyle}>
            <div className='categories'>
              <GeminiScrollbar autoshow className='gm-scrollbar-black'>
                {categories.map(this.renderCategory, this)}
              </GeminiScrollbar>
            </div>
          </div>
        </div>
      </Animate>
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
      const collapsedCategory = categoriesCollapsed[category];

      return (
        <div className={cx('category', collapsedCategory && 'collapsed')}>
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
      <div className='element-entry' onClick={this.addElement.bind(this, label)}>
        <i className={icon.class}>{icon.content}</i>
        <span>{label}</span>
      </div>
    );
  }
}
