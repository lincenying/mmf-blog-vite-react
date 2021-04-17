import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

const initialState = {
    data: []
}

const reducers = {
    ['receiveTrending']: (state, { payload }) => {
        state.data = payload.data
    },
    ['updateTrendingLikeState']: (state, { payload }) => {
        const data = state.data
        const obj = data.find(item => item._id === payload.id)
        if (obj) {
            obj.like = obj.like_status ? obj.like - 1 : obj.like + 1
            obj.like_status = !obj.like_status
        }
    }
}

export const slice = createSlice({
    name: 'trending',
    initialState,
    reducers
})

export const { receiveTrending, updateTrendingLikeState } = slice.actions

export const getTrending = () => {
    return async dispatch => {
        const { code, data } = await api.get('frontend/trending')
        if (data && code === 200) {
            dispatch(receiveTrending({ data: data.list }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const trendingState = state => state.trending

export default slice.reducer
