export default (elementId, targetId, data) => {
  let found = false;
  let current = data[elementId];

  while (!found && current.parent) {
    if (current.parent === targetId) {
      found = true;
    }
    current = data[current.parent];
  }

  return found;
};
