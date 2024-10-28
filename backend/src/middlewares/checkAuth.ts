import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const checkAuth = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    return c.json(
      {
        message: "Authorization header not present",
      },
      401
    );
  }

  const authToken = authHeader.split(" ")[1];

  const payLoad = await verify(authToken, c.env.JWT_SECRET);

  if (!payLoad) {
    return c.json(
      {
        message: "Invalid auth token",
      },
      401
    );
  }

  c.set('userId', payLoad.id);
  await next();
});

export default checkAuth
