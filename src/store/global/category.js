import { createSlice } from '@reduxjs/toolkit'

import api from '@/api'
import { setMessage, errConfig } from '../global'

export const slice = createSlice({
    name: 'category',
    initialState: {
        lists: [],
        item: {}
    },
    reducers: {
        ['receiveCategoryList']: (state, { payload }) => {
            state.lists = payload
        },
        ['receiveCategoryItem']: (state, { payload }) => {
            state.item = payload
        },
        ['insertCategoryItem']: (state, { payload }) => {
            state.lists.unshift(payload.item)
        },
        ['updateCategoryItem']: (state, { payload }) => {
            const index = state.lists.findIndex(ii => ii._id === payload.data._id)
            if (index > -1) {
                state.lists.splice(index, 1, payload.data)
            }
            state.item = payload.data
        },
        ['deleteCategory']: (state, { payload }) => {
            const obj = state.lists.find(ii => ii._id === payload.id)
            if (obj) obj.is_delete = 1
        },
        ['recoverCategory']: (state, { payload }) => {
            const obj = state.lists.find(ii => ii._id === payload.id)
            if (obj) obj.is_delete = 0
        }
    }
})

export const { receiveCategoryList, receiveCategoryItem, insertCategoryItem, updateCategoryItem, deleteCategory, recoverCategory } = slice.actions

export const getCategoryList = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/category/list', config)
        if (code === 200) {
            dispatch(receiveCategoryList(data.list))
            return
        }
        dispatch(setMessage(errConfig))
    }
}
export const getCategoryItem = config => {
    return async dispatch => {
        const { code, data } = await api.get('backend/category/item', config)
        if (code === 200) {
            dispatch(receiveCategoryItem(data))
            return
        }
        dispatch(setMessage(errConfig))
    }
}

export const categoryState = state => state.category

export default slice.reducer
