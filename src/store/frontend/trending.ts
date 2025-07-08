import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

import type { Article } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import api from '@/api'
import { errConfig, setMessage } from '../global'

const initialState: { data: Article[] } = {
    data: [],
}

export const slice = createSlice({
    name: 'trending',
    initialState,
    reducers: {
        receiveTrending: (state, action: PayloadAction<{ data: Article[] }>) => {
            state.data = action.payload.data
        },
        updateTrendingLikeState: (state, action: PayloadAction<string>) => {
            const data = state.data
            const obj = data.find(item => item._id === action.payload)
            if (obj) {
                obj.like = obj.like_status ? obj.like - 1 : obj.like + 1
                obj.like_status = !obj.like_status
            }
        },
    },
})

export const { receiveTrending, updateTrendingLikeState } = slice.actions

export async function getTrending() {
    const { code, data } = await api.get<ResDataList<Article[]>>('frontend/trending', {})
    if (data && code === 200) {
        return receiveTrending({ data: data.list })
    }

    return setMessage(errConfig)
}

export const trendingState = (state: RootState) => state.trending

export default slice.reducer
