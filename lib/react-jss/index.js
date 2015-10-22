import forEach from 'lodash.foreach';

import RulesSet from './rules-set';

class StyleSheet {
  constructor () {
    this._rulesSets = [];
  }

  createRules (rules) {
    const rulesSet = this.createRulesGet(rules);
    return rulesSet.getRulesMap();
  }

  createRulesGet (rules) {
    const rulesSet = new RulesSet(rules);
    this._rulesSets.push(rulesSet);

    // rulesSet.on('remove', this.onRemove.bind(this, rulesSet.id));

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
    // this.trigger('update');
  }

  toString () {
    let css = '';

    forEach(this._rulesSets, (ruleSet) => {
      css += ruleSet.toString();
    });

    return css;
  }
}

export default new StyleSheet();
