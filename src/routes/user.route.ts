import express from 'express'
import { User, UserModel } from '../types/user.type'
import UserService from '../services/user.service'
import passport from 'passport'
const router = express.Router()
const service = new UserService()

router.post('/', async (req, res) => {
  const user: User = req.body
  const newUser = await service.create(user)
  res.status(201).json({ user: newUser.toClient() })
})
router.use(passport.authenticate('jwt', { session: false }))
router.get('/', async (req, res, next) => {
  try {
    const users = await service.findAll()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:email', async (req, res, next) => {
  try {
    const user = await service.findByEmail(req.params.email)
    res.status(200).json({ user: user.toClient() })
  } catch (error) {
    next(error)
  }
})

export default router
