import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string ,
        JWT_SECRET : string
    }
}>()



userRouter.post('/signup' , async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    try {
      const user = await prisma.user.create({
        data : {
          name : body.name ,
          email : body.email ,
          password : body.password
        },
        select : {
          name : true ,
          email : true ,
          password : true ,
          id : true
        }
      });
      const jwt = await sign({id : user.id} , c.env.JWT_SECRET)
  
      return c.json({
        jwt
      })
    } catch(e) {
      return c.status(403)
    }
  
})
  
userRouter.post('/signin' , async (c) => {
  
    const prisma = new PrismaClient({
  
      datasourceUrl : c.env?.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const user = await prisma.user.findFirst({
      where : {
        email : body.email ,
        password : body.password
      },
      select : {
        id : true ,
        name : true
      }
    })
  
    if(!user) {
      c.status(403)
      return c.json({
        error : "user not found"
      })
    };
    
    const jwt = await sign({id : user.id} , c.env.JWT_SECRET);
    return c.json({jwt , name : user.name})
})