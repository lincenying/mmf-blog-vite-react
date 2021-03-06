import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useSetState, useUpdateEffect, usePrevious, useLockFn } from 'ahooks'
import { Link } from 'react-router-dom'

import api from '@/api'
import { getUserItem, backendUserState } from '@/store/backend/user'
import { setMessage } from '@/utils'

import AInput from '@/components/_input.jsx'

const UserModify = props => {
    const dispatch = useDispatch()
    const user = useSelector(backendUserState)

    const [state, setState] = useSetState({
        username: user.item.data.username || '',
        email: user.item.data.email || '',
        password: ''
    })

    useMount(() => {
        console.log('admin-modify useMount:')
        dispatch(getUserItem({ id: props.match.params.id }))
    })

    const prevUser = usePrevious(user)

    useUpdateEffect(() => {
        const { username, email } = user.item.data
        if (prevUser.item.data.username !== username) {
            setState({ username, email })
        }
    }, [user])

    const handleModify = useLockFn(async () => {
        if (!state.username || !state.email) {
            return setMessage('请将表单填写完整!')
        }
        const item = {
            ...state,
            id: props.match.params.id
        }
        const { code, data, message } = await api.post('backend/user/modify', item)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'backendUser/update', payload: { data } })
            props.history.push('/backend/user/list')
        }
    })

    return (
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
                <Link to="/backend/user/list" className="btn btn-blue">
                    返回
                </Link>
                <a onClick={handleModify} href={null} className="btn btn-yellow">
                    编辑用户
                </a>
            </div>
        </div>
    )
}
export default UserModify
