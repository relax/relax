import mongoose from 'mongoose';

var menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  data: [
    {
      id: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
      },
      link: {
        type: mongoose.Schema.Types.Mixed
      },
      children: [
        {
          id: {
            type: String,
            required: true
          },
          type: {
            type: String,
            required: true
          },
          page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Page'
          },
          link: {
            type: mongoose.Schema.Types.Mixed
          },
          children: [
            {
              id: {
                type: String,
                required: true
              },
              type: {
                type: String,
                required: true
              },
              page: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Page'
              },
              link: {
                type: mongoose.Schema.Types.Mixed
              }
            }
          ]
        }
      ]
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Menu', menuSchema);
