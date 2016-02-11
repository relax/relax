import * as adminActions from 'actions/admin';

import hoistStatics from 'hoist-non-react-statics';
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {mergeFragments, buildQueryAndVariables} from 'relax-fragments';

export default function dataConnect () {
  return function wrapWithDataConnect (WrappedComponent) {
    class ConnectData extends Component {
      static contextTypes = {
        fetchData: PropTypes.func,
        store: PropTypes.any.isRequired
      };

      static childContextTypes = {
        fetchData: PropTypes.func.isRequired
      };

      constructor (props, context) {
        super(props, context);
        this.fetchDataBind = ::this.fetchData;
        this.childFetchDataBind = ::this.childFetchData;
      }

      getChildContext () {
        return {
          fetchData: this.childFetchDataBind
        };
      }

      componentDidMount () {
        if (this.bundle) {
          this.fetchData(this.bundle);
        }
      }

      childFetchData ({fragments, variables}) {
        this.bundle = {
          fragments: mergeFragments(this.bundle.fragments || {}, fragments || {}),
          variables: Object.assign(this.bundle.variables || {}, variables || {})
        };
        // dispatch action to save bundle
      }

      fetchData (bundle) {
        if (this.context.fetchData) {
          this.context.fetchData(bundle);
        } else {
          const { dispatch } = this.context.store;
          const actions = bindActionCreators(adminActions, dispatch);
          actions.getAdmin(buildQueryAndVariables(bundle.fragments, bundle.variables));
        }
      }

      render () {
        this.bundle = false;
        return <WrappedComponent {...this.props} fetchData={this.childFetchDataBind} />;
      }
    }

    return hoistStatics(ConnectData, WrappedComponent);
  };
}
