import {mutation} from 'relate-js';

export function updateColor (data) {
  return mutation({
    fragments: {
      updateColor: {
        _id: 1,
        label: 1,
        value: 1
      }
    },
    variables: {
      updateColor: {
        data: {
          value: data,
          type: 'ColorInput!'
        }
      }
    }
  });
}

export function addColor (data) {
  return mutation({
    fragments: {
      addColor: {
        _id: 1,
        label: 1,
        value: 1
      }
    },
    variables: {
      addColor: {
        data: {
          value: data,
          type: 'ColorInput!'
        }
      }
    }
  });
}

export function duplicateColor (id) {
  return mutation({
    fragments: {
      duplicateColor: {
        _id: 1,
        label: 1,
        value: 1
      }
    },
    variables: {
      duplicateColor: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    }
  });
}

export function removeColor (id) {
  return mutation({
    fragments: {
      removeColor: {
        _id: 1
      }
    },
    variables: {
      removeColor: {
        id: {
          value: id,
          type: 'ID!'
        }
      }
    },
    type: 'REMOVE'
  });
}
