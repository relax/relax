import graphql from 'graphql';
import forEach from 'lodash.foreach';
import models from './models';

class SchemaManager {
  constructor () {
    this.queryFields = {};
    this.mutationFields = {};

    // #TODO go through models to populate queryFields and mutationFields
    forEach(models, (model) => {

    });

    this.createRoot();
  }

  createRoot () {
    this.RootQuery = new graphql.GraphQLObjectType({
      name: 'Query',
      fields: () => (this.queryFields)
    });
    this.RootMutation = new graphql.GraphQLObjectType({
      name: 'Mutation',
      fields: () => (this.mutationFields)
    });
  }

  getSchema () {
    return new graphql.GraphQLSchema({
      query: this.RootQuery,
      mutation: this.RootMutation
    });
  }
}



export default new SchemaManager();
