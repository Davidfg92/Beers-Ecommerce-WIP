import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
  beers: [
    {
      beer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beer',
        required: true,
      },
      amount: { type: Number, required: true },
    },
  ],
});

export default mongoose.model('Cart', cartSchema);
