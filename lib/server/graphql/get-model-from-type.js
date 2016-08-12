import getSchemaEntryModel from '../models/schema-entry';
import PageModel from '../models/page';
import TemplateModel from '../models/template';

export default async (type) => {
  switch (type) {
    case 'page':
      return PageModel;
    case 'template':
      return TemplateModel;
    default:
      return await getSchemaEntryModel(type);
  }
};
