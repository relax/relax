import DraftModel from '../../../models/draft';
import RevisionModel from '../../../models/revision';
import TabModel from '../../../models/tab';

/**
 * Cleans a buildable model relative instances on remove
 */
export default (id) => Promise.all([
  TabModel.find({
    item: id
  }).remove(),
  RevisionModel.find({
    itemId: id
  }).remove(),
  DraftModel.find({
    itemId: id
  }).remove()
]);
