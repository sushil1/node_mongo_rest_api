import userRoute from './users/user.route'
import postRoute from './posts/post.route'
import {authJwt} from '../services/auth.service'

export default app => {
  app.use('/api/v1/users', userRoute)
  app.use('/api/v1/posts', postRoute)

}
