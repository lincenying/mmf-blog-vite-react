import React from 'react'
import { useSetState } from 'ahooks'

import api from '@/api'
import { setMessage } from '@/utils'

import AInput from '@/components/_input.jsx'

export default function Login(props) {
    const [state, setState] = useSetState({
        username: '',
        password: ''
    })

    const handleLogin = async () => {
        if (!state.username || !state.password) {
            return setMessage('请输入用户名和密码!')
        }
        const { code, data } = await api.post('backend/admin/login', state)
        if (data && code === 200) {
            props.history.push('/backend/article/list')
        }
    }

    return (
        <div className="main wrap">
            <div className="home-feeds cards-wrap">
                <div className="settings-main card">
                    <div className="settings-main-content">
                        <AInput title="昵称">
                            <input
                                value={state.username}
                                onChange={e => setState({ username: e.target.value })}
                                type="text"
                                placeholder="昵称"
                                className="base-input"
                                name="username"
                            />
                            <span className="input-info error">请输入昵称</span>
                        </AInput>
                        <AInput title="密码">
                            <input
                                value={state.password}
                                onChange={e => setState({ password: e.target.value })}
                                type="password"
                                placeholder="密码"
                                className="base-input"
                                name="password"
                            />
                            <span className="input-info error">请输入密码</span>
                        </AInput>
                    </div>
                    <div className="settings-footer">
                        <a onClick={handleLogin} href={null} className="btn btn-yellow">
                            登录
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
