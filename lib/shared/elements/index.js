const elements = {};

function sanatizeElementName (name) {
  return name
    .replace('relax-element-', '')
    .replace('custom-', '')
    .replace('-', ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(' ', '');
}

function loadElement (context, path) {
  const splitted = path.split('/');
  const name = sanatizeElementName(splitted[1]);
  const Element = context(path);
  elements[name] = Element.default || Element;
}

const requireContext = require.context('.', true, /^\.\/[a-z\-]+?\/index\.(js|jsx)$/);
requireContext.keys().forEach((path) => loadElement(requireContext, path));

const nodeModulesRequireContext = require.context('../../../node_modules', true,
  /^.*relax-element-.+\/index\.(js|jsx)$/);
nodeModulesRequireContext.keys().forEach((path) => loadElement(nodeModulesRequireContext, path));

const addonsRequireContext = require.context('../../../addons/node_modules', true,
  /^.*relax-element-.+\/index\.(js|jsx)$/);
addonsRequireContext.keys().forEach((path) => loadElement(addonsRequireContext, path));

export default elements;
