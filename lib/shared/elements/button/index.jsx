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

  static contextTypes = {
    store: PropTypes.object.isRequired
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
        let newChildren = [];
        const newElements = {};

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
          newChildren = [0, 1];
          if (nextProps.layout === 'icon' || nextProps.layout === 'icontext') {
            newElements[0] = iconChild;
            if (nextProps.layout === 'icontext') {
              newElements[1] = textChild;
            }
          } else if (nextProps.layout === 'text' || nextProps.layout === 'texticon') {
            newElements[0] = textChild;
            if (nextProps.layout === 'texticon') {
              newElements[1] = iconChild;
            }
          }
        } else {
          newChildren = [0];
          newElements[0] = (iconChild || textChild);
        }

        this.context.store.dispatch(
          changeElementChildren(relax.element.id, newChildren, newElements, relax.context)
        );
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
