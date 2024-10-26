import { Hono } from 'hono'

const blog = new Hono()

blog.post('/', (c) => {
  return c.text('BLOG POST HIT')
})

blog.put('/', (c) => {
  return c.text('BLOG PUT HIT')
})

blog.get('/:id', (c) => {
  return c.text('BLOG GET HIT')
})
blog.get('/bulk', (c) => {
  return c.text('BLOG BULK GET HIT')
})

export default blog