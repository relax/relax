import DraftModel from '../../../models/draft';
import RevisionModel from '../../../models/revision';
import TabModel from '../../../models/tab';

/**
 * Cleans a collection relative instances
 */
export default (type) => Promise.all([
  TabModel.find({
    type
  }).remove(),
  RevisionModel.find({
    type
  }).remove(),
  DraftModel.find({
    type
  }).remove()
]);
