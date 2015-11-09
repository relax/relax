import authorize from '../../authorize';
import countType from '../../types/count';
import SchemaEntryModel from '../../../models/schema-entry';

export default (type, schema) => {
  return {
    type: countType,
    args: {},
    async resolve (root, params, options) {
      authorize(root);

      const Model = SchemaEntryModel(schema);

      const count = await Model.count({}).exec();
      return {count};
    }
  };
};
