import colr from 'colr';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import sortBy from 'lodash/sortBy';

let colorsCollection = [];

function getValue (value) {
  return Object.assign(
    {
      type: 'hex',
      value: '#000000',
      opacity: 100
    },
    value
  );
}

export function updateColors (colors) {
  colorsCollection = colors;
}

export function hexIsValid (value) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
}

export function getColor (colorObj, colors = colorsCollection) {
  const colorValue = getValue(colorObj);

  let color = colr().fromHex('#000000');
  let opacity = 100;
  let label = '#000000';
  let type = 'hex';

  if (typeof colorValue === 'object') {
    opacity = typeof colorValue.opacity === 'number' ? colorValue.opacity : 100;
    type = colorValue.type || 'hex';

    switch (colorValue.type) {
      case 'palette': {
        const colorFromPallete = find(colors, (clr) => (String(clr._id) === colorValue.value));
        if (colorFromPallete) {
          color = colr().fromHex(colorFromPallete.value);
          label = colorFromPallete.label;
        }
        break;
      }
      case 'hex':
        if (hexIsValid(colorValue.value)) {
          color = colr().fromHex(colorValue.value);
          label = colorValue.value;
        }
        break;
      case 'hsv':
        color = colr().fromHsvObject(colorValue.value);
        label = color.toHex();
        break;
      case 'rgb':
        color = colr().fromRgbObject(colorValue.value);
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
  const colorValue = getValue(colorObj);

  if (colorValue && typeof colorValue === 'object' && colorValue.type) {
    if (colorValue.type !== 'linear' && colorValue.type !== 'radial') {
      style.backgroundColor = getColorString(colorValue, colors);
    } else if (colorValue.type === 'linear') {
      const orderedPoints = sortBy(colorValue.points, 'perc');
      const gradientColors = [];
      forEach(orderedPoints, (point) => {
        gradientColors.push(`${getColorString(point, colors)} ${point.perc}%`);
      });
      style.background = `linear-gradient(${90 - colorValue.angle}deg, ${gradientColors.toString()})`;
      // TODO missing other browsers
      // `-moz-linear-gradient(${colorValue.angle}deg, ${gradientColors.toString()})`,
      // `-webkit-linear-gradient(${colorValue.angle}deg, ${gradientColors.toString()})`,
      // `-o-linear-gradient(${colorValue.angle}deg, ${gradientColors.toString()})`,
      // `-ms-linear-gradient(${colorValue.angle}deg, ${gradientColors.toString()})`,
    } else if (colorValue.type === 'radial') {
      const orderedPoints = sortBy(colorValue.points, 'perc');
      const gradientColors = [];
      forEach(orderedPoints, (point) => {
        gradientColors.push(`${getColorString(point, colors)} ${point.perc}%`);
      });

      let radius;
      switch (colorValue.radius) {
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

      // eslint-disable-next-line max-len
      style.background = `radial-gradient(circle ${radius} at ${colorValue.center.left}% ${colorValue.center.top}%, ${gradientColors.toString()})`;
      // radial-gradient(circle closest-corner at 25% 50% , #848484, #ededed 100%);
    }
  } else {
    style.backgroundColor = '#000000';
  }
}
