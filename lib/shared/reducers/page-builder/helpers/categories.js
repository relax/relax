import elements from 'elements';
import forEach from 'lodash/forEach';

// Categories
export const categories = [
  'structure',
  'content',
  'media',
  'form'
];
forEach(elements, (element) => {
  if (element.settings && element.settings.category) {
    if (categories.indexOf(element.settings.category) === -1) {
      categories.push(element.settings.category);
    }
  }
});
categories.push('other');

// Collapsed categories map
export const categoriesCollapsed = {};
forEach(categories, (category) => {categoriesCollapsed[category] = false;});
