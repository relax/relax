import Component from 'components/component';
import React from 'react';

import propsSchema from './props-schema';
import settings from './settings';
import style from './style';
import GoogleMapsContainer from './container';

export default class GoogleMapsElem extends Component {
  static defaultProps = {
    zoom: 0,
    lat: '0',
    lng: '0',
    scrollwheel: false,
    zoomControls: true,
    mapTypeControl: false,
    streetViewControl: true,
    useMarker: true
  };

  static propsSchema = propsSchema;
  static settings = settings;
  static style = style;

  render () {
    return (
      <GoogleMapsContainer {...this.props} />
    );
  }
}
