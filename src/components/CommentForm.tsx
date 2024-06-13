import { useEffect, useState } from 'react';
import { CommentProps, } from '../types'
import { useCreateCommentMutation } from '../services/post.api';

function CommentForm({postId}: {postId: any}) {
 
    const [createComment, { isLoading, isError, isSuccess}] = useCreateCommentMutation(); 

    return (
        <div className="card mb-3">
        <div className="card-body">
            <h5 className="card-title">
                <input className="form-control" type="text"  placeholder='type comment title'/>
            </h5>
            <textarea className="form-control" rows={3}  placeholder='type comment body'/>
            <button type="button" className="btn btn-success mt-3" onClick={() => createComment({ postId: postId, name: 'ola', body: 'body' })}>Submit</button>
            </div>        
        </div>
        )
}

export default CommentForm;
  