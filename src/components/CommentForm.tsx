import { useState } from 'react';
import { useCreateCommentMutation } from '../services/post.api';

function CommentForm({postId}: {postId: any}) {
 
    const [createComment, { isLoading, isError, isSuccess}] = useCreateCommentMutation(); 
    const [commentPayload, setCommentPayload ] = useState<{postId:any, name:string, body:string }>({postId: postId, name: '', body: ''})

    return (
        <div className="card mb-3">
        <div className="card-body">
            <h5 className="card-title">
                Create a Comment
            </h5>
            <input className="form-control mb-3" type="text"  value={commentPayload.name} placeholder='type comment title' onChange={(e) => setCommentPayload({...commentPayload, name: e.target.value})}/>
            <textarea className="form-control" rows={3} value={commentPayload.body} placeholder='type comment body'onChange={(e) => setCommentPayload({...commentPayload, body: e.target.value})}/>
            <button type="button" className="btn btn-success mt-3" onClick={() => createComment(commentPayload)}>Post Comment Submit</button>
            </div>        
        </div>
        )
}

export default CommentForm;
  