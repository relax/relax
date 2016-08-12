import addSchemaEntry from './add';
import removeSchemaEntry from './remove';
import restoreSchemaEntry from './restore';
import {updateTitle, updateSlug, updateState, updateTemplate} from './update';

export default {
  addSchemaEntry,
  removeSchemaEntry,
  restoreSchemaEntry,
  updateSchemaEntryTitle: updateTitle,
  updateSchemaEntrySlug: updateSlug,
  updateSchemaEntryState: updateState,
  updateSchemaEntryTemplate: updateTemplate
};
