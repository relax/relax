import forEach from 'lodash.foreach';
import hoistStatics from 'hoist-non-react-statics';
import qs from 'query-string';
import Component from 'components/component';
import React, {PropTypes} from 'react';

function sanatizeQueryObject (query) {
  if (query.limit) {
    query.limit = parseInt(query.limit, 10);
  }
  if (query.page) {
    query.page = parseInt(query.page, 10);
  }
  return query;
}

export function getQueryVariables (query) {
  const queryVariables = {};

  if (query.sort) {
    queryVariables.sort = {
      value: query.sort,
      type: 'String'
    };
  }
  if (query.order) {
    queryVariables.order = {
      value: query.order,
      type: 'String'
    };
  }
  if (query.limit) {
    queryVariables.limit = {
      value: query.limit,
      type: 'Int'
    };
  }
  if (query.filters) {
    queryVariables.filters = {
      value: query.filters,
      type: '[Filter]'
    };
  }
  if (query.page) {
    queryVariables.page = {
      value: query.page,
      type: 'Int'
    };
  }
  if (query.search && query.s) {
    queryVariables.search = {
      value: query.search,
      type: 'String'
    };
    queryVariables.s = {
      value: query.s,
      type: 'String'
    };
  }

  return queryVariables;
}

const _defaultQuery = {
  page: 1,
  limit: 10
};

export default function queryProps (defaultQuery = _defaultQuery) {
  return function wrapWithQueryProps (WrappedComponent) {
    class QueryProps extends Component {
      static propTypes = {
        query: PropTypes.object,
        location: PropTypes.object
      };

      getInitState (props = this.props) {
        if (!props.location.query) {
          props.location.query = qs.parse(props.location.search);
        }

        const query = sanatizeQueryObject(Object.assign(
          {},
          defaultQuery,
          props.location.query
        ));
        const queryVariables = getQueryVariables(query);

        return {
          queryVariables,
          query,
          hasQueryChanged: true
        };
      }

      componentWillReceiveProps (nextProps) {
        const nextState = {};

        if (!nextProps.location.query) {
          nextProps.location.query = qs.parse(nextProps.location.search);
        }

        const nextQuery = sanatizeQueryObject(Object.assign(
          {},
          defaultQuery,
          nextProps.location.query
        ));

        if (this.hasQueryChanged(nextQuery)) {
          nextState.hasQueryChanged = true;
          Object.assign(nextState, this.getInitState(nextProps));
        } else {
          nextState.hasQueryChanged = false;
        }

        this.setState(nextState);
      }

      static defaultQuery = defaultQuery;

      hasQueryChanged (newQuery) {
        const currentQuery = this.state.query;
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
  };
}
