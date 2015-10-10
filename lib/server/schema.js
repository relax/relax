import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import clone from 'lodash.clone';
import forEach from 'lodash.foreach';

import queries from './graphql/queries';
import mutations from './graphql/mutations';

class SchemaManager {
  constructor () {
    this.queryFields = this.prepareQueryFields();
    this.mutationFields = this.prepareMutationFields();
    this.createRoot();
  }

  prepareQueryFields () {
    return clone(queries);
  }

  prepareMutationFields () {
    return clone(mutations);
  }

  createRoot () {
    this.RootQuery = new GraphQLObjectType({
      name: 'Query',
      fields: () => (this.queryFields)
    });
    this.RootMutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => (this.mutationFields)
    });
  }

  getSchema () {
    return new GraphQLSchema({
      query: this.RootQuery/*,
      mutation: this.RootMutation*/
    });
  }
}

export default new SchemaManager();
