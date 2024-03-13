import { Model } from 'mongoose'
import { Category } from './category.type'

export type Product = {
  id?: string
  name: string
  description?: string
  unitCost: number
  unitPrice: number
  measureUnit: string
  quantity: number
  createdAt?: Date
  updatedAt?: Date
  category: string | Category
}

export type ProductModel = Model<Product>
