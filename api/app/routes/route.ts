import Express from 'express'
import Index from '../controller/IndexController'

const router = Express.Router()

router.use('/', Index)

export default router
