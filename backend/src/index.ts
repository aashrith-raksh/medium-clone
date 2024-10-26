import { Hono } from 'hono'
import authRouter from './router/auth'
import blogRouter from './router/blog'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1/auth", authRouter);
app.route("/api/v1/blog", blogRouter);

export default app
