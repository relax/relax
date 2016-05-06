import addPage from './add';
import duplicatePage from './duplicate';
import removePage from './remove';
import restorePage from './restore';
import {updateTitle, updateSlug, updateFromDraft} from './update';

export default {
  addPage,
  duplicatePage,
  removePage,
  restorePage,
  updatePageFromDraft: updateFromDraft,
  updatePageTitle: updateTitle,
  updatePageSlug: updateSlug
};
