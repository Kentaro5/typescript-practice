import Express from 'express'
import Index from '../controller/IndexController'
import Either from '../controller/EitherResultController'

const router = Express.Router()

router.use('/', Either)
router.use('/either-result', Either)

export default router
