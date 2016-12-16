const elements = {};

if (process.env.NODE_ENV !== 'test') {
  const requireContext = require.context('.', true, /^\.\/[a-z\-]+?\/index\.(js|jsx)$/);

  requireContext.keys().forEach((path) => {
    const splitted = path.split('/');
    const name = splitted[1]
      .replace('custom-', '')
      .replace('-', ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(' ', '');

    elements[name] = requireContext(path).default;
  });
} else {
  const TextBox = require('./text-box');
  const DynamicList = require('./dynamic-list');

  elements.TextBox = TextBox.default;
  elements.DynamicList = DynamicList.default;
}

export default elements;
