import React from 'react';
import Component from '../../component';
import Element from '../../element';
import styles from '../../../styles';
import cx from 'classnames';
import forEach from 'lodash.foreach';

import settings from './settings';
import style from './style';
import classes from './classes';
import propsSchema from './props-schema';

export default class Button extends Component {

  componentWillReceiveProps (nextProps) {
    if (this.context.editing && this.context.selected && this.context.selected.id === this.props.element.id) {
      // Check if layout changed
      if (nextProps.layout !== this.props.layout) {
        // 'text', 'icontext', 'texticon', 'icon'

        let newChildren = [];

        let textChild = false;
        let iconChild = false;

        if (nextProps.layout === 'text' || nextProps.layout === 'texticon' || nextProps.layout === 'icontext') {
          forEach(this.props.element.children, (child) => {
            if (child.tag === 'TextBox') {
              textChild = child;
            }
          });

          if (!textChild) {
            textChild = {
              tag: 'TextBox',
              children: 'Button text',
              subComponent: true
            };
          }
        }

        if (nextProps.layout === 'icon' || nextProps.layout === 'texticon' || nextProps.layout === 'icontext') {
          forEach(this.props.element.children, (child) => {
            if (child.tag === 'Icon') {
              iconChild = child;
            }
          });

          if (!iconChild) {
            iconChild = {
              tag: 'Icon',
              subComponent: true
            };
          }
        }

        if (iconChild && textChild) {
          if (nextProps.layout === 'icon' || nextProps.layout === 'icontext') {
            newChildren.push(iconChild);
            if (nextProps.layout === 'icontext') {
              newChildren.push(textChild);
            }
          } else if (nextProps.layout === 'text' || nextProps.layout === 'texticon') {
            newChildren.push(textChild);
            if (nextProps.layout === 'texticon') {
              newChildren.push(iconChild);
            }
          }
        } else {
          newChildren.push(iconChild || textChild);
        }

        // Change it
        this.context.elementContentChange(newChildren);
      }
    }
  }

  renderChildren () {
    if (this.props.arrange === 'blocks' || this.props.layout === 'text' || this.props.layout === 'icon') {
      return this.props.children;
    } else {
      return (
        <div className={cx(classes.sided)}>
          {this.props.children[0]}
          {this.props.children[1]}
        </div>
      );
    }
  }

  render () {
    let classMap = (this.props.style && styles.getClassesMap(this.props.style)) || {};

    let props = {
      tag: 'div',
      element: this.props.element,
      settings: this.constructor.settings,
      className: cx(classes.holder, classMap.holder)
    };

    return (
      <Element {...props}>
        <div className={cx(classes.button, classMap.button)}>
          {this.renderChildren()}
        </div>
      </Element>
    );
  }
}

Button.propTypes = {
};

Button.contextTypes = {
  editing: React.PropTypes.bool.isRequired,
  elementContentChange: React.PropTypes.func.isRequired,
  selected: React.PropTypes.any
};

Button.defaultProps = {
  layout: 'text',
  arrange: 'side'
};

Button.defaultChildren = [
  {
    tag: 'TextBox',
    children: 'Button text',
    subComponent: true
  }
];

styles.registerStyle(style);
Button.propsSchema = propsSchema;
Button.settings = settings;
