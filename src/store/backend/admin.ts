import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { errConfig, setMessage } from '../global'
import type { RootState } from '..'
import api from '@/api'
import type { AdminStore, AdminStoreItem, User } from '@/types'

const initialState: AdminStore = {
    lists: {
        hasNext: 0,
        hasPrev: 0,
        pathname: '',
        page: 1,
        data: [],
    },
    item: {
        data: null,
        pathname: '',
    },
}

export const slice = createSlice({
    name: 'backendAdmin',
    initialState,
    reducers: {
        receiveAdminList: (state, action: PayloadAction<Record<string, any>>) => {
            const { list, pathname, hasNext, hasPrev, page } = action.payload
            let data
            if (page === 1)
                data = [].concat(list)

            else
                data = state.lists.data.concat(list)

            state.lists = {
                data,
                hasNext,
                hasPrev,
                page: page + 1,
                pathname,
            }
        },
        receiveAdminItem: (state, action: PayloadAction<AdminStoreItem>) => {
            const { data, pathname } = action.payload
            state.item = {
                data,
                pathname,
            }
        },
        updateAdminItem: (state, action: PayloadAction<User>) => {
            const { lists } = state
            const data = action.payload
            const index = lists.data.findIndex(ii => ii._id === data._id)
            if (index > -1)
                lists.data.splice(index, 1, data)

            state.lists = lists
        },
        deleteAdmin: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const obj = state.lists.data.find(ii => ii._id === id)
            if (obj)
                obj.is_delete = 1
        },
        recoverAdmin: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const obj = state.lists.data.find(ii => ii._id === id)
            if (obj)
                obj.is_delete = 0
        },
    },
})

export const { receiveAdminList, receiveAdminItem, updateAdminItem, deleteAdmin, recoverAdmin } = slice.actions

export async function getAdminList(config: Record<string, any>) {
    const { code, data } = await api.get<ResponseDataLists<User[]>>('backend/admin/list', config)
    if (code === 200)
        return receiveAdminList({ ...data, ...config })

    return setMessage(errConfig)
}
export async function getAdminItem(config: Record<string, any>) {
    const { code, data } = await api.get<User>('backend/admin/item', config)
    if (code === 200)
        return receiveAdminItem({ data, ...config })

    return setMessage(errConfig)
}

export const adminState = (state: RootState) => state.backendAdmin

export default slice.reducer
