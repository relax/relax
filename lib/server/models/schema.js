import mongoose from 'mongoose';
// import tabsStore from '../stores/tabs';
// import revisionsStore from '../stores/revisions';

const schemaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  publicReadable: {
    type: Boolean,
    default: true
  },
  publicWritable: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  properties: [
    {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      props: {
        type: mongoose.Schema.Types.Mixed,
        required: false
      },
      default: {},
      required: {
        type: Boolean,
        required: true,
        default: false
      },
      dependencies: {
        type: Array,
        required: false
      }
    }
  ]
});

// schemaSchema.post('remove', (schema) => {
//   tabsStore.removeMultiple({
//     '_id._id': schema._id
//   });
//
//   revisionsStore.removeMultiple({
//     '_id._id': schema._id
//   });
// });

export default mongoose.model('Schema', schemaSchema);
