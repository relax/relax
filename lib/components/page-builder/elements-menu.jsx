import cx from 'classnames';
import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import Animate from '../animate';

export default class ElementsMenu extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }

  getInitialState () {
    return {
      top: 0,
      left: 0,
      contentTop: 0,
      side: 'right'
    };
  }

  componentDidMount () {
    this.onCloseBind = this.onClose.bind(this);
    this.updatePositionBind = this.updatePosition.bind(this);
    this.stopPropagationBind = this.stopPropagation.bind(this);

    React.findDOMNode(this).addEventListener('click', this.stopPropagationBind);
    document.addEventListener('click', this.onCloseBind);
    window.addEventListener('scroll', this.updatePositionBind);
    window.addEventListener('resize', this.updatePositionBind);
    this.updatePosition();
  }

  componentWillReceiveProps (nextProps) {
    // if (this.props.targetId !== nextProps.targetId || this.props.targetPosition !== nextProps.targetPosition) {
    //   this.updatePosition(nextProps);
    // }
  }

  componentWillUnmount () {
    React.findDOMNode(this).removeEventListener('click', this.stopPropagationBind);
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

  updatePosition (props = this.props) {
    const containerRect = props.container.getBoundingClientRect();

    const top = containerRect.top + containerRect.height / 2 - 26;
    let left = containerRect.right + 10;
    let side = 'right';

    // Constraints
    let contentTop = 0;
    const menuWidth = 190; // XXX hard coded
    const menuHeight = 240; // XXX hard coded
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    if (top + menuHeight > windowHeight) {
      contentTop = windowHeight - (top + menuHeight);

      if (contentTop < -200) {
        contentTop = -200;
      }
    }

    if (left + menuWidth > windowWidth) {
      side = 'left';
      left = containerRect.right - 10 - menuWidth - containerRect.width;
    }

    this.setState({top, left, contentTop, side});
  }

  onClose () {
    // if (!this.clickedInside) {
    //   this.props.onClose();
    // }
    // this.clickedInside = false;
  }

  addElement (tag) {
    // this.props.onClose();
    // this.context.addElementAtId(tag, this.props.targetId, this.props.targetPosition);
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
        <div className={cx('elements-menu', this.state.side)} style={style}>
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
            <span>{category}</span>
            <i className='material-icons'>{collapsedCategory ? 'expand_more' : 'expand_less'}</i>
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
