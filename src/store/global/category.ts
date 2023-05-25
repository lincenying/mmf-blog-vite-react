import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '..'
import { errConfig, setMessage } from '.'

import api from '@/api'
import type { Category, CategoryStore } from '@/types'

const initialState: CategoryStore = {
    lists: [],
    item: {
        data: null,
    },
}

export const slice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        receiveCategoryList: (state, action: PayloadAction<Category[]>) => {
            state.lists = action.payload
        },
        receiveCategoryItem: (state, action: PayloadAction<Category>) => {
            state.item.data = action.payload
        },
        insertCategoryItem: (state, action: PayloadAction<Category>) => {
            state.lists.unshift(action.payload)
        },
        updateCategoryItem: (state, action: PayloadAction<Category>) => {
            const index = state.lists.findIndex(ii => ii._id === action.payload._id)
            if (index > -1)
                state.lists.splice(index, 1, action.payload)

            state.item.data = action.payload
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            const obj = state.lists.find(ii => ii._id === action.payload)
            if (obj)
                obj.is_delete = 1
        },
        recoverCategory: (state, action: PayloadAction<string>) => {
            const obj = state.lists.find(ii => ii._id === action.payload)
            if (obj)
                obj.is_delete = 0
        },
    },
})

export const {
    receiveCategoryList,
    receiveCategoryItem,
    insertCategoryItem,
    updateCategoryItem,
    deleteCategory,
    recoverCategory,
} = slice.actions

export async function getCategoryList(config?: Record<string, any>) {
    const { code, data } = await api.get<ResponseDataList<Category[]>>('backend/category/list', config)
    if (code === 200)
        return receiveCategoryList(data.list)

    return setMessage(errConfig)
}
export async function getCategoryItem(config: Record<string, any>) {
    const { code, data } = await api.get<Category>('backend/category/item', config)
    if (code === 200)
        return receiveCategoryItem(data)

    return setMessage(errConfig)
}

export const categoryState = (state: RootState) => state.category

export default slice.reducer
