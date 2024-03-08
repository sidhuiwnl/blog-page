import { Hono } from 'hono'
import { Jwt } from 'hono/utils/jwt';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET:string,
    
	},
        Variables :{
            userId : string,
        }
    
}>();


blogRouter.use('/*',async(c,next) =>{

    const authHeader = c.req.header('Authorization')
  
    if(!authHeader){
      return c.json({error : 'unauthorized'},401)
    }
    const token:any  = authHeader.split(' ')[1]
  
    const payload = await Jwt.verify(token,c.env.JWT_SECRET);
  
    if(!payload){
      return c.json({error : "unauthorized"},401)
    }
    c.set('userId', payload.userID)
    await next()
  
  
    
})
  
blogRouter.post('/',async(c) =>{
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const blog = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : userId
        }
    })

    if(!blog){
        return c.json({
            msg : "failed creating blog post"
        },401)
    }

    return c.json({msg:"Blog created successfully",'id' :blog.id })

})

blogRouter.put('/',async (c) =>{
    const userId = c.get('userId');
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const parBlog = await prisma.post.update({
        where:{
            id : body.id,
            authorId : userId
        },
        data : {
            title :body.title,
            content : body.content,
            
        }



    })

    return c.json({msg : "blog updated successfully"},200)
})


//Todo pagination
blogRouter.get('/bulk',async(c) =>{
    const prisma = new PrismaClient({
       datasourceUrl  :c.env.DATABASE_URL 
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({})

    return c.json({
        blogs
    })
})


blogRouter.get('/:id',async(c) =>{
    const userId = c.get('userId');
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogId =  c.req.param('id')
    const blog = await prisma.post.findUnique({
        where  :{
            id : blogId,
            authorId : userId
        }
    })

    if(!blog){
        return c.json({msg : "No blog founded"},401)
    }

    return c.json({blog})

})


