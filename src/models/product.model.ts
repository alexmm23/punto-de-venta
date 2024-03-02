import { Schema, model } from 'mongoose'
import { Product, ProductModel } from '../types/product.type'

const Products = new Schema<Product, ProductModel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})
