export default {
  fragmentsMock: {
    draft: {
      actions: [],
      redos: [],
      doc: {
        data: {
          body: {
            id: 'body',
            tag: 'body',
            children: ['0']
          },
          0: {
            id: '0',
            parent: 'body',
            tag: 'Section',
            children: ['1']
          },
          1: {
            id: '1',
            parent: '0',
            tag: 'TextBox'
          }
        }
      }
    }
  }
};
