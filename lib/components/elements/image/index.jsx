import cx from 'classnames';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import classes from './classes';
import propsSchema from './props-schema';
import settings from './settings';
import Component from '../../component';
import Element from '../../element';
import MediaImage from '../../image';
import Utils from '../../../utils';
import {getColorString} from '../../../helpers/colors';

export default class Image extends Component {
  static propTypes = {
    element: PropTypes.object.isRequired,
    pageBuilder: PropTypes.object,
    color: PropTypes.object.isRequired,
    useOver: PropTypes.bool.isRequired,
    imageOver: PropTypes.string,
    strictHeight: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    vertical: PropTypes.number.isRequired,
    useMaxWidth: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    children: PropTypes.string
  }

  static defaultProps = {
    color: {
      value: '#ffffff',
      opacity: 0
    },
    useOver: false,
    strictHeight: false,
    height: '200px',
    vertical: '50%',
    useMaxWidth: false,
    width: '300px',
    horizontal: 'center'
  }

  static propsSchema = propsSchema
  static settings = settings

  getInitState () {
    return {
      mounted: false
    };
  }

  componentDidMount () {
    const dom = findDOMNode(this);
    const rect = dom.getBoundingClientRect();
    const width = Math.round(rect.right - rect.left);
    this.setState({
      mounted: true,
      width
    });
  }

  render () {
    const style = {
      backgroundColor: getColorString(this.props.color)
    };
    const imageStyle = {};

    if (this.props.strictHeight) {
      style.height = this.props.height;
      style.overflow = 'hidden';

      Utils.translate(imageStyle, 0, '-' + this.props.vertical);
      imageStyle.top = parseInt(this.props.height, 10) * (parseInt(this.props.vertical, 10) / 100);
      imageStyle.position = 'relative';
    }

    if (this.props.useMaxWidth) {
      imageStyle.maxWidth = this.props.width;
      style.textAlign = this.props.horizontal;
    } else {
      imageStyle.minWidth = '100%';
    }

    return (
      <Element info={this.props} htmlTag='div' className={cx(this.props.useOver && classes.overable)} style={style} settings={settings}>
        {this.renderImage(imageStyle)}
      </Element>
    );
  }

  renderImage (imageStyle) {
    if (this.state.mounted) {
      return (
        <div>
          <MediaImage
            className='normal-image'
            editing={this.props.pageBuilder && this.props.pageBuilder.editing}
            id={this.props.children}
            width={this.state.width}
            style={imageStyle}
            height={this.props.strictHeight && this.props.height}
          />
          {this.renderOverImage(imageStyle)}
        </div>
      );
    }
  }

  renderOverImage (imageStyle) {
    if (this.props.useOver) {
      return (
        <MediaImage
          className='over-image'
          id={this.props.imageOver}
          width={this.state.width}
          style={imageStyle}
          height={this.props.strictHeight && this.props.height}
        />
      );
    }
  }
}
