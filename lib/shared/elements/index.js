const requireContext = require.context('.', true, /^\.\/[a-z\-]+?\/index\.(js|jsx)$/);
const elements = {};

requireContext.keys().forEach((path) => {
  const splitted = path.split('/');
  const name = splitted[1]
    .replace('custom-', '')
    .replace('-', ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(' ', '');

  elements[name] = requireContext(path).default;
});

export default elements;
