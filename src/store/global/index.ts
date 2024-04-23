import cookies from 'js-cookie'

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'
import type { GlobalStore, Message, UserCookies } from '@/types'

let userid = cookies.get('userid')
if (userid) {
    userid = userid.replace('j:"', '').replace('"', '')
}

const initialState: GlobalStore = {
    cookies: {
        b_user: cookies.get('b_user'),
        user: cookies.get('user'),
        userid,
        username: cookies.get('username'),
        useremail: cookies.get('useremail'),
    },
    showLoginModal: false,
    showRegisterModal: false,
    message: {
        type: 'success',
        content: '',
    },
}

export const slice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<{ message: Message }>) => {
            let message = action.payload.message
            if (typeof message === 'string') {
                message = {
                    type: 'success',
                    title: '',
                    content: message,
                }
            }
            state.message = message
        },
        receiveCookies: (state, action: PayloadAction<UserCookies>) => {
            const { payload } = action
            state.cookies = {
                b_user: payload.b_user,
                user: payload.user,
                userid: payload.userid,
                username: payload.username,
                useremail: payload.useremail,
            }
        },
        showLoginModal: (state, action: PayloadAction<boolean>) => {
            const { payload } = action
            state.showLoginModal = payload
        },
        showRegisterModal: (state, action: PayloadAction<boolean>) => {
            const { payload } = action
            state.showRegisterModal = payload
        },
    },
})

export const { setMessage, receiveCookies, showLoginModal, showRegisterModal } = slice.actions

export function setCookis(config: UserCookies) {
    return receiveCookies(config)
}

interface ErrConfig {
    type: string
    message: Message
}

export const errConfig: ErrConfig = {
    type: 'setMessage',
    message: {
        type: 'error',
        content: 'api 接口错误',
    },
}

export const globalState = (state: RootState) => state.global

export default slice.reducer
