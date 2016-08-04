import forEach from 'lodash.foreach';

import add from './add';
import addLink from './add-link';
import changeAnimation from './change-animation';
import changeChildren from './change-children';
import changeContent from './change-content';
import changeDisplay from './change-display';
import changeLabel from './change-label';
import changeLinkAction from './change-link-action';
import changePosition from './change-position';
import changeProp from './change-prop';
import changeStyle from './change-style';
import duplicate from './duplicate';
import makeDynamic from './make-dynamic';
import move from './move';
import remove from './remove';
import removeLink from './remove-link';

const pageBuilderActions = {
  new: add,
  add,
  move,
  duplicate,
  remove,
  makeDynamic,
  changeLabel,
  changeDisplay,
  changeProp,
  changeAnimation,
  changePosition,
  changeStyle,
  changeContent,
  changeChildren,
  addLink,
  changeLinkAction,
  removeLink
};

// do action function
export default (doc, action) => {
  let result;

  if (action && action.constructor === Array) {
    const revertActions = [];
    let resultDoc = doc;

    forEach(action, (actionPart) => {
      const actionFunction = pageBuilderActions[actionPart.type];
      const partResult = actionFunction && actionFunction(resultDoc, actionPart);

      if (partResult) {
        resultDoc = partResult.doc;
        revertActions.unshift(partResult.revertAction);
      }
    });

    result = {
      doc: resultDoc,
      revertAction: revertActions
    };
  } else {
    const actionFunction = pageBuilderActions[action.type];
    result = actionFunction && actionFunction(doc, action);
  }

  return result;
};
