import { Hono } from 'hono'

const authRouter = new Hono()

authRouter.post('/signup', (c) => {
  return c.text('SIGNUP HIT')
})

authRouter.post('/signin', (c) => {
  return c.text('SIGNIN HIT')
})

export default authRouter