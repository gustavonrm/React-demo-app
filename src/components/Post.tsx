import React from 'react';
import { PostProps } from '../types'

function Post({body, id, title, userId}: PostProps) {
  return (
    <div className="card mb-3">
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
            <p className="card-text"><small className="text-body-secondary">id: {id} - created by: {userId}</small></p>
            <p className="card-text"><a href={'/comments/'+id} ><small className="text-body-secondary">see comments</small></a></p>
        </div>
    </div>
  )
}

export default Post;
  