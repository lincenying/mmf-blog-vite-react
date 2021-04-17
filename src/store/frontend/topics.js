import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

const initialState = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        pathname: ''
    }
}

const reducers = {
    ['receiveTopics']: (state, { payload }) => {
        const { list, hasNext, page, pathname } = payload
        const lists = page === 1 ? [].concat(list) : state.lists.data.concat(list)
        state.lists = {
            data: lists,
            hasNext,
            page,
            pathname
        }
    },
    ['updateTopicsLikeState']: (state, { payload }) => {
        const obj = state.lists.data.find(item => item._id === payload.id)
        if (obj) {
            obj.like = obj.like_status ? obj.like - 1 : obj.like + 1
            obj.like_status = !obj.like_status
        }
    }
}

export const slice = createSlice({
    name: 'topics',
    initialState,
    reducers
})

export const { receiveTopics, updateTopicsLikeState } = slice.actions

export const getTopics = config => {
    return async dispatch => {
        const { code, data } = await api.get('frontend/article/list', config)
        if (code === 200) {
            dispatch(receiveTopics({ ...data, ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const topicsState = state => state.topics.lists

export default slice.reducer
