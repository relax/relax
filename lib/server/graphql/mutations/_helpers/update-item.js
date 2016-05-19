import getModelFromType from '../../get-model-from-type';
import RevisionModel from '../../../models/revision';

// Create revision async function
async function createRevision ({item, type}) {
  const revision = new RevisionModel({
    itemId: item._id,
    version: item.__v,
    date: item.updatedDate,
    user: item.updatedBy,
    type,
    doc: item
  });

  return await revision.save();
}

// Update page async function
export default async function updateItem ({id, type, changes, projection, userId}) {
  const Model = getModelFromType(type);
  const currentItem = await Model.findById(id);
  const revision = await createRevision({item: currentItem, type});

  if (!revision) {
    throw new Error(`Error updating ${type}`);
  }

  const updateData = Object.assign(
    {},
    changes,
    {
      __v: currentItem.__v + 1,
      updatedDate: new Date(),
      updatedBy: userId
    }
  );

  const item = await Model
    .findByIdAndUpdate(
      id,
      updateData,
      {upsert: true, new: true}
    )
    .select(projection);

  if (!item) {
    throw new Error(`Error updating ${type}`);
  }

  return {
    item,
    revision
  };
}
