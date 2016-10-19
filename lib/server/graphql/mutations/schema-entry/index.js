import {update, updateSlug, updateState, updateTemplate, updateTitle} from './update';

import addSchemaEntry from './add';
import removeSchemaEntry from './remove';
import restoreSchemaEntry from './restore';

export default {
  addSchemaEntry,
  removeSchemaEntry,
  restoreSchemaEntry,
  updateSchemaEntryTitle: updateTitle,
  updateSchemaEntrySlug: updateSlug,
  updateSchemaEntryState: updateState,
  updateSchemaEntryTemplate: updateTemplate,
  updateSchemaEntry: update
};
