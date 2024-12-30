import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@lakshyababel/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId: string,
    }
}>();

blogRouter.use("/*", async (c, next)=>{
    const authHeader = c.req.header("authorization") || "";
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);

        if(user){
            c.set("userId", String(user.id));
            await next();

        }else{
            c.status(411);
            return c.json({
                message: "You are not logged in"
            })
        }
    }catch(e){
        c.status(411);
        return c.json({
            message: "You are not logged in"
        })
    }
})
blogRouter.post("/" , async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const success = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            error: "please enter valid inputs"
        })
    }
    const authorId = c.get("userId");

    const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
			authorId: authorId,
        }
    })

    return c.json({
        id: post.id
    })

})

blogRouter.put("/" , async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const success = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            error: "PLease enter valid values"
        })
    }
    const updateBody = await prisma.post.update({
        where:{
            id: body.id,
        },
        data:{
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: updateBody.id
    })   

})

blogRouter.get("/bulk" , async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    const post = await prisma.post.findMany({
        select:{
            content:true,
            id:true,
            title:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({
        post
    })
})

//kept this id one down to bulk as if control doesnt reach there then control reach here
blogRouter.get("/:id" , async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const id = c.req.param("id");

    try{
        const post = await prisma.post.findFirst({
            where:{
                id: id,
            },
            select:{
                content:true,
                id:true,
                title:true,
                author:{
                    select:{
                        name:true
                    }
                }

            }
        })
    
        return c.json({
            post
        })
    } catch(e){
        c.status(411)
        return c.json({
            error:  "Error while fetching",
        })
    }


})

