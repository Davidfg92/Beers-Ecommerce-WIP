import mongoose from 'mongoose';

const beerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  alcoholContent: {
    type: String,
    required: true,
  },
  fermentationType: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  malts: {
    type: [],
    required: true,
  },
  hops: {
    type: [],
  },
  ibu: {
    type: Number,
    required: true,
  },
  comments: [
    {
      name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      content: String,
    },
  ],
  website: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Beer', beerSchema);
