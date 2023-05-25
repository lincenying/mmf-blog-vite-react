import React from 'react'

import api from '@/api'
import Account from '@/components/aside-account'
import AInput from '@/components/a-input'

import { globalState, setCookis } from '@/store/global'
import type { User } from '@/types'

export default function UserAccount() {
    const dispatch = useDispatch()
    const global = useSelector(globalState)

    const [state, setState] = useSetState({
        username: '',
        email: '',
    })

    const getUser = async () => {
        const { code, data } = await api.get<User>('frontend/user/account')
        if (code === 200) {
            setState({
                username: data.username,
                email: data.email,
            })
        }
    }

    useMount(async () => {
        console.log('user-account useMount: start')
        await getUser()
        console.log('user-account useMount: end')
    })

    const handleModify = useLockFn(async () => {
        const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i
        if (!state.email)
            return setMessage('请填写邮箱地址!')

        else if (!reg.test(state.email))
            return setMessage('邮箱格式错误!')

        const { code, message } = await api.post('frontend/user/account', {
            ...state,
            id: global.cookies.userid,
        })

        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(setCookis({
                ...global.cookies,
                useremail: state.email,
            }))
        }
    })

    return (
        <div className="main wrap">
            <div className="main-left">
                <div className="home-feeds cards-wrap">
                    <div className="settings-main card">
                        <div className="settings-main-content">
                            <AInput title="昵称">
                                <input value={state.username} type="text" placeholder="昵称" className="base-input" name="username" readOnly />
                                <span className="input-info error">请输入昵称</span>
                            </AInput>
                            <AInput title="邮箱">
                                <input
                                    value={state.email}
                                    onChange={e => setState({ email: e.target.value })}
                                    type="text"
                                    placeholder="邮箱"
                                    className="base-input"
                                    name="email"
                                />
                                <span className="input-info error">请输入邮箱</span>
                            </AInput>
                        </div>
                        <div className="settings-footer">
                            <a onClick={handleModify} href={undefined} className="btn btn-yellow">保存设置</a>
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
