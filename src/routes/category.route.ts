import express from 'express'
import { Category } from '../types/category.type'
import CategoryService from '../services/category.service'
import passport from 'passport'
const router = express.Router()
const service = new CategoryService()

//Endpoint desprotegido

router.get('/getNames', async (req, res, next) => {
  try {
    const categories = await service.findNames()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})

router.use(passport.authenticate('jwt', { session: false }))

router.post('/', async (req, res) => {
  const category: Category = req.body
  const newCategory = await service.create(category)

  res.status(201).json(newCategory)
})

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.findAll()
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const category = await service.findById(req.params.id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const category = await service.findById(req.query.name as string)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const category: Category = req.body
    const updatedCategory = await service.update(id, category)
    res.status(200).json(updatedCategory)
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
