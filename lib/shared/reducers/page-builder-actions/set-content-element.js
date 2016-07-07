// Sets the content element
// (used to set content area for templates)
// action contains:
//   elementId - element to change

export default (data, action) => ({
  data: Object.assign({}, data, {
    content: action.elementId
  }),
  revertAction: {
    type: 'setContentElement',
    elementId: data.content
  }
});
