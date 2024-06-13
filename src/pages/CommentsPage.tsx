import {useState} from 'react';
import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../services/post.api";
import { CommentProps } from "../types";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import {  useSelector } from 'react-redux';
import { IRootState } from '../store';

const CommentsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const { error, isLoading } = useGetCommentsQuery({ id: postId });
  const comments = useSelector( (state: IRootState)=> state.comments.list)

  const [isCreatingComment, setIsCreatingComment] = useState<boolean>(false) 

  if (isLoading || comments === undefined) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <button type="button" className="btn btn-success mb-4" onClick={()=> setIsCreatingComment(!isCreatingComment)}>Create Comment</button>  
      {isCreatingComment &&
        <CommentForm postId={postId}/>
      }
      {comments.map((comment: CommentProps) => (
        <Comment
          key={comment.id}
          email={comment.email}
          body={comment.body}
          id={comment.id}
          name={comment.name}
          postId={comment.postId}
        />
      ))}
    </div>
  );
};

export default CommentsPage;
