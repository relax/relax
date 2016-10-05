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
