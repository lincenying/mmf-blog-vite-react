import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { errConfig, setMessage } from '../global'
import type { RootState } from '..'
import api from '@/api'
import type { Article, ArticleStoreList } from '@/types'

const initialState: {
    lists: ArticleStoreList
} = {
    lists: {
        data: [],
        path: '',
        hasNext: 0,
        hasPrev: 0,
        page: 1,
    },
}

export const slice = createSlice({
    name: 'backendArticle',
    initialState,
    reducers: {
        receive: (state, action: PayloadAction<Record<string, any>>) => {
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
        insert: (state, action: PayloadAction<Article>) => {
            const data = [action.payload].concat(state.lists.data)
            state.lists.data = data
        },
        update: (state, action: PayloadAction<Article>) => {
            const data = action.payload
            const index = state.lists.data.findIndex(ii => ii._id === data._id)
            if (index > -1) state.lists.data[index] = data
        },
        deletes: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const obj = state.lists.data.find(ii => ii._id === id)
            if (obj) obj.is_delete = 1
        },
        recover: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const obj = state.lists.data.find(ii => ii._id === id)
            if (obj) obj.is_delete = 0
        },
    },
})

export const {
    receive: backendArticleReceive,
    insert: backendArticleInsert,
    update: backendArticleUpdate,
    deletes: backendArticleDelete,
    recover: backendArticleRecover,
} = slice.actions

export const getArticleList = async (config: Record<string, any>) => {
    const { code, data } = await api.get('backend/article/list', config)
    if (code === 200)
        return backendArticleReceive({ ...data, ...config })

    return setMessage(errConfig)
}

export const deleteArticle = async (config: Record<string, any>) => {
    const { code } = await api.get('backend/article/delete', config)
    if (code === 200)
        return backendArticleDelete(config.id)

    return setMessage(errConfig)
}
export const recoverArticle = async (config: Record<string, any>) => {
    const { code } = await api.get('backend/article/recover', config)
    if (code === 200)
        return backendArticleRecover(config.id)

    return setMessage(errConfig)
}

export const backendArticleState = (state: RootState) => state.backendArticle.lists

export default slice.reducer
