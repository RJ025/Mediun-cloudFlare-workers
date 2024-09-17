import z from "zod"

export const signupInput = z.object ({
    email : z.string().email() ,
    password : z.string().min(6) ,
    name : z.string()
})

/*
 *this is good method for type checking but we need these type 
 *on frontend also so use type inferance in zod
 * 
*/

export const signinInput = z.object ({
    email : z.string().email() ,
    password : z.string().min(6) 
})

export const createPostInput = z.object({
    title : z.string() ,
    content : z.string()
})

export const updatePostInput = z.object({
    title : z.string() ,
    content : z.string() ,
    id : z.string()
})

export type updatePostInput = z.infer<typeof updatePostInput>
export type signupInput = z.infer<typeof signupInput>
export type createPostInput = z.infer<typeof createPostInput>
export type signinInput = z.infer<typeof signinInput>



