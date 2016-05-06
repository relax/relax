import addPage from './add';
import duplicatePage from './duplicate';
import removePage from './remove';
import restorePage from './restore';
import updatePage, {updateTitle, updateSlug} from './update';

export default {
  addPage,
  duplicatePage,
  removePage,
  restorePage,
  updatePage,
  updatePageTitle: updateTitle,
  updatePageSlug: updateSlug
};
