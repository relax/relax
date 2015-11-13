import forEach from 'lodash.foreach';

import Utils from '../utils';

export default function (pageBuilder, linkedElement, property) {
  const actionsValues = [];
  const actionsLabels = [];
  const ElementClass = pageBuilder.elements[linkedElement.tag];

  // Content
  if (linkedElement.tag === 'TextBox') {
    actionsLabels.push('Content');
    actionsValues.push('children');
  }

  // Settings
  if (ElementClass.propsSchema && ElementClass.propsSchema.length > 0) {
    // Check settings that match property type
    const propsList = Utils.getPropSchemaList(ElementClass.propsSchema);
    forEach(propsList, propSchema => {
      if (propSchema.id && propSchema.type === property.type) {
        actionsLabels.push(propSchema.label);
        actionsValues.push(propSchema.id);
      }
    });
  }

  // Display
  const extraLabel = (property.type === 'Boolean' ? 'true)' : 'not empty)');
  actionsLabels.push('Visible (when ' + extraLabel);
  actionsValues.push('show');
  actionsLabels.push('Hidden (when ' + extraLabel);
  actionsValues.push('hide');

  return {
    labels: actionsLabels,
    values: actionsValues
  };
}
