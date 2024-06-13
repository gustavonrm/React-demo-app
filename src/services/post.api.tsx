import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CommentProps, PostProps } from '../types'
import { createComment, deleteComment, setComments, updateComment } from '../slices/comments.slice';


// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostProps, void>({
      query: () => 'posts/'
    }),
    getComments: builder.query<CommentProps, { id: any } >({
      query: ({id}) => id === undefined ? `comments/` :  `/comments?postId=${id}` ,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        // TODO: improve, convert this to a hash, so the code bellow gets improved on teh reducer
        dispatch(setComments(data));
      },
    }),
    createComment: builder.mutation<CommentProps, {postId: string, name: string, body: string}>({
      query: ({ postId, name, body }) => ({
        url: 'comments/',
        method: 'POST',
        body: {
          postId: postId,
          name: name,
          body: body,
          userId: 1, // making the assumption we are user 1 already logged
        },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const {data} = await queryFulfilled;
        dispatch(createComment(data));
      },
    }),
    updateComment: builder.mutation<CommentProps, {comment: CommentProps}>({
      query: ({ comment }) => ({
        url: `comments/${comment.id}`,
        method: 'PUT',
        body: {
          postId: comment.postId,
          id: comment.id,
          name: comment.name,
          email: comment.email,
          body: comment.body
        },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const {data} = await queryFulfilled;
        dispatch(updateComment(data));
      },
    }),
    deleteComment: builder.mutation<CommentProps,  { id: number}>({
      query: ({ id }) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteComment(id));
      },
    })
  }),
})

export const { useGetPostsQuery, useGetCommentsQuery, useUpdateCommentMutation, useDeleteCommentMutation, useCreateCommentMutation } = postApi