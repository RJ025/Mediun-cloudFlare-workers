import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify } from "hono/jwt";


type Variables = {
    userId : string
}

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string ,
        JWT_SECRET : string
    } ,
    Variables : {
        userId : string
    }
}>();


blogRouter.use('/*' , async (c , next)=> {
    /*
     * extract the user id
     * pass it down to the route handler  
    */

    const authHeader= c.req.header('Authorization') || "";

    try{
        const user = await verify(authHeader , c.env.JWT_SECRET);

        if(user) {
            //@ts-ignore
            c.set("userId" , user.id);
            await next()
        } else {
            c.status(403)
            return c.json({
                message : "no access"
            })
        }
    } catch(e) {
        c.status(403)
        return c.json({
            message : "problem in logging in"
        })
    }
    
})

blogRouter.post('/' , async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId = c.get("userId")

    const body = await c.req.json()

    const post = await prisma.post.create({
        data : {
            title : body.title ,
            content : body.content ,
            authorId : userId
        }
    })
    return c.json({
        id : post.id
    })
})

blogRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const id = c.req.param("id")

    const post = await prisma.post.update({
        where : {
            id : body.id 
        } ,
        data : {
            title : body.title ,
            content : body.content
        }
    })


    return c.json({
        id : post.id
    })
})
  
blogRouter.post('/blog', (c) => {
  
    return c.text('signin route')
})


blogRouter.get('/bulk' , async (c)=> {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany()

    return c.json({
        posts
    })
})


blogRouter.get('/:id' , async (c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = c.req.json()
    const id = c.req.param("id")
    
    try{
        const post = await prisma.post.findFirst({
            where : {
                id
            }
        })

        console.log(post);

        return c.json({
            post
        })
    } catch(e) {
        c.status(403)
        return c.json({
            e
        })
    }
})

