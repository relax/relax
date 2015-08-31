import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import {isClient} from '../utils';
import {Events} from 'backbone';
import jss from '../react-jss';

import stylesStore from '../client/stores/styles';

class StylesManager {
  constructor () {
    this._registeredStyles = {};
    this._rules = {};

    if (isClient()) {
      var collection = stylesStore.getCollection();
      this.listenTo(collection, 'update change', this.onStylesUpdate.bind(this));
      this.onStylesUpdate();
    }
  }

  fetch () {
    stylesStore.getCollection();
  }

  onStylesUpdate () {
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
    var collection = stylesStore.collection;
    collection.each((style) => {
      const id = style.get('_id');
      const type = style.get('type');
      const options = style.get('options');

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
