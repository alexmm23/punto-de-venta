import express from 'express'
import { User } from '../types/user.type'
import UserService from '../services/user.service'
import passport from 'passport'
const router = express.Router()
const service = new UserService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user: User = req.body
    const newUser = await service.create(user)
    res.status(201).json(newUser)
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const users = await service.findAll()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:email',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = await service.findByEmail(req.params.email)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
)

export default router
