export default {
  empty: [],
  nonObject: [1, undefined, null, '4', true, () => {}, /true/],
  simple: [
    {
      id: 'title'
    },
    {
      id: 'frontpage'
    },
    {
      id: 'favicon'
    },
    {
      id: 'webclip'
    }
  ],
  deepOptions: [
    {
      id: 'title',
      options: [
        {
          id: 'frontpage'
        },
        {
          id: 'favicon'
        },
        {
          id: 'webclip'
        }
      ]
    }
  ],
  deepUnlocks: [
    {
      id: 'title',
      unlocks: [
        {
          options: [
            {
              id: 'frontpage'
            },
            {
              id: 'favicon'
            },
            {
              id: 'webclip'
            }
          ]
        }
      ]
    }
  ],
  deepUnlocksDuplicateKey: [
    {
      id: 'title',
      unlocks: [
        {
          id: 'frontpage',
          options: [
            {
              id: 'frontpage'
            },
            {
              id: 'favicon'
            },
            {
              id: 'webclip'
            }
          ]
        }
      ]
    }
  ],
  deepUnlocksDuplicateKeyDepth3: [
    {
      id: 'title',
      unlocks: [
        {
          id: 'frontpage',
          options: [
            {
              id: 'frontpage',
              unlocks: [
                {
                  id: 'frontpage',
                  options: [
                    {
                      id: 'frontpage'
                    },
                    {
                      id: 'favicon'
                    },
                    {
                      id: 'webclip'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
