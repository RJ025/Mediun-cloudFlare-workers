import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string ,
    JWT_SECRET : string
  }
}>();

app.post('/api/v1/signup' , async (c) => {
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
  // console.log(body)
  // return c.text("hello")
  
})

app.post('/api/v1/signin' , async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    // where : {
    //   email : {
    //     contains : body.email
    //   }
    // }
  })

  if(!user) {
    c.status(403)
    return c.json({
      error : "user not found"
    })
  }
  
  const jwt = await sign({id : user.id} , c.env.JWT_SECRET)
  return c.json({jwt})
})

app.post('/api/v1/blog/:id' , (c)=>{
  const id = c.req.param('id')
  console.log(id)
  return c.text('get Blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

app.get('/api/v1/blog:id' , (c)=>{
  const id = c.req.param("id")
  console.log(id)
  return c.text('blog')
})


