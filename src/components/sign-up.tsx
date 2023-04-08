import React from 'react'

import api from '@/api'
import { strlen } from '@/utils'

import { globalState, showLoginModal, showRegisterModal } from '@/store/global'

export default function SignUp() {
    const dispatch = useDispatch()
    const global = useSelector(globalState)

    const [state, setState] = useSetState({
        username: '',
        email: '',
        password: '',
        re_password: '',
    })

    const handleLogin = () => {
        dispatch(showLoginModal(true))
        dispatch(showRegisterModal(false))
    }
    const handleRegister = useLockFn(async () => {
        if (!state.username || !state.password || !state.email)
            return setMessage('请将表单填写完整!')

        else if (strlen(state.username) < 4)
            return setMessage('用户长度至少 2 个中文或 4 个英文!')

        else if (strlen(state.password) < 8)
            return setMessage('密码长度至少 8 位!')

        else if (state.password !== state.re_password)
            return setMessage('密码和重复密码不一致!')

        const { code, message } = await api.post('frontend/user/insert', state)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            handleLogin()
        }
    })
    const handleClose = () => {
        dispatch(showRegisterModal(false))
    }
    return (
        <div className={global.showRegisterModal ? 'modal-wrap modal-signup-wrap active' : 'modal-wrap modal-signup-wrap'}>
            <span className="center-helper" />
            <div className="modal modal-signup">
                <h2 className="modal-title">注册</h2>
                <a onClick={handleClose} href={undefined} className="modal-close">
                    <i className="icon icon-close-black" />
                </a>
                <div className="modal-content">
                    <div className="signup-form">
                        <form action="#">
                            <div className="input-wrap">
                                <input
                                    value={state.username}
                                    onChange={e => setState({ username: e.target.value })}
                                    type="text"
                                    placeholder="昵称"
                                    className="base-input"
                                    autoComplete="off"
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input
                                    value={state.email}
                                    onChange={e => setState({ email: e.target.value })}
                                    type="text"
                                    placeholder="邮箱"
                                    className="base-input"
                                    autoComplete="off"
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input
                                    value={state.password}
                                    onChange={e => setState({ password: e.target.value })}
                                    type="password"
                                    placeholder="密码"
                                    className="base-input"
                                    autoComplete="off"
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <div className="input-wrap">
                                <input
                                    value={state.re_password}
                                    onChange={e => setState({ re_password: e.target.value })}
                                    type="password"
                                    placeholder="重复密码"
                                    className="base-input"
                                    autoComplete="off"
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <a onClick={handleRegister} href={undefined} className="btn signup-btn btn-yellow">
                                确认注册
                            </a>
                            <a onClick={handleLogin} href={undefined} className="btn signup-btn btn-blue block">
                                直接登录
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
