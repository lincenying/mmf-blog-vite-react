import cookies from 'js-cookie'

import { createSlice } from '@reduxjs/toolkit'

let userid = cookies.get('userid')
if (userid) userid = userid.replace('j:"', '').replace('"', '')

export const slice = createSlice({
    name: 'global',
    initialState: {
        cookies: {
            b_user: cookies.get('b_user'),
            user: cookies.get('user'),
            userid,
            username: cookies.get('username'),
            useremail: cookies.get('useremail')
        },
        showLoginModal: false,
        showRegisterModal: false,
        message: {}
    },
    reducers: {
        ['setMessage']: (state, action) => {
            let message = action.payload.message
            if (typeof message === 'string') {
                message = {
                    type: 'success',
                    title: '',
                    content: message
                }
            }
            state.message = message
        },
        ['receiveCookies']: (state, { payload }) => {
            state.cookies = {
                b_user: payload.b_user,
                user: payload.user,
                userid: payload.userid,
                username: payload.username,
                useremail: payload.useremail
            }
        },
        ['showLoginModal']: (state, { payload }) => {
            state.showLoginModal = payload
        },
        ['showRegisterModal']: (state, { payload }) => {
            state.showRegisterModal = payload
        }
    }
})

export const { setMessage, receiveCookies, showLoginModal, showRegisterModal } = slice.actions

export const setCookis = config => async dispatch => {
    dispatch(receiveCookies(config))
}

export const errConfig = {
    type: 'setMessage',
    message: {
        type: 'error',
        content: 'api 接口错误'
    }
}

export const globalState = state => state.global

export default slice.reducer
