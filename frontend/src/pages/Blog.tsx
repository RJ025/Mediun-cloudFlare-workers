import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../utils/store"
import axios from "axios"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import { storeBlogCache } from "../utils/blogSlice"
import { Avatar } from "../components/BlogCard"
import Loader from "../components/Loader"

interface Blog {
    author : {
        name : string
    } , 
    content : string ,
    id : string ,
    title : string
}


const Blog = () => {

    const [blog , setBlog] = useState<Blog>({
        author: { name: "" },
        content: "",
        id: "",
        title: "",
    })
    const readBlogCache = useSelector((state:RootState) => state.blogCache.cachedBlog)
    const dispatch = useDispatch()
    const {id} = useParams();


    useEffect(()=>{
        const blogId = id;
        console.log(blogId)
        console.log(readBlogCache)
        const res = readBlogCache.find(({post})=> post.id === blogId)
        console.log(res);

        if(res) {
            setBlog(res.post)
        } else {
            getBlog();
        }

    } , [id])

    const getBlog = async() => {
        const resp = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        const post = resp.data.post;
        setBlog(post)
        dispatch(storeBlogCache({
            post
        }))
    }

    if(blog.title === ""){
        return (
            <div className="flex flex-col justify-center h-screen">            
                <div  className="flex justify-center">
                    <Loader/>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-10 px-4  bg-gray-50 border flex flex-row justify-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
                <div className="flex items-center p-6 space-x-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                    <Avatar name={blog.author.name} />
                    <div className="text-lg font-semibold">{blog.author.name}</div>
                </div>
                <div className="p-6">
                    <h1 className="text-2xl uppercase font-bold text-gray-800 mb-4">{blog.title}</h1>
                    <p className="text-gray-700 leading-relaxed">{blog.content}</p>
                </div>
            </div>
        </div>
        
    )
}


export default Blog