import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName : string ,
    title : string ,
    content : string ,
    publishedDate : string ,
    id : string
}

export const BlogCard = ({
    authorName ,
    title ,
    content ,
    publishedDate ,
    id
} : BlogCardProps) => {


    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b-4 border-slate-200 p-2 cursor-pointer">
                <div className="flex flex-row">
                    <div className="flex justify-center flex-col p-2">
                        <Avatar name={authorName}/>
                    </div>
                    
                    <div className="font-thin flex justify-center flex-col p-2 text-slate-900">
                        {authorName} . {publishedDate}
                    </div>
                </div>
                <div className="p-2 text-2xl font-semibold">
                    {title}
                </div>
                <div className="p-2 text-md font-thin">
                    {content.slice(0 ,200) + "..."}
                </div>
                <div className="p-2 text-slate-500 text-sm font-thin">
                    {`${Math.ceil(content.length / 100)} Minutes`}
                </div>
            </div>
        </Link>
    )
}

export const Avatar = ({name} : {name : string}) => {
    return (
        
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-lg text-gray-600 dark:text-gray-300">
                {name.split(' ').length === 2 ? name.split(' ')[0][0] + name.split(' ')[1][0] : name.split(' ')[0][0]}
            </span>
        </div>

    )
}