import PageModel from '../models/page';
import TemplateModel from '../models/template';

export default (type) => {
  switch (type) {
    case 'page':
      return PageModel;
    case 'template':
      return TemplateModel;
    default:
      return PageModel;
  }
};
