import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import Component from '../../component';
import Element from '../../element';
import MediaImage from '../../image';
import Utils from '../../../utils';
import Colors from '../../../colors';

import settings from './settings';
import classes from './classes';
import propsSchema from './props-schema';

export default class Image extends Component {
  getInitialState () {
    return {
      mounted: false
    };
  }

  componentDidMount () {
    super.componentDidMount();
    var dom = ReactDOM.findDOMNode(this);
    var rect = dom.getBoundingClientRect();

    var width = Math.round(rect.right-rect.left);

    this.setState({
      mounted: true,
      width
    });
  }

  renderImage (imageStyle) {
    if (this.state.mounted) {
      return (
        <div>
          <MediaImage className='normal-image' id={this.props.children} width={this.state.width} style={imageStyle} height={this.props.height === 'strict' && this.props.height_px} />
          {this.props.useOver && <MediaImage className='over-image' id={this.props.imageOver} width={this.state.width} style={imageStyle} />}
        </div>
      );
    }
  }

  render () {
    var style = {
      backgroundColor: Colors.getColorString(this.props.color)
    };
    var imageStyle = {};

    if (this.props.height === 'strict') {
      style.height = this.props.height_px;
      style.overflow = 'hidden';

      Utils.translate(imageStyle, 0, (-this.props.vertical)+'%');
      imageStyle.top = this.props.height_px * (this.props.vertical / 100);
      imageStyle.position = 'relative';
    }

    if (this.props.width === 'max') {
      imageStyle.maxWidth = this.props.width_px;
      style.textAlign = this.props.horizontal;
    } else {
      imageStyle.minWidth = '100%';
    }

    return (
      <Element tag='div' className={cx(this.props.useOver && classes.overable)} style={style} element={this.props.element} settings={this.constructor.settings}>
        {this.renderImage(imageStyle)}
      </Element>
    );
  }
}

Image.propTypes = {
  color: React.PropTypes.string.isRequired,
  useOver: React.PropTypes.bool.isRequired,
  height: React.PropTypes.string.isRequired,
  height_px: React.PropTypes.number,
  vertical: React.PropTypes.number
};

Image.defaultProps = {
  color: {
    value: '#ffffff',
    opacity: 0
  },
  useOver: false,
  height: 'auto',
  height_px: 200,
  vertical: 50,
  width: 'full',
  width_px: 300,
  horizontal: 'center'
};

Image.propsSchema = propsSchema;
Image.settings = settings;
