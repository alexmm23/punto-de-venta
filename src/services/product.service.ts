import Products from '../models/product.model'
import { Product } from '../types/product.type'
import { Category } from '../types/category.type'
import boom from '@hapi/boom'

class ProductService {
  async create(product: Product) {
    const { category } = product
    delete product.category
    const dbCategory = await Products.findOne({ name: category }).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
      }
    )
    console.log('DB Category', dbCategory)
    if (!dbCategory) {
      throw boom.notFound('Category not found')
    }
    const newProduct = await Products.create({
      ...product,
      category: dbCategory._id
    }).catch((error) => {
      console.log('Could not save product', error)
    })
    const existingProduct = await Products.findById((newProduct as any)._id)
    return existingProduct.populate({ path: 'category', strictPopulate: false })
  }
  async findAll() {
    const products = await Products.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!products) {
      throw boom.notFound('Products not found')
    }
    return products
  }

  async findByName(name: string) {
    const product = await Products.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!product) {
      throw boom.notFound('Product not found')
    }
    return product
  }
  async findByCategory(category: string) {
    const products = await Products.find({ category }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!products) {
      throw boom.notFound('Products not found')
    }
    return products
  }
}
export default ProductService
