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
router.get('/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params
    const products = await service.findByCategory(category)
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})

export default router
