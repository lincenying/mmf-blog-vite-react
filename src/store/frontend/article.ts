import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

import type { Article, ArticleItemConfig } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import api from '@/api'
import { errConfig, setMessage } from '../global'

const initialState: ArticleItemConfig = {
    data: null,
    pathname: '',
    isLoad: false,
}

const reducers = {
    receiveArticleItem: (state: ArticleItemConfig, action: PayloadAction<ArticleItemConfig>) => {
        state.data = action.payload.data
        state.pathname = action.payload.pathname
        state.isLoad = true
    },
    updateArticleLikeState: (state: ArticleItemConfig, action: PayloadAction<string>) => {
        if (state.data?._id === action.payload) {
            const { like, like_status } = state.data
            state.data = {
                ...state.data,
                like_status: !like_status,
                like: like_status ? like - 1 : like + 1,
            }
        }
    },
}

export const slice = createSlice({
    name: 'article',
    initialState,
    reducers,
})

export const { receiveArticleItem, updateArticleLikeState } = slice.actions

export async function getArticleItem(config: Record<string, any>) {
    const { code, data } = await api.get<Article>('frontend/article/item', config)
    if (code === 200) {
        return receiveArticleItem({ data, ...config })
    }

    return setMessage(errConfig)
}

export const articleState = (state: RootState) => state.article

export default slice.reducer
