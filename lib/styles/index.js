import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import forEach from 'lodash.foreach';
import {isClient} from '../utils';
import {Events} from 'backbone';
import jss from '../react-jss';

import stylesStore from '../client/stores/styles';

class StylesManager {
  constructor () {
    this._registeredStyles = {};
    this._rules = {};
  }

  init (styles = []) {
    this.styles = styles;

    if (isClient()) {
      var collection = stylesStore.getCollection();
      this.listenTo(collection, 'update change', this.onStylesUpdate.bind(this));
      this.onStylesUpdate();
    } else {
      this.makeCss();
    }
  }

  fetch () {
    stylesStore.getCollection();
  }

  onStylesUpdate () {
    this.styles = stylesStore.collection.toJSON();
    this.makeCss();
    this.trigger('update');
  }

  registerStyle (options) {
    this._registeredStyles[options.type] = options;
  }

  getClassesMap (styleId) {
    if (typeof styleId === 'string' && styleId !== '' && this._rules[styleId]) {
      return this._rules[styleId].getRulesMap();
    }
    return null;
  }

  getEntriesByType (type) {
    var collection = stylesStore.collection;
    var entries = [];
    collection.each((entry) => {
      if (entry.get('type') === type) {
        entries.push(entry.toJSON());
      }
    });
    return entries;
  }

  getStyleOptionsByType (type) {
    return this._registeredStyles[type];
  }

  get (id) {
    return stylesStore.collection.get(id);
  }

  createTemp (type) {
    const collection = stylesStore.collection;
    const Model = collection.model;
    const settings = this.getStyleOptionsByType(type);
    const model = new Model({
      _id: 'temp',
      type,
      label: '',
      options: cloneDeep(settings.defaults)
    });
    collection.add(model);
    return model;
  }

  removeTemp () {
    const collection = stylesStore.collection;
    collection.remove('temp');
  }

  makeCss () {
    forEach(this.styles, (style) => {
      const id = style._id;
      const type = style.type;
      const options = style.options;

      if (this._registeredStyles[type]) {
        var rules = this._registeredStyles[type].rules(options);

        if (this._rules[id]) {
          this._rules[id].update(rules);
        } else {
          this._rules[id] = jss.createRulesGet(rules);
        }
      }
    });
    jss.update();
  }
}
merge(StylesManager.prototype, Events);

export default new StylesManager();
