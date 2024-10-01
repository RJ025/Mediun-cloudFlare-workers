import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Publish = () => {


    const [title , setTitle] = useState("")

  return (
    <div className="flex justify-center flex-col">
         <div className="flex flex-row justify-center p-2">
            <div className="max-w-screen-lg w-full">  
                <label  className="block mb-2 text-lg sm:text-4xl font-medium text-gray-900 dark:text-white">Title</label>
                <textarea value={title} onChange={(e)=>setTitle(e.target.value)} className="block p-2.5 w-full h-fit sm:text-3xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your title here..."></textarea>
            </div>
        </div>
        <div className="flex flex-row justify-center p-2">
            <div className="max-w-screen-lg w-full">
                <TextArea title = {title}/>
            </div>
        </div>
        
    </div>
   
  )
}

const TextArea = ({title} : {title : string}) => {
    const navigate = useNavigate()
    const [content , setContent] = useState("")

    const handleSubmit = async() => {
        const resposne = await axios.post(`${BACKEND_URL}/api/v1/blog` , {
            title ,
            content
        } , {
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(resposne.data)
        let id = await resposne.data.id
        console.log(id)
        navigate(`/blog/${id}`)
        
    }

    return (
        
<div>
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <label  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white p-2">Write Article</label>
       <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
           <textarea  value={content} onChange={(e)=>setContent(e.target.value)} className="block p-2.5 w-full h-96 text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." ></textarea>
       </div>
   </div>
   <button type="submit" onClick={()=>handleSubmit()} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
       Publish post
   </button>
</div>

    )
}


export default Publish