import * as adminActions from 'actions/admin';

import debounce from 'lodash.debounce';
import hoistStatics from 'hoist-non-react-statics';
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {mergeFragments, buildQueryAndVariables} from 'relax-fragments';

export default function rootDataConnect () {
  return function wrapWithDataConnect (WrappedComponent) {
    class RootConnectData extends Component {
      static contextTypes = {
        store: PropTypes.any.isRequired
      };

      static childContextTypes = {
        fetchData: PropTypes.func.isRequired
      };

      constructor (props, context) {
        super(props, context);
        this.bundle = {};
        this.childFetchDataBind = ::this.childFetchData;
        this.fetchDebounce = debounce(::this.fetchData, 10);
      }

      getChildContext () {
        return {
          fetchData: this.childFetchDataBind
        };
      }

      componentDidMount () {
        this.mounted = true;
        if (this.bundle) {
          this.fetchData();
        }
      }

      childFetchData ({fragments, variables}) {
        this.bundle = {
          fragments: mergeFragments(this.bundle.fragments || {}, fragments || {}),
          variables: Object.assign(this.bundle.variables || {}, variables || {})
        };
        this.mounted && this.fetchDebounce();
      }

      fetchData () {
        const { dispatch } = this.context.store;
        const actions = bindActionCreators(adminActions, dispatch);
        actions.getAdmin(buildQueryAndVariables(this.bundle.fragments, this.bundle.variables));
        this.bundle = {};
      }

      render () {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistStatics(RootConnectData, WrappedComponent);
  };
}
