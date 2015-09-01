import mongoose from 'mongoose';

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
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

export default mongoose.model('Schema', schema);
