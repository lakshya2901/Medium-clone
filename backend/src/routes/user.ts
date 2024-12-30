import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from "@lakshyababel/medium-common";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post("/signup" , async(c)=>{

const body = await c.req.json();

const success = signupInput.safeParse(body);
if(!success){
    c.status(411);
    return c.json({
        error: "inputs are not correct"
    })
  }  
  // this env is not accessible globally
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try{
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        
      }
    })
  
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({
        jwt: token
      })
  } catch(e){
    return c.json({
      error: "error while signing up"
    })
  }
})

userRouter.post("/signin" , async (c)=>{
    // client, we have to make individual request to the server because of this c cant access globally this PrismaClient instance
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json();

    const success  = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            error:" Please enter valid values"
        })
    }


    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      } 
    })
  
    if(!user){
      return c.json({
        msg: 'user not found'
      })
    }
  
    if(user.password !== body.password){
      return c.json({
        msg: 'password is incorrect'
      })
    }
    
    const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
  
    return c.json({
      jwt
    })
  
  })