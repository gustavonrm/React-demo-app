import { useGetPostsQuery } from "../services/post.api";
import Post from "../components/Post";
import { PostProps } from "../types";


function HomePage() {
    return( 
    <div>
        This the the Homepage, select <b>Posts</b> or <b>Comments</b> on the nav bar to view them
        <br/>
        On <b>Comments</b> section you can also create update and delete them
    </div>)
}
export default HomePage;
