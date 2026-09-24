import express from 'express'
import auth_router from '../routes/auth_routes.js'
const mainRouter = express.Router();

mainRouter.use('/auth', auth_router)

export default mainRouter