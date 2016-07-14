export default (selectedElement, data) => {
  const result = [];
  let current = selectedElement;

  while (current.parent) {
    current = data[current.parent];
    result.unshift(current);
  }

  return result;
};
