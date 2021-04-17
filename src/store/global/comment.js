import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

const initStates = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        pathname: ''
    }
}

const reducers = {
    ['recevieCommentList']: (state, { payload }) => {
        const { list, pathname, hasNext, hasPrev, page } = payload
        let data
        if (page === 1) {
            data = [].concat(list)
        } else {
            data = state.lists.data.concat(list)
        }
        state.lists = {
            data,
            hasNext,
            hasPrev,
            page: page + 1,
            pathname
        }
    },
    ['insertCommentItem']: (state, { payload }) => {
        const data = [payload.item].concat(state.lists.data)
        state.lists.data = data
    },
    ['deleteComment']: (state, { payload }) => {
        const obj = state.lists.data.find(ii => ii._id === payload.id)
        if (obj) obj.is_delete = 1
    },
    ['recoverComment']: (state, { payload }) => {
        const obj = state.lists.data.find(ii => ii._id === payload.id)
        if (obj) obj.is_delete = 0
    }
}

export const slice = createSlice({
    name: 'comment',
    initialState: initStates,
    reducers
})

export const { recevieCommentList, insertCommentItem, deleteComment, recoverComment } = slice.actions

export const getCommentList = config => {
    return async dispatch => {
        const { code, data } = await api.get('frontend/comment/list', config)
        if (code === 200) {
            dispatch(recevieCommentList({ ...data, ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const commentState = state => state.comment.lists

export default slice.reducer
