import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../services/post.api";
import { CommentProps } from "../types";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import {  useSelector } from 'react-redux';
import { IRootState } from '../store';
import List from '../components/List';

const CommentsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const { error, isLoading } = useGetCommentsQuery({ id: postId });
  const comments = useSelector( (state: IRootState)=> state.comments.list)


  if (isLoading || comments === undefined) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  function renderData(data: CommentProps[]) {
    return data.map((comment: CommentProps) => (
      <Comment
        key={comment.id}
        email={comment.email}
        body={comment.body}
        id={comment.id}
        name={comment.name}
        postId={comment.postId}
      />
    ))
}

  return (
    <div>
      <CommentForm postId={postId}/>
      <h4>
      {postId ? 'Listing Post - '+postId+ ' comments' : 'Listing all comments'}
      </h4>
      <List data={comments} renderData={renderData}/>
    </div>
  );
};

export default CommentsPage;
