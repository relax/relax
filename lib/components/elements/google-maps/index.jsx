import React from 'react';
import Component from '../../component';
import Element from '../../element';
import {GoogleMap, Marker} from 'react-google-maps';
import Utils from '../../../utils';

import settings from './settings';
import propsSchema from './props-schema';

export default class GoogleMapsElem extends Component {

  getInitialState () {
    return {
      ready: this.loadAPI()
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.context.editing && this.props.selected ||
      nextState.ready !== this.state.ready
    );
  }

  componentDidUpdate (prevProps) {
    if (this.context.editing && this.state.ready && prevProps.height !== this.props.height) {
      if (this.refs.map && this.refs.map.state && this.refs.map.state.instance) {
        window.google.maps.event.trigger(this.refs.map.state.instance, 'resize');
      }
    }
  }

  loadAPI () {
    if (typeof document !== 'undefined') {
      if (!Utils.hasClass(document.body, 'googleMapsInitiated') && !Utils.hasClass(document.body, 'googleMapsLoading')) {
        Utils.addClass(document.body, 'googleMapsLoading');

        window.googleMapsInitiated = function () {
          Utils.removeClass(document.body, 'googleMapsLoading');
          Utils.addClass(document.body, 'googleMapsInitiated');
          /* jshint ignore:start */
          window.dispatchEvent(new Event('googleMapsInitiated'));
          /* jshint ignore:end */
        };

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=googleMapsInitiated';
        document.body.appendChild(script);

        window.addEventListener('googleMapsInitiated', this.onReady.bind(this));

        return false;
      } else if (!Utils.hasClass(document.body, 'googleMapsInitiated')) {
        window.addEventListener('googleMapsInitiated', this.onReady.bind(this));
        return false;
      } else {
        return true;
      }
    }
  }

  onReady () {
    this.setState({
      ready: true
    });
  }

  renderMarker () {
    if (this.props.useMarker) {
      var position = {
        lat: parseFloat(this.props.lat, 10),
        lng: parseFloat(this.props.lng, 10)
      };
      return (
        <Marker position={position} />
      );
    }
  }

  renderMap () {
    if (this.state.ready) {
      var gmap = (
        <GoogleMap
          ref="map"
          containerProps={{
            style: {
              height: this.props.height
            }
          }}
          googleMapsApi={window.google.maps}
          zoom={this.props.zoom}
          scrollwheel={this.props.scrollwheel}
          zoomControl={this.props.zoomControls}
          streetViewControl={this.props.streetViewControl}
          mapTypeControl={this.props.mapTypeControl}
          panControl={this.props.panControl}
          center={{lat: parseFloat(this.props.lat, 10), lng: parseFloat(this.props.lng, 10)}}
        >{this.renderMarker()}</GoogleMap>
      );

      if (this.context.editing) {
        return (
          <div className='editing-wrapper'>
            {gmap}
            <div className='editing-cover'></div>
          </div>
        );
      } else {
        return gmap;
      }
    }
  }

  render () {
    return (
      <Element tag='div' settings={this.constructor.settings} element={this.props.element}>
        {this.renderMap()}
      </Element>
    );
  }
}

GoogleMapsElem.contextTypes = {
  editing: React.PropTypes.bool.isRequired
};

GoogleMapsElem.propTypes = {
  zoom: React.PropTypes.number.isRequired,
  lat: React.PropTypes.string.isRequired,
  lng: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  scrollwheel: React.PropTypes.bool.isRequired,
  panControl: React.PropTypes.bool.isRequired,
  zoomControls: React.PropTypes.bool.isRequired,
  mapTypeControl: React.PropTypes.bool.isRequired,
  streetViewControl: React.PropTypes.bool.isRequired,
  useMarker: React.PropTypes.bool.isRequired
};

GoogleMapsElem.defaultProps = {
  zoom: 15,
  lat: '41.1761671',
  lng: '-8.601692',
  height: 250,
  scrollwheel: false,
  panControl: false,
  zoomControls: true,
  mapTypeControl: false,
  streetViewControl: true,
  useMarker: true
};

GoogleMapsElem.propsSchema = propsSchema;
GoogleMapsElem.settings = settings;
