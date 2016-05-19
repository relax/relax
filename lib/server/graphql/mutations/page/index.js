import addPage from './add';
import duplicatePage from './duplicate';
import removePage from './remove';
import {updateTitle, updateSlug, updateState} from './update';

export default {
  addPage,
  duplicatePage,
  removePage,
  updatePageTitle: updateTitle,
  updatePageSlug: updateSlug,
  updatePageState: updateState
};
