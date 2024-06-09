import express from 'express'
import { Product } from '../types/product.type'
import ProductService from '../services/product.service'
import passport from 'passport'
const router = express.Router()
const service = new ProductService()
router.use(passport.authenticate('jwt', { session: false }))
router.post('/', async (req, res) => {
  const product: Product = req.body
  const newProduct = await service.create(product)
  res.status(201).json(newProduct)
})
router.get('/', async (req, res, next) => {
  try {
    const products = await service.findAll()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})
router.get('/name/:name', async (req, res, next) => {
  try {
    const { name } = req.params
    const product = await service.findByName(name)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})
router.post('/findByCategory', async (req, res, next) => {
  try {
    const { category } = req.body
    const products = await service.findByCategory(category)
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product: Product = req.body
    const updatedProduct = await service.update(id, product)
    res.status(200).json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default router
