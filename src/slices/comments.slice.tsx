import { createSlice } from '@reduxjs/toolkit'
import { CommentProps } from '../types'

interface CommentsState {
  list: Array<CommentProps>
}

const initialState = { list: [] } satisfies CommentsState as CommentsState

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action){
        state.list = action.payload
    },
    createComment(state, action){
      let newList = state.list 
      newList.unshift(action.payload)
      state.list = newList
    },
    updateComment(state, action){
      let id = action.payload.id
      let index = state.list.findIndex((obj) => obj.id === id);
      let newArray = state.list
      state.list[index] = action.payload
      if(index !== -1)
        state.list = newArray
      else 
        state.list = state.list

    },
    deleteComment(state, action){
      let id = action.payload.id 
      let index = state.list.findIndex((obj) => obj.id === id);
      let newArray = state.list
      newArray.splice(index,1)
      
      if(index !== -1)
        state.list = newArray
      else 
        state.list = state.list
    }
  },
})

export const { setComments, createComment, updateComment, deleteComment} = commentsSlice.actions
export default commentsSlice.reducer