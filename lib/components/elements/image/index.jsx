import React from 'react';
import Component from '../../component';
import Element from '../../element';
import MediaImage from '../../image';
import Utils from '../../../utils';
import Colors from '../../../colors';

import settings from './settings';
import propsSchema from './props-schema';

export default class Image extends Component {
  getInitialState () {
    return {
      mounted: false
    };
  }

  componentDidMount () {
    var dom = React.findDOMNode(this);
    var rect = dom.getBoundingClientRect();

    var width = Math.round(rect.right-rect.left);

    this.setState({
      mounted: true,
      width
    });
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
      <Element tag='div' style={style} element={this.props.element} settings={this.constructor.settings}>
        {this.state.mounted ? <MediaImage id={this.props.image} width={this.state.width} style={imageStyle} /> : null}
      </Element>
    );
  }
}

Image.propTypes = {
  color: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  height_px: React.PropTypes.number,
  vertical: React.PropTypes.number
};

Image.defaultProps = {
  color: {
    value: '#ffffff',
    opacity: 0
  },
  height: 'auto',
  height_px: 200,
  vertical: 50,
  width: 'full',
  width_px: 300,
  horizontal: 'center'
};

Image.propsSchema = propsSchema;
Image.settings = settings;
