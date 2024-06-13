import { useEffect, useState } from 'react';
import { CommentProps, } from '../types'
import { useDeleteCommentMutation, useUpdateCommentMutation } from '../services/post.api';

function Comment({ body, email, id, name, postId }: CommentProps) {
  const [deleteComment, { isLoading: isLoadingDelete, isError: isErrorDelete }] = useDeleteCommentMutation(); 
  const [updateComment, { isLoading: isLoadingUpdate, isError: isErrorUpdate, isSuccess: isSuccessUpdate}] = useUpdateCommentMutation(); 

  const [isUpdating, setUpdating] = useState<boolean>(false)
  const [comment, setComment] = useState<CommentProps>({name: name, body: body, email: email, id: id, postId: postId})

  const isLoading = isLoadingDelete || isLoadingUpdate
  const isError = isErrorDelete || isErrorUpdate

  useEffect(()=>{
    setUpdating(false)
  }, [isSuccessUpdate])

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isUpdating ? 
          <>
            <h5 className="card-title">
              <input className="form-control" type="text" value={comment.name} onChange={(e) => setComment({...comment, name: e.target.value})}/>
            </h5>
            <textarea className="form-control" rows={3} value={comment.body} onChange={(e) => setComment({...comment, body: e.target.value})}/>
          </>: 
          <>
            <h5 className="card-title">
              {name}
            </h5>
              <p className="card-text">{body}</p> 
          </>}
          <p className="card-text"><small className="text-body-secondary">id: {id} - post id: {postId} - user email: {email}</small></p>
          <button type="button" className="btn btn-primary mr-3" onClick={() => setUpdating(!isUpdating)} disabled={isLoading}>Update</button>
          <button type="button" className="btn btn-danger mr-3" onClick={()=> deleteComment({id})} disabled={isLoading}>Delete</button>
          {isUpdating &&
          <button type="button" className="btn btn-success" onClick={()=> updateComment({comment})}>Submit</button>
          }
          <p>{(isLoading && 'Loading...') || (isError && 'Error')}</p>
      </div>        
    </div>
  )
}

export default Comment;
  