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
  fields: [
    {
      id: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        required: true
      }
    }
  ]
});

export default mongoose.model('Schema', schema);
