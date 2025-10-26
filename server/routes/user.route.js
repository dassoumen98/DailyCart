import express from 'express'
import { registerController ,loginController, isAuth, logout } from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const route =express.Router()

// /api/v1/user/register
// /api/v1/user/login
// /api/v1/user/profile
route.post('/register' , registerController)
route.post('/login' ,loginController)
route.get('/isauth' ,authMiddleware ,isAuth)
route.get('/logout' ,authMiddleware ,logout)




export default route