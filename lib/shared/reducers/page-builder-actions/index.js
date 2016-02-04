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

export default {
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
  elementChangeSchemaLinkAction
};
