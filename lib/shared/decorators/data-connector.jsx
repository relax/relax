import hoistStatics from 'hoist-non-react-statics';
import React, {Component, PropTypes} from 'react';

export default function dataConnect () {
  return function wrapWithDataConnect (WrappedComponent) {
    class ConnectData extends Component {
      static contextTypes = {
        fetchData: PropTypes.func.isRequired
      };

      constructor (props, context) {
        super(props, context);
        this.childFetchDataBind = ::this.childFetchData;
      }

      childFetchData (data) {
        this.context.fetchData && this.context.fetchData(data);
      }

      render () {
        return <WrappedComponent {...this.props} fetchData={this.childFetchDataBind} />;
      }
    }

    return hoistStatics(ConnectData, WrappedComponent);
  };
}
