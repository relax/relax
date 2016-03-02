import * as adminActions from 'actions/graphql';

import forEach from 'lodash.foreach';
import hoistStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import warning from 'warning';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

var ID = 0;

export default function dataConnect (getReduxState, getReduxDispatches, _getBundle) {
  // let not defining redux functions
  let getBundle = _getBundle;
  if (arguments.length === 1) {
    getBundle = getReduxState;
  }

  return function wrapWithDataConnect (WrappedComponent) {
    @connect(
      (state, props) => {
        return Object.assign(getReduxState && getReduxState(state, props) || {}, {
          graphql: state.graphql
        });
      },
      (dispatch) => {
        return Object.assign(getReduxDispatches && getReduxDispatches(dispatch) || {}, {
          removeConnector: dispatch(adminActions.removeConnector)
        });
      }
    )
    class ConnectData extends Component {
      static propTypes = {
        graphql: PropTypes.object.isRequired
      };

      static contextTypes = {
        fetchData: PropTypes.func.isRequired,
        store: PropTypes.any.isRequired
      };

      constructor (props, context) {
        super(props, context);

        warning(getBundle, `Relent: Data connector data info not configured in ${WrappedComponent.displayName || 'a component'}, use Redux connect instead!`);

        const initialBundle = getBundle && getBundle(this.props);

        // Relent connector info
        this.ID = 'connector_' + ID++;
        this.variablesTypes = initialBundle && initialBundle.variablesTypes || {};
        this.relent = {
          setVariables: ::this.setVariables,
          variables: initialBundle && initialBundle.initialVariables
        };

        // Fetch data
        initialBundle && this.fetchData({
          fragments: initialBundle.fragments,
          variables: initialBundle.initialVariables,
          mutations: initialBundle.mutations
        });

        // Set initial state
        this.state = {
          loading: true
        };
      }

      shouldComponentUpdate (nextProps) {
        const keysA = Object.keys(this.props);
        const keysB = Object.keys(nextProps);

        if (keysA.length !== keysB.length) {
          return true;
        }

        const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps);
        let result = false;

        // TODO: Improve this loop
        forEach(keysA, (key) => {
          if (!bHasOwnProperty(key)) {
            result = true;
            return false;
          } else if (this.props[key] !== nextProps[key]) {
            if (key === 'graphql') {
              const prevGraphql = this.props.graphql;
              const nextGraphql = nextProps.graphql;
              const nextConnectorMap = nextGraphql[this.ID];

              // Connector data map chaged
              if (prevGraphql[this.ID] !== nextConnectorMap) {
                result = true;
                return false;
              }

              // check each one
              let resultSearch = false;
              forEach(nextConnectorMap, (data, queryName) => {
                if (data.constructor === Array) {
                  let resultIt = false;
                  forEach(data, (dataEntry) => {
                    if (prevGraphql[dataEntry] !== nextGraphql[dataEntry]) {
                      resultIt = true;
                      return false;
                    }
                  });
                  if (resultIt) {
                    resultSearch = true;
                    return false;
                  }
                } else {
                  if (prevGraphql[data] !== nextGraphql[data]) {
                    resultSearch = true;
                    return false;
                  }
                }
              });

              // some entry changed
              if (resultSearch) {
                result = true;
                return false;
              }
            } else {
              result = true;
              return false;
            }
          }
        });

        return result;
      }

      componentWillUnmount () {
        this.context.store.dispatch(adminActions.removeConnector(this.ID));
      }

      setVariables (variables) {
        const bundle = getBundle && getBundle(this.props);
        this.relent.variables = variables;

        // Fetch data
        bundle && this.fetchData({
          fragments: bundle.fragments,
          variables: variables,
          mutations: bundle.mutations
        });
      }

      getVariables (variables) {
        const resultVariables = {};
        if (variables) {
          forEach(variables, (vars, queryName) => {
            resultVariables[queryName] = {};
            const queryVariablesTypes = this.variablesTypes[queryName];

            // No variables types defined for this query
            invariant(queryVariablesTypes, `Relent Error: Query to ${queryName} doesn't have variables types defined in ${WrappedComponent.displayName || 'a component'}!`);

            // Check if every variable has a type
            forEach(vars, (value, variable) => {
              invariant(queryVariablesTypes[variable], `Relent Error: Query to ${queryName} doesn't have variable '${variable}' type defined in ${WrappedComponent.displayName || 'a component'}!`);

              // add variable prepared for query e.g. {type: 'String', value: 'something'}
              resultVariables[queryName][variable] = {
                type: queryVariablesTypes[variable],
                value
              };
            });

            // Check if every required variable type is met
            forEach(queryVariablesTypes, (type, variable) => {
              invariant(type.slice(-1) !== '!' || vars[variable], `Relent Error: Query to ${queryName} requires the variable '${variable}' in ${WrappedComponent.displayName || 'a component'}!`);
            });
          });
        }
        return resultVariables;
      }

      fetchData ({fragments, variables, mutations}) {
        const {fetchData} = this.context;

        if (fetchData) {
          fetchData({
            fragments,
            variables: this.getVariables(variables),
            ID: this.ID,
            mutations
          })
            .then(() => {
              this.setState({
                loading: false
              });
            });
        }
      }

      render () {
        // get data needed from store
        // check what data it is
        const {graphql} = this.props;
        const dataNeeds = graphql[this.ID];

        // dataNeeds has e.g.
        // {
        //   pages: [id, id1, id2],
        //   page: id3
        // }
        const dataToInject = {};
        if (dataNeeds) {
          forEach(dataNeeds, (data, queryName) => {
            if (data.constructor === Array) {
              dataToInject[queryName] = [];
              forEach(data, (id) => {
                const node = graphql[id];
                if (node) {
                  dataToInject[queryName].push(node);
                }
              });
            } else {
              dataToInject[queryName] = graphql[data];
            }
          });
        }

        return <WrappedComponent {...this.props} {...dataToInject} relent={this.relent} loading={this.state.loading} />;
      }
    }

    return hoistStatics(ConnectData, WrappedComponent);
  };
}
