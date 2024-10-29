import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@aashrith-raksh/medium-clone-common";

const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

authRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const { success } = signUpInput.safeParse(body);

    if (!success) {
      return c.json(
        {
          message: "Invalid inputs",
        },
        403
      );
    }

    const { email, password } = body;
    console.log("email:", email);
    console.log("password:", password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    const token = await sign(
      {
        id: newUser.id,
      },
      c.env.JWT_SECRET
    );

    return c.json(
      {
        message: "Sign up successful",
        token,
      },
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        {
          message: error.message || "Error signing up",
        },
        500
      );
    }
  }
});

authRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signInInput.safeParse(body);

  if (!success) {
    return c.json(
      {
        message: "Invalid inputs",
      },
      403
    );
  }

  const { email, password } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return c.json(
        {
          message: "Invalid credentials",
        },
        403
      );
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(
      {
        message: "Sign In successful",
        token: jwt,
      },
      200
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json({
        message: error.message || "error while sign in ",
      });
    }
  }
});

export default authRouter;
