import React from 'react'

import api from '@/api'
import AInput from '@/components/a-input'
import Account from '@/components/aside-account'

export default function UserPassword() {
    const [state, setState] = useSetState({
        old_password: '',
        password: '',
        re_password: '',
    })

    const handleModify = useLockFn(async () => {
        if (!state.password || !state.old_password || !state.re_password) {
            return setMessage('请将表单填写完整!')
        }

        else if (state.password !== state.re_password) {
            return setMessage('两次密码输入不一致!')
        }

        const { code, message } = await api.post('frontend/user/password', state)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            setState({
                old_password: '',
                password: '',
                re_password: '',
            })
        }
    })

    return (
        <div className="main wrap">
            <div className="main-left">
                <div className="home-feeds cards-wrap">
                    <div className="settings-main card">
                        <div className="settings-main-content">
                            <AInput title="当前密码">
                                <input
                                    className="base-input"
                                    name="old_password"
                                    onChange={e => setState({ old_password: e.target.value })}
                                    placeholder="当前密码"
                                    type="password"
                                    value={state.old_password}
                                />
                            </AInput>
                            <AInput title="新的密码">
                                <input
                                    className="base-input"
                                    name="password"
                                    onChange={e => setState({ password: e.target.value })}
                                    placeholder="新的密码"
                                    type="password"
                                    value={state.password}
                                />
                            </AInput>
                            <AInput title="确认密码">
                                <input
                                    className="base-input"
                                    name="re_password"
                                    onChange={e => setState({ re_password: e.target.value })}
                                    placeholder="确认密码"
                                    type="password"
                                    value={state.re_password}
                                />
                            </AInput>
                        </div>
                        <div className="settings-footer">
                            <a className="btn btn-yellow" href={undefined} onClick={handleModify}>保存设置</a>
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
