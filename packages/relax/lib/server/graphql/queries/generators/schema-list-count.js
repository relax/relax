import authorize from '../../authorize';
import countType from '../../types/count';
import schemaEntryModel from '../../../models/schema-entry';

export default (type, schema) => ({
  type: countType,
  args: {},
  async resolve (root) {
    authorize(root);

    const Model = schemaEntryModel(schema);

    const count = await Model.count({}).exec();
    return {count};
  }
});
