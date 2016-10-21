export function getBorderValue ({size, color}) {
  return {
    top: {
      style: 'solid',
      width: size,
      color: {
        value: color,
        opacity: 100
      }
    },
    left: {
      style: 'solid',
      width: size,
      color: {
        value: color,
        opacity: 100
      }
    },
    right: {
      style: 'solid',
      width: size,
      color: {
        value: color,
        opacity: 100
      }
    },
    bottom: {
      style: 'solid',
      width: size,
      color: {
        value: color,
        opacity: 100
      }
    },
    equal: true
  };
}

export function getZeroedMarginPadding () {
  return {
    'padding-top': '0px',
    'padding-right': '0px',
    'padding-bottom': '0px',
    'padding-left': '0px',
    'margin-top': '0px',
    'margin-right': '0px',
    'margin-bottom': '0px',
    'margin-left': '0px'
  };
}

function getQuadruplet (prefix, value) {
  const values = value.split(' ');
  let result;

  if (values.length === 1) {
    result = {
      [`${prefix}top`]: value,
      [`${prefix}right`]: value,
      [`${prefix}bottom`]: value,
      [`${prefix}left`]: value
    };
  } else if (values.length === 2) {
    result = {
      [`${prefix}top`]: values[0],
      [`${prefix}right`]: values[1],
      [`${prefix}bottom`]: values[0],
      [`${prefix}left`]: values[1]
    };
  } else if (values.length === 4) {
    result = {
      [`${prefix}top`]: values[0],
      [`${prefix}right`]: values[1],
      [`${prefix}bottom`]: values[2],
      [`${prefix}left`]: values[3]
    };
  } else {
    result = {};
  }

  return result;
}

export function getMarginPadding (padding, margin) {
  return {
    ...getQuadruplet('padding-', padding),
    ...getQuadruplet('margin-', margin)
  };
}
