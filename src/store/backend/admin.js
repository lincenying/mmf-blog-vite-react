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
    ['receiveAdminList']: (state, { payload }) => {
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
    ['receiveAdminItem']: (state, { payload }) => {
        const { data, pathname } = payload
        state.item = {
            data,
            pathname
        }
    },
    ['updateAdminItem']: (state, { payload }) => {
        const { lists } = state
        const index = lists.data.findIndex(ii => ii._id === payload.data._id)
        if (index > -1) {
            lists.data.splice(index, 1, payload.data)
        }
        state.lists = lists
    },
    ['deleteAdmin']: (state, { payload }) => {
        const obj = state.lists.data.find(ii => ii._id === payload.id)
        if (obj) obj.is_delete = 1
    },
    ['recoverAdmin']: (state, { payload }) => {
        const obj = state.lists.data.find(ii => ii._id === payload.id)
        if (obj) obj.is_delete = 0
    }
}

export const slice = createSlice({
    name: 'backendAdmin',
    initialState,
    reducers
})

export const { receiveAdminList, receiveAdminItem, updateAdminItem, deleteAdmin, recoverAdmin } = slice.actions

export const getAdminList = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/admin/list', config)
        if (code === 200) {
            dispatch(receiveAdminList({ ...data, ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}
export const getAdminItem = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/admin/item', config)
        if (code === 200) {
            dispatch(receiveAdminItem({ data, ...config }))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const adminState = state => state.backendAdmin

export default slice.reducer
