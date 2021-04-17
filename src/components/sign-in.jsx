import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSetState } from 'ahooks'

import api from '@/api'
import { setMessage } from '@/utils'

import { globalState, showLoginModal, showRegisterModal } from '@/store/global'

export default function SignIn() {
    const dispatch = useDispatch()
    const global = useSelector(globalState)

    const [state, setState] = useSetState({
        username: '',
        password: ''
    })

    const handleLogin = async () => {
        if (!state.username || !state.password) {
            setMessage('请将表单填写完整!')
            return
        }
        const { code, message } = await api.post('frontend/user/login', state)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            setTimeout(() => {
                window.location.reload()
            }, 500)
        }
    }
    const handleRegister = () => {
        dispatch(showLoginModal(false))
        dispatch(showRegisterModal(true))
    }
    const handleClose = () => {
        dispatch(showLoginModal(false))
    }
    return (
        <div className={global.showLoginModal ? 'modal-wrap modal-signin-wrap active' : 'modal-wrap modal-signin-wrap'}>
            <span className="center-helper" />
            <div className="modal modal-signup">
                <h2 className="modal-title">登录</h2>
                <a onClick={handleClose} href={null} className="modal-close">
                    <i className="icon icon-close-black" />
                </a>
                <div className="modal-content">
                    <div className="signup-form">
                        <form action="#">
                            <div className="input-wrap">
                                <input
                                    type="text"
                                    value={state.username}
                                    onChange={e => setState({ username: e.target.value })}
                                    placeholder="昵称"
                                    className="base-input"
                                    autoComplete="off"
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input
                                    type="password"
                                    value={state.password}
                                    onChange={e => setState({ password: e.target.value })}
                                    placeholder="密码"
                                    className="base-input"
                                    autoComplete="off"
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                        </form>
                        <a onClick={handleLogin} href={null} className="btn signup-btn btn-yellow">
                            确认登录
                        </a>
                        <a onClick={handleRegister} href={null} className="btn signup-btn btn-blue block">
                            我要注册
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
