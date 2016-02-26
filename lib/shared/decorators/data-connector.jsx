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
        this.state = {
          loading: true
        };
      }

      childFetchData (data) {
        const {fetchData} = this.context;

        if (fetchData) {
          fetchData(data).then(() => {
            this.setState({
              loading: false
            });
          });

        }
      }

      render () {
        return <WrappedComponent {...this.props} fetchData={this.childFetchDataBind} loading={this.state.loading} />;
      }
    }

    return hoistStatics(ConnectData, WrappedComponent);
  };
}
