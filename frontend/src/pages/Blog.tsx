import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";

export const Blog = ()=>{
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    })

    if(loading){
        return <>
            <FullBlogSkeleton />
        </>
    }

    return(
    <div>
        <FullBlog blog = {blog}/>
    </div>
    )
    
}