import PageModel from '../../../../models/page';
import RevisionModel from '../../../../models/revision';

// Create revision async function
async function createRevision (page) {
  const revision = new RevisionModel({
    itemId: page._id,
    version: page.__v,
    date: page.updatedDate,
    user: page.updatedBy,
    doc: page
  });

  return await revision.save();
}

// Update page async function
export default async function updatePage (id, changes, projection, userId) {
  const currentPage = await PageModel.findById(id);
  const revision = await createRevision(currentPage);

  if (!revision) {
    throw new Error('Error updating page');
  }

  const pageChanges = Object.assign(
    {},
    changes,
    {
      __v: currentPage.__v + 1,
      updatedDate: new Date(),
      updatedBy: userId
    }
  );

  const page = await PageModel
    .findByIdAndUpdate(
      id,
      pageChanges,
      {upsert: true, new: true}
    )
    .select(projection);

  if (!page) {
    throw new Error('Error updating page');
  }

  return {
    page,
    revision
  };
}
