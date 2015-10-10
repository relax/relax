import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import clone from 'lodash.clone';
import queries from './graphql/queries';
import mutations from './graphql/mutations';

class SchemaManager {
  constructor () {
    this.queryFields = this.initQueryFields();
    this.mutationFields = this.initMutationFields();
    this.createRoot();
  }

  initQueryFields () {
    return clone(queries);
  }

  initMutationFields () {
    return clone(mutations);
  }

  createRoot () {
    this.rootQuery = new GraphQLObjectType({
      name: 'Query',
      fields: () => (this.queryFields)
    });
    this.rootMutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: () => (this.mutationFields)
    });
  }

  getSchema () {
    const schema = {
      query: this.rootQuery
    };

    if (Object.keys(this.mutationFields).length) {
      schema.mutation = this.rootMutation;
    }

    return new GraphQLSchema(schema);
  }
}

export default new SchemaManager();
