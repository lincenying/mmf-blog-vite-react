import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

const initialState = {
    lists: {
        data: [],
        path: '',
        hasNext: 0,
        hasPrev: 0,
        page: 1
    }
}

const reducers = {
    ['receive']: (state, { payload }) => {
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
    ['insert']: (state, { payload }) => {
        const data = [payload.item].concat(state.lists.data)
        state.lists.data = data
    },
    ['update']: (state, { payload }) => {
        const { data } = payload
        const index = state.lists.data.findIndex(ii => ii._id === data._id)
        if (index > -1) state.lists.data[index] = data
    },
    ['deletes']: (state, { payload }) => {
        const obj = state.lists.data.find(ii => ii._id === payload.id)
        if (obj) obj.is_delete = 1
    },
    ['recover']: (state, { payload }) => {
        const obj = state.lists.data.find(ii => ii._id === payload.id)
        if (obj) obj.is_delete = 0
    }
}

export const slice = createSlice({
    name: 'backendArticle',
    initialState,
    reducers
})

export const { receive, insert, update, deletes, recover } = slice.actions

export const getArticleList = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/article/list', config)
        if (code === 200) {
            dispatch(receive({ ...data, ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const deleteArticle = config => {
    return async dispatch => {
        const { code } = await api.get('backend/article/delete', config)
        if (code === 200) {
            dispatch(deletes({ ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}
export const recoverArticle = config => {
    return async dispatch => {
        const { code } = await api.get('backend/article/recover', config)
        if (code === 200) {
            dispatch(recover({ ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const backendArticleState = state => state.backendArticle.lists

export default slice.reducer
