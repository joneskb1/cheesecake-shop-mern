import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  description: {
    type: String,
    required: [true, 'Description required'],
  },
  image: {
    type: String,
    required: [true, 'Image required'],
  },
  variants: [
    {
      price: Number,
      size: Number,
      stock: Number,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
