import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '..'
import { errConfig, setMessage } from '.'
import api from '@/api'
import type { Comment, CommentStore } from '@/types'

const initialState: CommentStore = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        pathname: '',
    },
}

export const slice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        recevieCommentList: (state, action: PayloadAction<Record<string, any>>) => {
            const { list, pathname, hasNext, hasPrev, page } = action.payload
            let data
            if (page === 1)
                data = [].concat(list)

            else
                data = state.lists.data.concat(list)

            state.lists = {
                data,
                hasNext,
                hasPrev,
                page: page + 1,
                pathname,
            }
        },
        insertCommentItem: (state, action: PayloadAction<Comment>) => {
            const data = [action.payload].concat(state.lists.data)
            state.lists.data = data
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            const obj = state.lists.data.find(ii => ii._id === action.payload)
            if (obj)
                obj.is_delete = 1
        },
        recoverComment: (state, action: PayloadAction<string>) => {
            const obj = state.lists.data.find(ii => ii._id === action.payload)
            if (obj)
                obj.is_delete = 0
        },
    },
})

export const { recevieCommentList, insertCommentItem, deleteComment, recoverComment } = slice.actions

export async function getCommentList(config: Record<string, any>) {
    const { code, data } = await api.get<ResDataLists<Comment>>('frontend/comment/list', config)
    if (code === 200)
        return recevieCommentList({ ...data, ...config })

    return setMessage(errConfig)
}

export const commentState = (state: RootState) => state.comment.lists

export default slice.reducer
