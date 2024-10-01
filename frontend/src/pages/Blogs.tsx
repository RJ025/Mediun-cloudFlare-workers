import { BlogCard } from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-gray-500">
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 flex justify-center items-center bg-gray-50">
            <div className="grid gap-6 max-w-4xl w-full grid-cols-1 sm:grid-row lg:grid-row">
                {blogs.map((blog) => {
                    return (
                        <BlogCard
                            key={blog.id}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={blog.content}
                            publishedDate="2nd April 2024"
                            id={blog.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Blogs;
