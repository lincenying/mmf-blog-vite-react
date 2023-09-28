import React from 'react'

import api from '@/api'

import AInput from '@/components/a-input'

export default function Login() {
    const navigate = useNavigate()
    const [state, setState] = useSetState({
        username: '',
        password: '',
    })

    const handleLogin = useLockFn(async () => {
        if (!state.username || !state.password)
            return setMessage('请输入用户名和密码!')

        const { code, data } = await api.post<string>('backend/admin/login', state)
        if (data && code === 200)
            navigate('/backend/article/list')
    })

    return (
        <div className="main wrap">
            <div className="home-feeds cards-wrap">
                <div className="settings-main card">
                    <div className="settings-main-content">
                        <AInput title="昵称">
                            <input
                                className="base-input"
                                name="username"
                                onChange={e => setState({ username: e.target.value })}
                                placeholder="昵称"
                                type="text"
                                value={state.username}
                            />
                            <span className="input-info error">请输入昵称</span>
                        </AInput>
                        <AInput title="密码">
                            <input
                                className="base-input"
                                name="password"
                                onChange={e => setState({ password: e.target.value })}
                                placeholder="密码"
                                type="password"
                                value={state.password}
                            />
                            <span className="input-info error">请输入密码</span>
                        </AInput>
                    </div>
                    <div className="settings-footer">
                        <a className="btn btn-yellow" href={undefined} onClick={handleLogin}>登录</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
