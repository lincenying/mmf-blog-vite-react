import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

const initialState = {
    lists: {
        hasNext: false,
        hasPrev: false,
        pathname: '',
        page: 1,
        data: []
    },
    item: {
        data: {},
        pathname: ''
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
        const { data, pathname } = payload
        state.item = {
            data,
            pathname
        }
    },
    ['update']: (state, { payload }) => {
        const { data } = payload
        const index = state.lists.data.findIndex(ii => ii._id === data._id)
        if (index > -1) {
            state.lists.data.splice(index, 1, data)
        }
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
    name: 'backendUser',
    initialState,
    reducers
})

export const { receive, insert, update, deletes, recover } = slice.actions

export const getUserList = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/user/list', config)
        if (code === 200) {
            dispatch(receive({ ...data, ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}
export const getUserItem = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/user/item', config)
        if (code === 200) {
            dispatch(insert({ data, ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const backendUserState = state => state.backendUser

export default slice.reducer
