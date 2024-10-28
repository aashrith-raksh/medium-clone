import { Hono } from "hono";
import checkAuth from "../middlewares/checkAuth";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blog.post("/", checkAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const { title, content } = await c.req.json();

  try {
    const newPost = await prisma.post.create({
      data: { title, content, authorId: userId },
    });
    return c.json({
      message: "Successfully create a new post",
      newPost,
    });
  } catch (error: any) {
    return c.json({
      message: error.message || "Error while creating a new post",
    });
  }
});

blog.put("/", checkAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content, postId } = await c.req.json();

  try {
    const postToUpdate = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postToUpdate) {
      throw new Error("Invaid postId. No such post exists to update");
    }


    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
      },
    });

    return c.json({
      message: "Successfully updated the post",
      updatedPost,
    });
  } catch (error: any) {
    return c.json({
      message: error.message || "Error while updating post",
    });
  }
});

blog.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany();


    if (!posts) {
      throw new Error("Error while fetching posts");
    }

    return c.json({
      posts,
    });
  } catch (error: any) {
    return c.json({
      message: error.message || "Error while fetching posts",
    });
  }
});

blog.get("/:id", checkAuth, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id: postId } = await c.req.param();

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Invaid postId. No such post exists");
    }

    return c.json({
      post,
    });
  } catch (error: any) {
    return c.json({
      message: error.message || "Error while updating post",
    });
  }
});



export default blog;
