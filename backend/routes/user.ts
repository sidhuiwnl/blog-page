import { Hono } from 'hono'

import { Jwt } from 'hono/utils/jwt';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput, signinInput } from '@sidharth999/medium-common';


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET:string,
    
	}
}>();


/*async function hashPassword(password:string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}*/




userRouter.post('/Signup',async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
    const payload = await c.req.json();
    const { success } = signupInput.safeParse(payload);
    if(!success){
      c.status( 411)
      return c.json({msg : "Input not correct"})
    }
    
    try {
      const user= await prisma.user.create({
        data: {
          email : payload.email,
          password : payload.password,
          name : payload.name
          
        }
  
      })
      const userId = user.id
  
      const token = await Jwt.sign(userId,c.env.JWT_SECRET)
      
      return c.json({
        msg : "User created successfully",
        token : token
      })
      
    } catch (error) {
      return c.json({msg :"Error creating User",error},500)
    }
  
  })

userRouter.post('/Signin',async(c) =>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
    const payload = await c.req.json();
    const { success } = signinInput.safeParse(payload)

    if(!success){
      c.status(411)
      return c.json({
        msg :"login creditianals are not valid"
      })
    }
  
    try {
      const findUser = await prisma.user.findUnique({
        where : {
          email : payload.email,
          password : payload.password
        }
      })

      
  
      
  
      if(!findUser){
        c.status(403);
          return c.json({ error: "user not found" });
      }
  
      const token = await Jwt.sign({userID : findUser.id},c.env.JWT_SECRET)
      return c.json({
        token : token
      })
  
    } catch (error) {
      console.error('Error during login:', error);
      c.status(500);
      return c.json({ error: "internal server error" });
    }
  })