import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

authRouter.post("/signup", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("SIGNUP HIT");
});

authRouter.post("/signin", (c) => {
  return c.text("SIGNIN HIT");
});

export default authRouter;
