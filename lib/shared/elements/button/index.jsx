import cx from 'classnames';
import forEach from 'lodash.foreach';
import React, {PropTypes} from 'react';
import {changeElementChildren} from 'actions/page-builder';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';

export default class Button extends Component {

  static propTypes = {
    layout: PropTypes.string.isRequired,
    arrange: PropTypes.string.isRequired,
    styleClassMap: PropTypes.object,
    children: PropTypes.node,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    layout: 'text',
    arrange: 'side'
  };

  static defaultChildren = [
    {
      tag: 'TextBox',
      children: 'Button text',
      subComponent: true
    }
  ];

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  componentWillReceiveProps (nextProps) {
    const {relax} = this.props;
    const editing = relax.editing;
    if (editing && relax.selected) {
      // Check if layout changed
      if (nextProps.layout !== this.props.layout) {
        // 'text', 'icontext', 'texticon', 'icon'
        const newChildren = [];

        let textChild = false;
        let iconChild = false;

        if (nextProps.layout === 'text' || nextProps.layout === 'texticon' || nextProps.layout === 'icontext') {
          forEach(relax.element.children, (child) => {
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
          forEach(relax.element.children, (child) => {
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

        relax.dispatch(changeElementChildren(relax.element.id, newChildren));
      }
    }
  }

  render () {
    const classMap = this.props.styleClassMap || {};

    const props = {
      htmlTag: 'div',
      ...this.props.relax,
      settings,
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

  renderChildren () {
    let result;
    if (this.props.arrange === 'blocks' || this.props.layout === 'text' || this.props.layout === 'icon') {
      result = this.props.children;
    } else {
      result = (
        <div className={cx(classes.sided)}>
          {this.props.children[0]}
          {this.props.children[1]}
        </div>
      );
    }
    return result;
  }
}
