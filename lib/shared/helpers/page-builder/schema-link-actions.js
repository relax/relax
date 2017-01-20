import cloneDeep from 'lodash/cloneDeep';
import elements from 'elements';
import forEach from 'lodash/forEach';

function getPropSchemaListIt (propsSchema, list, defaultLabel = '') {
  let resultList = list;
  forEach(propsSchema, (propSchema) => {
    if (!propSchema.label && defaultLabel !== '') {
      propSchema.label = defaultLabel;
    }
    resultList.push(propSchema);
    if (propSchema.unlocks) {
      if (propSchema.unlocks.constructor === Array) {
        resultList = getPropSchemaListIt(propSchema.unlocks, resultList, propSchema.label);
      } else {
        forEach(propsSchema.unlocks, (propSchemaUnlocks) => {
          resultList = getPropSchemaListIt(propSchemaUnlocks, resultList);
        });
      }
    }
  });

  return resultList;
}

function getPropSchemaList (propsSchema) {
  return getPropSchemaListIt(cloneDeep(propsSchema), []);
}

export default function (linkedElement, property, goal) {
  const actionsValues = [];
  const actionsLabels = [];
  const ElementClass = elements[linkedElement.tag];

  if (goal === 'write' && property.type !== 'State') {
    actionsLabels.push('Name');
    actionsValues.push('name');
  } else {
    // Content
    if (linkedElement.tag === 'TextBox' && (property.type === 'String' || property.type === 'Html')) {
      actionsLabels.push('Content');
      actionsValues.push('children');
    }

    // Page builder fragment
    if (property.type === 'BuilderFragment' && ElementClass && ElementClass.settings.drop) {
      actionsLabels.push('Content');
      actionsValues.push('builderFragment');
    }

    // Settings
    if (ElementClass.propsSchema && ElementClass.propsSchema.length > 0 && property.type !== 'State') {
      // Check settings that match property type
      const propsList = getPropSchemaList(ElementClass.propsSchema);
      forEach(propsList, propSchema => {
        if (propSchema.id && propSchema.type === property.type) {
          actionsLabels.push(propSchema.label);
          actionsValues.push(propSchema.id);
        }
      });
    }

    // Display
    const extraLabel = ((property.type === 'Boolean' || property.type === 'State') ? 'true' : 'not empty');
    actionsLabels.push(`Visible (when ${extraLabel})`);
    actionsValues.push('show');
    actionsLabels.push(`Hidden (when ${extraLabel})`);
    actionsValues.push('hide');
  }

  return {
    labels: actionsLabels,
    values: actionsValues
  };
}
