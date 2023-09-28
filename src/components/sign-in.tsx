import React from 'react'

import api from '@/api'

import { globalState, showLoginModal, showRegisterModal } from '@/store/global'

export default function SignIn() {
    const dispatch = useDispatch()
    const global = useSelector(globalState)

    const [state, setState] = useSetState({
        username: '',
        password: '',
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
                <a className="modal-close" href={undefined} onClick={handleClose}>
                    <i className="icon icon-close-black" />
                </a>
                <div className="modal-content">
                    <div className="signup-form">
                        <form action="#">
                            <div className="input-wrap">
                                <input
                                    autoComplete="off"
                                    className="base-input"
                                    onChange={e => setState({ username: e.target.value })}
                                    placeholder="昵称"
                                    type="text"
                                    value={state.username}
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input
                                    autoComplete="off"
                                    className="base-input"
                                    onChange={e => setState({ password: e.target.value })}
                                    placeholder="密码"
                                    type="password"
                                    value={state.password}
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                        </form>
                        <a className="btn signup-btn btn-yellow" href={undefined} onClick={handleLogin}>
                            确认登录
                        </a>
                        <a className="btn signup-btn btn-blue block" href={undefined} onClick={handleRegister}>
                            我要注册
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
