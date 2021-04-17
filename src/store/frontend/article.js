import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

const initialState = {
    data: {},
    pathname: '',
    isLoad: false
}

const reducers = {
    ['receiveArticleItem']: (state, { payload }) => {
        state.data = payload.data
        state.pathname = payload.pathname
        state.isLoad = true
    },
    ['updateArticleLikeState']: (state, { payload }) => {
        if (state.data._id === payload.id) {
            const { like, like_status } = state.data
            state.data = {
                ...state.data,
                like_status: !like_status,
                like: like_status ? like - 1 : like + 1
            }
        }
    }
}

export const slice = createSlice({
    name: 'article',
    initialState,
    reducers
})

export const { receiveArticleItem, updateArticleLikeState } = slice.actions

export const getArticleItem = config => {
    return async dispatch => {
        const { code, data } = await api.get('frontend/article/item', config)
        if (code === 200) {
            dispatch(receiveArticleItem({ data, ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const articleState = state => state.article

export default slice.reducer
