import {Router } from 'express'
import validate from 'express-validation'

import * as postController from './post.controller'
import {authJwt} from '../../services/auth.service'
import postValidation from './post.validation'


const router = new Router()

router.post('/', authJwt, validate(postValidation.createPost), postController.createPost)

router.get('/:id', authJwt, postController.getPostById)
router.get('/', authJwt, postController.getPostList)

router.patch('/:id', authJwt, validate(postValidation.updatePost), postController.updatePost)

router.delete('/:id', authJwt, postController.deletePost)

router.post('/:id/favourite', authJwt, postController.favouritePosts)

export default router
