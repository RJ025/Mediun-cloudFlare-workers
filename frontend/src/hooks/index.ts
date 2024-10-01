import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";

interface Blog {
    title : string ,
    content : string ,
    author  : {
        name : string
    },
    id: string
}

export const useBlogs = () => {
    const [loading , setLoading] = useState(true);
    const [blogs , setBlogs] = useState<Blog[]>([]);


    useEffect(()=>{
        getBlogs() 
    }  , [])

    const getBlogs = async () => {
        const blogs = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk` , 
            {headers : {
                Authorization : localStorage.getItem('token')
            }}
        )
        const resp = await blogs.data.posts
        setBlogs(resp)
        setLoading(false)
    }

    return {
        loading ,
        blogs
    }
}