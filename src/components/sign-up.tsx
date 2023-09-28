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
                                    onChange={e => setState({ email: e.target.value })}
                                    placeholder="邮箱"
                                    type="text"
                                    value={state.email}
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
                            <div className="input-wrap">
                                <input
                                    autoComplete="off"
                                    className="base-input"
                                    onChange={e => setState({ re_password: e.target.value })}
                                    placeholder="重复密码"
                                    type="password"
                                    value={state.re_password}
                                />
                                <p className="error-info input-info hidden">长度至少 6 位</p>
                            </div>
                            <a className="btn signup-btn btn-yellow" href={undefined} onClick={handleRegister}>
                                确认注册
                            </a>
                            <a className="btn signup-btn btn-blue block" href={undefined} onClick={handleLogin}>
                                直接登录
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
