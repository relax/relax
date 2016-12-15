import hoistStatics from 'hoist-non-react-statics';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

/**
 * Relax Elements Decorator
 *
 */
export default function dataConnect (...args) {

  return function wrapWithDataConnect (WrappedElement) {

    @connect(
      (state) => {
        var result = {};

        // element
        

        return result;
      }
    )
    class ConnectData extends Component {
      static propTypes = {
        id: PropTypes.string.isRequired,
        context: PropTypes.string.isRequired
      };

      constructor (props, context) {
        super(props, context);

        // for debugging
        this.constructor.displayName = WrappedElement.name;
      }

      render () {
        return (
          <WrappedElement />
        );
      }
    }

    return hoistStatics(ConnectData, WrappedElement);
  };
}
