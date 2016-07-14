import forEach from 'lodash.foreach';

import add from './add';
import changeAnimation from './change-animation';
import changeChildren from './change-children';
import changeContent from './change-content';
import changeDisplay from './change-display';
import changeLabel from './change-label';
import changePosition from './change-position';
import changeProp from './change-prop';
import changeStyle from './change-style';
import duplicate from './duplicate';
import elementAddSchemaLink from './element-add-schema-link';
import elementChangeSchemaLinkAction from './element-change-schema-link-action';
import elementRemoveSchemaLink from './element-remove-schema-link';
import makeDynamic from './make-dynamic';
import move from './move';
import newAction from './new';
import remove from './remove';
import setContentElement from './set-content-element';

const pageBuilderActions = {
  new: newAction,
  move,
  add,
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
  elementAddSchemaLink,
  elementRemoveSchemaLink,
  elementChangeSchemaLinkAction,
  setContentElement
};

// do action function
export default (data, action) => {
  let result;
  if (action && action.constructor === Array) {
    const revertActions = [];
    let resultData = data;

    forEach(action, (actionPart) => {
      const actionFunction = pageBuilderActions[actionPart.type];
      const partResult = actionFunction && actionFunction(resultData, actionPart);
      if (partResult) {
        resultData = partResult.data;
        revertActions.unshift(partResult.revertAction);
      }
    });

    result = {
      data: resultData,
      revertAction: revertActions
    };
  } else {
    const actionFunction = pageBuilderActions[action.type];
    result = actionFunction && actionFunction(data, action);
  }
  return result;
};
