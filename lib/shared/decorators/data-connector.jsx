import * as adminActions from 'actions/graphql';

import forEach from 'lodash.foreach';
import hoistStatics from 'hoist-non-react-statics';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

var ID = 0;

export default function dataConnect () {
  return function wrapWithDataConnect (WrappedComponent) {
    @connect(
      (state) => ({
        graphql: state.graphql
      })
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
        this.childFetchDataBind = ::this.childFetchData;
        this.state = {
          loading: true
        };
        this.ID = 'connector_' + ID++;
      }

      shouldComponentUpdate (nextProps) {
        const keysA = Object.keys(this.props);
        const keysB = Object.keys(nextProps);

        if (keysA.length !== keysB.length) {
          return true;
        }

        const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps);
        let result = false;
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

      childFetchData (data) {
        const {fetchData} = this.context;

        if (fetchData) {
          fetchData(data, this.ID).then(() => {
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
        forEach(dataNeeds, (data, queryName) => {
          if (data.constructor === Array) {
            dataToInject[queryName] = [];
            forEach(data, (id) => {
              dataToInject[queryName].push(graphql[id]);
            });
          } else {
            dataToInject[queryName] = graphql[data];
          }
        });

        return <WrappedComponent {...this.props} {...dataToInject} fetchData={this.childFetchDataBind} loading={this.state.loading} />;
      }
    }

    return hoistStatics(ConnectData, WrappedComponent);
  };
}
