import merge from 'lodash.merge';
import find from 'lodash.find';
import {Events} from 'backbone';
import Colr from 'colr';

import colorsStore from '../client/stores/colors';

class ColorsManager {
  constructor () {
    this.colors = [];
  }

  init (colors = []) {
    this.colors = colors;

    if (this.isClient()) {
      var collection = colorsStore.getCollection();
      this.listenTo(collection, 'update change', this.onUpdate.bind(this));
    }
  }

  isClient () {
    return typeof document !== 'undefined';
  }

  onUpdate () {
    this.colors = colorsStore.collection.toJSON();
    this.trigger('update');
  }

  getColor (colorObj) {
    if (typeof colorObj === 'object') {
      var hex = '#000000';
      var opacity = colorObj.opacity;
      var label = 'Custom';

      if (colorObj.type === 'palette') {
        let color = find(this.colors, (clr) => {
          return String(clr._id) === colorObj.value;
        });

        if (typeof color !== 'undefined') {
          hex = color.value;
          label = color.label;
        }
      } else {
        var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorObj.value);
        hex = isOk ? colorObj.value : '#000000';
      }

      return {
        colr: Colr().fromHex(hex),
        opacity: opacity,
        label
      };
    }
    return {
      colr: Colr().fromHex('#000000'),
      opacity: 100,
      label: 'Custom'
    };
  }

  getColorString (colorObj) {
    var color = (colorObj && colorObj.colr) ? colorObj : this.getColor(colorObj);
    if (color) {
      if (color.opacity === 100) {
        return color.colr.toHex();
      } else {
        var rgb = color.colr.toRgbObject();
        return 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', '+(color.opacity/100)+')';
      }
    }
    return '#000000';
  }
}
merge(ColorsManager.prototype, Events);

export default new ColorsManager();
