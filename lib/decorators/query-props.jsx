import forEach from 'lodash.foreach';
import hoistStatics from 'hoist-non-react-statics';
import {Component} from 'relax-framework';
import React, {PropTypes} from 'react';

export default function wrapWithQueryProps (WrappedComponent) {
  class QueryProps extends Component {
    static propTypes = {
      query: PropTypes.object
    }

    getInitialState (props = this.props) {
      const queryVariables = {};

      if (props.query) {
        if (props.query.sort) {
          queryVariables.sort = {
            value: props.query.sort,
            type: 'String'
          };
        }
        if (props.query.order) {
          queryVariables.order = {
            value: props.query.order,
            type: 'String'
          };
        }
        if (props.query.limit) {
          queryVariables.limit = {
            value: props.query.limit,
            type: 'Int'
          };
        }
        if (props.query.page) {
          queryVariables.page = {
            value: props.query.page,
            type: 'Int'
          };
        }
      }

      return {
        queryVariables
      };
    }

    componentWillReceiveProps (nextProps) {
      const nextState = {};

      if (this.hasQueryChanged(nextProps.query)) {
        nextState.hasQueryChanged = true;
        Object.assign(nextState, this.getInitialState(nextProps));
      } else {
        nextState.hasQueryChanged = false;
      }

      this.setState(nextState);
    }

    hasQueryChanged (newQuery) {
      const currentQuery = this.props.query;
      let changed = !newQuery && currentQuery || newQuery && !currentQuery;

      if (!changed && newQuery) {
        forEach(newQuery, (value, key) => {
          if (!currentQuery[key] || currentQuery[key] !== value) {
            changed = true;
          }
        });
      }
      if (!changed && currentQuery) {
        forEach(currentQuery, (value, key) => {
          if (!newQuery[key] || newQuery[key] !== value) {
            changed = true;
          }
        });
      }
      return changed;
    }

    render () {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return hoistStatics(QueryProps, WrappedComponent);
}
