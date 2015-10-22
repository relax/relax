import forEach from 'lodash.foreach';

import Rule from './rule';

var RULESET_ID = 0;

export default class RulesSet {
  constructor (rules) {
    this.id = (RULESET_ID++).toString(16);
    this.update(rules);
  }

  update (rules) {
    this._rules = [];
    this._map = {};
    var count = 0;
    forEach(rules, (styles, ruleName) => {
      var rule = new Rule(ruleName, styles, (this.id + (count++).toString(16)));
      this._rules.push(rule);
      this._map[ruleName] = rule._id;
    });
  }

  remove () {
    // this.trigger('remove');
  }

  getRulesMap () {
    return this._map;
  }

  toString () {
    var css = '';

    forEach(this._rules, (rule) => {
      css += rule.toString();
    });

    return css;
  }
}
