import Categories from '../models/category.model'
import { Category, CategoryModel } from '../types/category.type'
import boom from '@hapi/boom'

class CategoryService {
  async create(category: Category) {
    const newCategory = await Categories.create(category).catch((error) => {
      console.log('Could not save category', error)
    })

    return newCategory
  }

  async findAll() {
    const categories = await Categories.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!categories) {
      throw boom.notFound('There are not categories')
    }

    return categories
  }

  async findById(id: string) {
    const category = await Categories.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }

    return category
  }

  async findByName(name: string) {
    const category = await Categories.findOne({ name }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }
  }
  async findNames() {
    const categories = await Categories.find()
      .select('name -_id')
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!categories) {
      throw boom.notFound('There are not categories')
    }

    return categories
  }
  async update(id: string, category: Category) {
    const updatedCategory = await Categories.findByIdAndUpdate(id, category, {
      new: true
    }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!updatedCategory) {
      throw boom.notFound('Category not found')
    }

    return updatedCategory
  }
  async delete(id: string) {
    const category = await Categories.findByIdAndDelete(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }
    return category
  }
}

export default CategoryService
