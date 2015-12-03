import find from 'lodash.find';
import Colr from 'colr';

var colorsCollection = [];

export function updateColors (colors) {
  colorsCollection = colors;
}

export function hexIsValid (value) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
}

export function getColor (colorObj, colors = colorsCollection) {
  let result = {
    colr: Colr().fromHex('#000000'),
    opacity: 100,
    label: 'Custom'
  };
  if (typeof colorObj === 'object') {
    let hex = '#000000';
    let label = 'Custom';
    const opacity = colorObj.opacity;

    if (colorObj.type === 'palette') {
      const color = find(colors, (clr) => {
        return String(clr._id) === colorObj.value;
      });

      if (typeof color !== 'undefined') {
        hex = color.value;
        label = color.label;
      }
    } else {
      const isOk  = hexIsValid(colorObj.value);
      hex = isOk ? colorObj.value : '#000000';
    }

    result = {
      colr: Colr().fromHex(hex),
      opacity,
      label
    };
  }
  return result;
}

export function getColorString (colorObj, colors = colorsCollection) {
  let result = '#000000';
  const color = (colorObj && colorObj.colr) ? colorObj : getColor(colorObj, colors);
  if (color) {
    if (color.opacity === 100) {
      result = color.colr.toHex();
    } else {
      const rgb = color.colr.toRgbObject();
      result = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${color.opacity / 100})`;
    }
  }
  return result;
}
