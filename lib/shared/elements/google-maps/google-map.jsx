import Component from 'components/component';
import ElementCovered from 'components/element-covered';
import ElementNotFound from 'components/element-not-found';
import {hasClass, addClass, removeClass} from 'helpers/utils';
import React from 'react';
import PropTypes from 'prop-types';
import {GoogleMap, GoogleMapLoader, Marker} from 'react-google-maps';

import settings from './settings';

export default class GoogleMapElement extends Component {
  static propTypes = {
    zoom: PropTypes.number.isRequired,
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    scrollwheel: PropTypes.bool.isRequired,
    zoomControls: PropTypes.bool.isRequired,
    mapTypeControl: PropTypes.bool.isRequired,
    streetViewControl: PropTypes.bool.isRequired,
    useMarker: PropTypes.bool.isRequired,
    relax: PropTypes.object.isRequired,
    googleAPI: PropTypes.string,
    loading: PropTypes.bool,
    styleClassMap: PropTypes.object.isRequired,
    Element: PropTypes.func.isRequired
  };

  getInitState () {
    return {
      ready: this.loadAPI(this.props)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.googleAPI !== nextProps.googleAPI) {
      this.setState({
        ready: this.loadAPI(nextProps)
      });
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.relax.editing && this.state.ready && prevProps.height !== this.props.height && this._map) {
      window.google.maps.event.trigger(this._map, 'resize');
    }
  }

  loadAPI (props) {
    const {googleAPI} = props;
    let result = false;

    if (googleAPI) {
      result = this.loadReadyAPI(googleAPI);
    }

    return result;
  }

  loadReadyAPI (googleAPI) {
    let result = false;

    if (typeof document !== 'undefined') {
      if (!hasClass(document.body, 'googleMapsInitiated') &&
          !hasClass(document.body, 'googleMapsLoading')) {
        addClass(document.body, 'googleMapsLoading');

        window.googleMapsInitiated = () => {
          removeClass(document.body, 'googleMapsLoading');
          addClass(document.body, 'googleMapsInitiated');
          window.dispatchEvent(new Event('googleMapsInitiated'));
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=${googleAPI}&callback=googleMapsInitiated`;
        document.body.appendChild(script);

        window.addEventListener('googleMapsInitiated', ::this.onReady);
      } else if (!hasClass(document.body, 'googleMapsInitiated')) {
        window.addEventListener('googleMapsInitiated', ::this.onReady);
      } else {
        result = true;
      }
    }

    return result;
  }

  onReady () {
    this.setState({
      ready: true
    });
  }

  render () {
    const {relax, styleClassMap, Element} = this.props;

    return (
      <Element
        {...relax}
        htmlTag='div'
        settings={settings}
        className={styleClassMap.root}
      >
        {this.renderContent()}
      </Element>
    );
  }

  renderContent () {
    const {relax, loading, googleAPI} = this.props;
    let result;

    if (!loading) {
      if (!googleAPI) {
        result = this.renderMissingConf();
      } else if (relax.editing) {
        result = this.renderEditing();
      } else {
        result = this.renderMap();
      }
    }

    return result;
  }

  renderMissingConf () {
    const {relax} = this.props;

    if (relax.editing) {
      return (
        <ElementNotFound>
          You still haven't configured your google API ID!
          Go to settings->Google API.
        </ElementNotFound>
      );
    }
  }

  renderEditing () {
    return (
      <ElementCovered>
        {this.renderMap()}
      </ElementCovered>
    );
  }

  renderMap () {
    if (this.state.ready) {
      const {
        zoom,
        scrollwheel,
        zoomControls,
        streetViewControl,
        mapTypeControl,
        lat,
        lng,
        styleClassMap,
        relax
      } = this.props;

      const key =
        zoom + scrollwheel + zoomControls + streetViewControl +
        mapTypeControl + lat + lng + relax.styleValues.height;

      return (
        <GoogleMapLoader
          key={key}
          containerElement={
            <div className={styleClassMap.holder} />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => {this._map = map;}}
              containerProps={{
                className: styleClassMap.holder
              }}
              googleMapsApi={window.google.maps}
              options={{
                scrollwheel: this.props.scrollwheel,
                zoomControl: this.props.zoomControls,
                streetViewControl: this.props.streetViewControl,
                mapTypeControl: this.props.mapTypeControl
              }}
              zoom={parseFloat(this.props.zoom, 10)}
              center={{lat: parseFloat(this.props.lat, 10), lng: parseFloat(this.props.lng, 10)}}
            >
              {this.renderMarker()}
            </GoogleMap>
          }
        />
      );
    }
  }

  renderMarker () {
    const {useMarker, lat, lng} = this.props;

    if (useMarker) {
      const position = {
        lat: parseFloat(lat, 10),
        lng: parseFloat(lng, 10)
      };

      return (
        <Marker position={position} key={lat + lng} />
      );
    }
  }
}
