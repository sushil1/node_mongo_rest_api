import {Router} from 'express'
import validate from 'express-validation'

import { authLocal} from '../../services/auth.service'
import * as userController from './user.controller'
import userValidation from './user.validation'

const router = new Router()

router.post('/signup', validate(userValidation.signup), userController.signUp)
router.post('/login', authLocal, userController.login)


export default router
