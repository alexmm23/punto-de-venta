import { Model } from 'mongoose'
import { Category } from './category.type'

export type Product = {
  id?: string
  name: string
  description?: string
  price: number
  stock: number
  createdAt?: Date
  updatedAt?: Date
  category: string | Category
}

export type ProductModel = Model<Product>
