import colr from 'colr';
import find from 'lodash.find';
import forEach from 'lodash.foreach';
import sortBy from 'lodash.sortby';

let colorsCollection = [];

export function updateColors (colors) {
  colorsCollection = colors;
}

export function hexIsValid (value) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
}

export function getColor (colorObj, colors = colorsCollection) {
  let color = colr().fromHex('#000000');
  let opacity = 100;
  let label = '#000000';
  let type = 'hex';

  if (typeof colorObj === 'object') {
    opacity = typeof colorObj.opacity === 'number' ? colorObj.opacity : 100;
    type = colorObj.type;

    switch (colorObj.type) {
      case 'palette': {
        const colorFromPallete = find(colors, (clr) => (String(clr._id) === colorObj.value));
        if (colorFromPallete) {
          color = colr().fromHex(colorFromPallete.value);
          label = colorFromPallete.label;
        }
        break;
      }
      case 'hex':
        if (hexIsValid(colorObj.value)) {
          color = colr().fromHex(colorObj.value);
          label = colorObj.value;
        }
        break;
      case 'hsv':
        color = colr().fromHsvObject(colorObj.value);
        label = color.toHex();
        break;
      case 'rgb':
        color = colr().fromRgbObject(colorObj.value);
        label = color.toHex();
        break;
      default:
    }
  }

  return {
    colr: color,
    opacity,
    label,
    type
  };
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

export function applyBackground (style, colorObj, colors = colorsCollection) {
  if (colorObj && typeof colorObj === 'object' && colorObj.type) {
    if (colorObj.type !== 'linear' && colorObj.type !== 'radial') {
      style.backgroundColor = getColorString(colorObj, colors);
    } else if (colorObj.type === 'linear') {
      const orderedPoints = sortBy(colorObj.points, 'perc');
      const gradientColors = [];
      forEach(orderedPoints, (point) => {
        gradientColors.push(`${getColorString(point, colors)} ${point.perc}%`);
      });
      style.background = `linear-gradient(${90 - colorObj.angle}deg, ${gradientColors.toString()})`;
      // TODO missing other browsers
      // `-moz-linear-gradient(${colorObj.angle}deg, ${gradientColors.toString()})`,
      // `-webkit-linear-gradient(${colorObj.angle}deg, ${gradientColors.toString()})`,
      // `-o-linear-gradient(${colorObj.angle}deg, ${gradientColors.toString()})`,
      // `-ms-linear-gradient(${colorObj.angle}deg, ${gradientColors.toString()})`,
    } else if (colorObj.type === 'radial') {
      const orderedPoints = sortBy(colorObj.points, 'perc');
      const gradientColors = [];
      forEach(orderedPoints, (point) => {
        gradientColors.push(`${getColorString(point, colors)} ${point.perc}%`);
      });

      let radius;
      switch (colorObj.radius) {
        case 'cc':
          radius = 'closest-corner';
          break;
        case 'fc':
          radius = 'farthest-corner';
          break;
        case 'cs':
          radius = 'closest-side';
          break;
        case 'fs':
          radius = 'farthest-side';
          break;
        default:
          radius = 'farthest-corner';
      }

      style.background = `radial-gradient(circle ${radius} at ${colorObj.center.left}% ${colorObj.center.top}%, ${gradientColors.toString()})`;
      // radial-gradient(circle closest-corner at 25% 50% , #848484, #ededed 100%);
    }
  } else {
    style.backgroundColor = '#000000';
  }
}
