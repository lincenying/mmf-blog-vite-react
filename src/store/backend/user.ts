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

const reducers = {
    receive: (state: AdminStore, action: PayloadAction<Record<string, any>>) => {
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
    insert: (state: AdminStore, action: PayloadAction<AdminStoreItem>) => {
        const { data, pathname } = action.payload
        state.item = {
            data,
            pathname,
        }
    },
    update: (state: AdminStore, action: PayloadAction<User>) => {
        const data = action.payload
        const index = state.lists.data.findIndex(ii => ii._id === data?._id)
        if (index > -1)
            state.lists.data.splice(index, 1, data)
    },
    deletes: (state: AdminStore, action: PayloadAction<string>) => {
        const obj = state.lists.data.find(ii => ii._id === action.payload)
        if (obj) obj.is_delete = 1
    },
    recover: (state: AdminStore, action: PayloadAction<string>) => {
        const obj = state.lists.data.find(ii => ii._id === action.payload)
        if (obj) obj.is_delete = 0
    },
}

export const slice = createSlice({
    name: 'backendUser',
    initialState,
    reducers,
})

export const { receive: backendUserReceive, insert: backendUserInsert, update: backendUserUpdate, deletes: backendUserDelete, recover: backendUserRecover } = slice.actions

export const getUserList = async (config: Record<string, any>) => {
    const { code, data } = await api.get('backend/user/list', config)
    if (code === 200)
        return backendUserReceive({ ...data, ...config })

    return setMessage(errConfig)
}
export const getUserItem = async (config: Record<string, any>) => {
    const { code, data } = await api.get('backend/user/item', config)
    if (code === 200)
        return backendUserInsert({ data, ...config })

    return setMessage(errConfig)
}

export const backendUserState = (state: RootState) => state.backendUser

export default slice.reducer
