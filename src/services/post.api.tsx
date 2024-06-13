import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CommentProps, PostProps } from '../types'
import { deleteComment, setComments, updateComment } from '../slices/comments.slice';


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
        // TODO: improve, convert this to a hash
        dispatch(setComments(data));
      },
    }),
    // postComment: builder.mutation<CommentProps,  { id: number}>({
    //   query: ({ id }) => ({
    //     url: `comments/${id}`,
    //     method: 'DELETE',
    //   }),
    // }),
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

export const { useGetPostsQuery, useGetCommentsQuery, useUpdateCommentMutation, useDeleteCommentMutation } = postApi