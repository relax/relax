import traverseChildren from './children';

/**
 * Traverses a relax elements tree
 *
 * @param   {Function} callback
 * @param   {Object} settings
 *  - doc
 *  - template
 *  - display
 * @returns  {ReactNode} rendered
 */
export default (settings, callback) => {
  const {template, doc, editing, type} = settings;
  let result;

  const isTemplate = !!template;
  const data = isTemplate ? template.data : doc.data;
  const context = isTemplate ?
    {doc: 'template', property: 'data'} :
    {doc: 'draft', property: 'data'}
  ;
  const links = isTemplate && template.links && template.links[type];

  if (data && data.body && data.body.children) {
    result = traverseChildren({
      children: data.body.children,
      context,
      links,
      data,
      editable: editing && !isTemplate,
      entry: doc,
      isTemplate
    }, settings, callback);
  }

  return result;
};
