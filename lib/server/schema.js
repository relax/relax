import clone from 'lodash.clone';
import forEach from 'lodash.foreach';
import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import mutations from './graphql/mutations';
import queries from './graphql/queries';
import SchemaModel from './models/schema';

// import schemaEntryInputType from './graphql/types/generators/schema-entry-input';
// import schemaEntryType from './graphql/types/generators/schema-entry';
// import schemaListCountQuery from './graphql/queries/generators/schema-list-count';
// import schemaListQuery from './graphql/queries/generators/schema-list';

class SchemaManager {
  constructor () {
    this.init();
  }

  async init () {
    this.queryFields = clone(queries);
    this.mutationFields = clone(mutations);

    const schemas = await SchemaModel.find().exec();
    forEach(schemas, (schema) => {
      this.processSchema(schema);
    });

    this.createRoot();
  }

  processSchema (/* schema */) {
    // const type = schemaEntryType(schema);
    // const inputType = schemaEntryInputType(schema);
    //
    // const schemaQueries = {
    //   ['rlx_' + schema.slug]: schemaListQuery(type, schema),
    //   ['rlx_' + schema.slug + '_count']: schemaListCountQuery(type, schema)
    // };
    //
    // // TODO create mutations
    //
    // Object.assign(this.queryFields, schemaQueries);
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
