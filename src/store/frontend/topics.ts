import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { errConfig, setMessage } from '../global'
import type { RootState } from '..'
import api from '@/api'
import type { Article, ArticleStoreList } from '@/types'

const initialState: { lists: ArticleStoreList } = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        pathname: '',
    },
}

export const slice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        receiveTopics: (state, action: PayloadAction<Record<string, any>>) => {
            const { list, hasNext, page, pathname } = action.payload
            const lists = page === 1 ? [].concat(list) : state.lists.data.concat(list)
            state.lists = {
                data: lists,
                hasNext,
                page,
                pathname,
            }
        },
        updateTopicsLikeState: (state, action: PayloadAction<string>) => {
            const obj = state.lists.data.find(item => item._id === action.payload)
            if (obj) {
                obj.like = obj.like_status ? obj.like - 1 : obj.like + 1
                obj.like_status = !obj.like_status
            }
        },
    },
})

export const { receiveTopics, updateTopicsLikeState } = slice.actions

export async function getTopics(config: Record<string, any>) {
    const { code, data } = await api.get<ResDataLists<Article[]>>('frontend/article/list', config)
    if (code === 200) {
        return receiveTopics({ ...data, ...config })
    }

    return setMessage(errConfig)
}

export const topicsState = (state: RootState) => state.topics.lists

export default slice.reducer
