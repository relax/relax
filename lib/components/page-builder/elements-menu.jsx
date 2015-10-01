import React from 'react';
import {Component} from 'relax-framework';
import forEach from 'lodash.foreach';
import GeminiScrollbar from 'react-gemini-scrollbar';
import Animate from '../animate';
import {Events} from 'backbone';
import merge from 'lodash.merge';
import cx from 'classnames';

var collapsed = false;

export default class ElementsMenu extends Component {
  getInitialState () {
    var categories = [
      'structure',
      'content',
      'media',
      'form'
    ];

    forEach(this.context.elements, (element) => {
      if (element.settings && element.settings.category) {
        if (categories.indexOf(element.settings.category) === -1) {
          categories.push(element.settings.category);
        }
      }
    });

    categories.push('other');

    if (collapsed === false) {
      collapsed = {};
      forEach(categories, (category) => collapsed[category] = false);
    }

    return {
      categories,
      top: 0,
      left: 0,
      contentTop: 0,
      side: 'right'
    };
  }

  toggleCategory (category, event) {
    event.preventDefault();
    collapsed[category] = !collapsed[category];
    this.forceUpdate();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.targetId !== nextProps.targetId || this.props.targetPosition !== nextProps.targetPosition) {
      this.updatePosition(nextProps);
    }
  }

  componentDidMount () {
    super.componentDidMount();
    this.onCloseBind = this.onClose.bind(this);
    this.updatePositionBind = this.updatePosition.bind(this);
    this.stopPropagationBind = this.stopPropagation.bind(this);

    document.addEventListener('click', this.onCloseBind);
    React.findDOMNode(this).addEventListener('click', this.stopPropagationBind);
    window.addEventListener('scroll', this.updatePositionBind);
    window.addEventListener('resize', this.updatePositionBind);
    this.updatePosition();
  }

  componentWillUnmount () {
    super.componentWillUnmount();
    document.removeEventListener('click', this.onCloseBind);
    React.findDOMNode(this).removeEventListener('click', this.stopPropagationBind);
    window.removeEventListener('scroll', this.updatePositionBind);
    window.removeEventListener('resize', this.updatePositionBind);
  }

  stopPropagation (event) {
    this.clickedInside = true;
  }

  updatePosition (props) {
    props = (props && props.container) ? props : this.props;

    const containerRect = props.container.getBoundingClientRect();

    let top = containerRect.top + containerRect.height / 2 - 26;
    let left = containerRect.right + 10;
    let side = 'right';

    // Constraints
    let contentTop = 0;
    let menuWidth = 190; // XXX hard coded
    let menuHeight = 240; // XXX hard coded
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;

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
    if (!this.clickedInside) {
      this.props.onClose();
    }
    this.clickedInside = false;
  }

  addElement (tag) {
    this.props.onClose();
    this.context.addElementAtId(tag, this.props.targetId, this.props.targetPosition);
  }

  elementAcceptable (elementTag, element) {
    var is = true;

    if (this.props.accepts) {
      if (this.props.accepts !== 'any' && this.props.accepts !== elementTag) {
        is = false;
      }
    } else if (this.props.rejects) {
      if (this.props.rejects === 'any' || this.props.rejects === elementTag) {
        is = false;
      }
    }

    const droppableOn = element.settings.drag && element.settings.drag.droppableOn;
    if (droppableOn) {
      if (droppableOn !== 'any' && this.props.targetType !== droppableOn) {
        is = false;
      }
    }

    return is;
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
      let collapsedCategory = collapsed[category];

      return (
        <div className={cx('category', collapsedCategory && 'collapsed')}>
          <div className='category-info' onClick={this.toggleCategory.bind(this, category)}>
            <span>{category}</span>
            <i className='material-icons'>{collapsedCategory ? 'expand_more' : 'expand_less'}</i>
          </div>
          <div className='category-list'>
            {!collapsedCategory && elements.map(this.renderElement, this)}
          </div>
        </div>
      );
    }
  }

  render () {
    let style = {
      top: this.state.top,
      left: this.state.left
    };

    let ballonStyle = {
      top: this.state.contentTop
    };

    return (
      <Animate transition='slideLeftIn'>
        <div className={cx('elements-menu', this.state.side)} style={style}>
          <div className='arrow-left'></div>
          <div className='ballon' style={ballonStyle}>
            <div className='categories'>
              <GeminiScrollbar autoshow={true} className='gm-scrollbar-black'>
                {this.state.categories.map(this.renderCategory, this)}
              </GeminiScrollbar>
            </div>
          </div>
        </div>
      </Animate>
    );
  }
}
merge(ElementsMenu.prototype, Events);

ElementsMenu.contextTypes = {
  elements: React.PropTypes.object.isRequired,
  addElementAtId: React.PropTypes.func.isRequired
};

ElementsMenu.propTypes = {
  container: React.PropTypes.any.isRequired,
  targetId: React.PropTypes.number.isRequired,
  onClose: React.PropTypes.func.isRequired
};

ElementsMenu.defaultProps = {

};
