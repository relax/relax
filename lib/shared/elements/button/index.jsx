import Component from 'components/component';
import Link from 'components/link';
import cx from 'classnames';
import forEach from 'lodash/forEach';
import React from 'react';
import PropTypes from 'prop-types';
import {changeElementChildren} from 'actions/page-builder';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';

export default class Button extends Component {
  static propTypes = {
    layout: PropTypes.string.isRequired,
    arrange: PropTypes.string.isRequired,
    styleClassMap: PropTypes.object,
    children: PropTypes.node,
    relax: PropTypes.object.isRequired,
    link: PropTypes.object,
    renderChildren: PropTypes.func.isRequired,
    Element: PropTypes.func.isRequired
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
    const {Element, link, styleClassMap} = this.props;

    const props = {
      htmlTag: 'div',
      ...this.props.relax,
      settings,
      className: cx(classes.holder, styleClassMap.holder)
    };

    return (
      <Element {...props}>
        <Link link={link} className={cx(classes.button, styleClassMap.button)}>
          {this.renderChildren()}
        </Link>
      </Element>
    );
  }

  renderChildren () {
    const {renderChildren, arrange, layout} = this.props;
    let result;

    if (arrange === 'blocks' || layout === 'text' || layout === 'icon') {
      result = renderChildren();
    } else {
      result = (
        <div className={cx(classes.sided)}>
          {renderChildren()}
        </div>
      );
    }

    return result;
  }
}
