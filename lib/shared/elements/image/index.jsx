import cx from 'classnames';
import elementStyles from 'styles/element.less';
import MediaImage from 'components/image';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import Component from '../component';
import Element from '../element';

export default class Image extends Component {
  static propTypes = {
    useOver: PropTypes.bool.isRequired,
    imageOver: PropTypes.string,
    children: PropTypes.string,
    styleClassMap: PropTypes.object,
    relax: PropTypes.object.isRequired
  };

  static defaultProps = {
    useOver: false
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  getInitState () {
    return {
      mounted: false
    };
  }

  componentDidMount () {
    const dom = findDOMNode(this);
    const rect = dom.getBoundingClientRect();
    const width = Math.round(rect.right - rect.left);
    this.setState({ // eslint-disable-line
      mounted: true,
      width
    });
  }

  render () {
    const {styleClassMap, useOver, relax} = this.props;

    return (
      <Element
        {...relax}
        htmlTag='div'
        className={cx(styleClassMap.root, useOver && classes.overable)}
        settings={settings}
      >
        {this.renderImage()}
      </Element>
    );
  }

  renderImage () {
    const {styleClassMap, relax, children} = this.props;
    let result;

    if (this.state.mounted && children) {
      result = (
        <div>
          <MediaImage
            editing={relax.editing}
            id={children}
            width={this.state.width}
            className={cx('normal-image', styleClassMap.image)}
          />
          {this.renderOverImage()}
        </div>
      );
    } else if (relax.editing) {
      result = (
        <div className={elementStyles.dummy}>
          <i className='nc-icon-outline media-1_image-02'></i>
        </div>
      );
    }
    return result;
  }

  renderOverImage () {
    const {styleClassMap, useOver, imageOver} = this.props;

    if (useOver) {
      return (
        <MediaImage
          id={imageOver}
          width={this.state.width}
          className={cx(styleClassMap.image, 'over-image')}
        />
      );
    }
  }
}
