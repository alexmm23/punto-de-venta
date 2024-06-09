import Products from '../models/product.model'
import { Product } from '../types/product.type'
import { Category } from '../types/category.type'
import Categories from '../models/category.model'
import boom from '@hapi/boom'

class ProductService {
  async create(product: Product) {
    const { category } = product
    delete product.category
    const dbCategory = await Categories.findOne({ name: category }).catch(
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
    const productsWithCategory = products.map(async (product) => {
      return product.populate({ path: 'category', strictPopulate: false })
    })
    return Promise.all(productsWithCategory)
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
    const dbCategory = await Categories.findOne({ name: category }).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
      }
    )
    if (!dbCategory) {
      throw boom.notFound('Category not found')
    }
    const products = await Products.find({ category: dbCategory._id }).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
      }
    )
    if (!products) {
      throw boom.notFound('Products not found')
    }
    return products
  }
  async update(id: string, product: Product) {
    const { category } = product
    delete product.category
    const dbCategory = await Categories.findOne({ name: category }).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
      }
    )
    if (!dbCategory) {
      throw boom.notFound('Category not found')
    }
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { ...product, category: dbCategory._id },
      { new: true }
    ).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!updatedProduct) {
      throw boom.notFound('Product not found')
    }
    return updatedProduct.populate({ path: 'category', strictPopulate: false })
  }
  async delete(id: string) {
    const product = await Products.findByIdAndDelete(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!product) {
      throw boom.notFound('Product not found')
    }
    return product
  }
}
export default ProductService
