import * as adminActions from 'actions/graphql';

import debounce from 'lodash.debounce';
import hoistStatics from 'hoist-non-react-statics';
import Q from 'q';
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

      childFetchData ({fragments, variables, ID, mutations}) {
        // TODO check if same query with different variables (will need to batch more than one fetch)

        this.bundle = {
          fragments: mergeFragments(this.bundle.fragments || {}, fragments || {}),
          variables: Object.assign(this.bundle.variables || {}, variables || {}),
          connectors: Object.assign(this.bundle.connectors || {}, {
            [ID]: {fragments, mutations}
          })
        };

        this.mounted && this.fetchDebounce();
        this.deferred = this.deferred || Q.defer();

        return this.deferred.promise;
      }

      fetchData () {
        const { dispatch } = this.context.store;
        const actions = bindActionCreators(adminActions, dispatch);
        actions
          .graphql(buildQueryAndVariables(this.bundle.fragments, this.bundle.variables), this.bundle.connectors)
          .then(() => {
            this.deferred.resolve();
            this.deferred = null;
          });
        this.bundle = {};
      }

      render () {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistStatics(RootConnectData, WrappedComponent);
  };
}
