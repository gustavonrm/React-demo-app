import { useGetPostsQuery } from "../services/post.api";
import Post from "../components/Post";
import { PostProps } from "../types";


function PostsPage() {
    const { data, error, isLoading } = useGetPostsQuery()

    if(isLoading || data === undefined)return(<div>Loading...</div>)
    if (error) return(<div>Error occurred</div>)

    return( 
    <div>
        {data.map((post: PostProps) => (<Post key={post.id} body={post.body} id={post.id} title={post.title} userId={post.userId}/>))
    }
    </div>)
}
export default PostsPage;
