import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
//APIS
import { postApi } from './services/post.api'
import commentsSlice from './slices/comments.slice'

//SLICES


export const store = configureStore({
  reducer: {
    comments: commentsSlice,
    [postApi.reducerPath]: postApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

setupListeners(store.dispatch)

export type IRootState = ReturnType<typeof store.getState>

