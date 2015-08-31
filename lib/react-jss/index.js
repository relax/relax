import forEach from 'lodash.foreach';
import merge from 'lodash.merge';
import RulesSet from './rules-set';
import {Events} from 'backbone';

class StyleSheet {
  constructor () {
    this._rulesSets = [];
  }

  createRules (rules) {
    var rulesSet = this.createRulesGet(rules);
    return rulesSet.getRulesMap();
  }

  createRulesGet (rules) {
    var rulesSet = new RulesSet(rules);
    this._rulesSets.push(rulesSet);

    rulesSet.on('remove', this.onRemove.bind(this, rulesSet.id));

    return rulesSet;
  }

  onRemove (id) {
    forEach(this._rulesSets, (rulesSet, key) => {
      if (rulesSet.id === id) {
        this._rulesSets.splice(key, 1);
      }
    });
  }

  update () {
    this.trigger('update');
  }

  toString () {
    var css = '';

    forEach(this._rulesSets, (ruleSet) => {
      css += ruleSet.toString();
    });

    return css;
  }
}
merge(StyleSheet.prototype, Events);

export default new StyleSheet();
