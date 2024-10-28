import { Hono } from 'hono'
import checkAuth from '../middlewares/checkAuth'

const blog = new Hono<{
  Variables:{
    userId: string
  }
}>()


blog.post('/', checkAuth, (c) => {
  console.log("userId:", c.get("userId"))
  return c.text('BLOG POST HIT')
})

blog.put('/', checkAuth, (c) => {
  return c.text('BLOG PUT HIT')
})

blog.get('/:id', checkAuth,  (c) => {
  return c.text('BLOG GET HIT')
})
blog.get('/bulk', (c) => {
  return c.text('BLOG BULK GET HIT')
})

export default blog