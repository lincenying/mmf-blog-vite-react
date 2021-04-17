import React from 'react'
import { useSetState } from 'ahooks'

import api from '@/api'
import Account from '@/components/aside-account.jsx'
import AInput from '@/components/_input.jsx'
import { setMessage } from '@/utils'

export default function UserPassword() {
    const [state, setState] = useSetState({
        old_password: '',
        password: '',
        re_password: ''
    })

    const handleModify = async () => {
        if (!state.password || !state.old_password || !state.re_password) {
            return setMessage('请将表单填写完整!')
        } else if (state.password !== state.re_password) {
            return setMessage('两次密码输入不一致!')
        }
        const { code, data } = await api.post('frontend/user/password', state)
        if (code === 200) {
            setMessage({ type: 'success', content: data })
            setState({
                old_password: '',
                password: '',
                re_password: ''
            })
        }
    }

    return (
        <div className="main wrap">
            <div className="main-left">
                <div className="home-feeds cards-wrap">
                    <div className="settings-main card">
                        <div className="settings-main-content">
                            <AInput title="当前密码">
                                <input
                                    value={state.old_password}
                                    onChange={e => setState({ old_password: e.target.value })}
                                    type="password"
                                    placeholder="当前密码"
                                    className="base-input"
                                    name="old_password"
                                />
                            </AInput>
                            <AInput title="新的密码">
                                <input
                                    value={state.password}
                                    onChange={e => setState({ password: e.target.value })}
                                    type="password"
                                    placeholder="新的密码"
                                    className="base-input"
                                    name="password"
                                />
                            </AInput>
                            <AInput title="确认密码">
                                <input
                                    value={state.re_password}
                                    onChange={e => setState({ re_password: e.target.value })}
                                    type="password"
                                    placeholder="确认密码"
                                    className="base-input"
                                    name="re_password"
                                />
                            </AInput>
                        </div>
                        <div className="settings-footer">
                            <a onClick={handleModify} href={null} className="btn btn-yellow">
                                保存设置
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-right">
                <Account />
            </div>
        </div>
    )
}
