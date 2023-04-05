import { configureStore } from '@reduxjs/toolkit'
import { routerReducer } from 'react-router-redux'

import backendAdmin from './backend/admin'
import backendArticle from './backend/article'
import backendUser from './backend/user'
import article from './frontend/article'
import topics from './frontend/topics'
import trending from './frontend/trending'
import global from './global'
import category from './global/category'
import comment from './global/comment'

const store = configureStore({
    reducer: {
        global,
        comment,
        article,
        topics,
        trending,
        category,
        backendAdmin,
        backendArticle,
        backendUser,
        routing: routerReducer,
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
