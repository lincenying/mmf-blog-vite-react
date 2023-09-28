import React from 'react'
import { Link } from 'react-router-dom'

import api from '@/api'
import { backendUserState, getUserItem, updateBackendUser } from '@/store/backend/user'

import AInput from '@/components/a-input'
import type { User } from '@/types'

function UserModify() {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(backendUserState)

    const [state, setState] = useSetState({
        username: user.item.data?.username || '',
        email: user.item.data?.email || '',
        password: '',
    })

    useMount(async () => {
        console.log('admin-modify useMount: start')
        dispatch(await getUserItem({ id: params.id }))
        console.log('admin-modify useMount: end')
    })

    const prevUser = usePrevious(user)

    useUpdateEffect(() => {
        const { username, email } = user.item.data!
        if (prevUser?.item.data?.username !== username)
            setState({ username, email })
    }, [user])

    const handleModify = useLockFn(async () => {
        if (!state.username || !state.email)
            return setMessage('请将表单填写完整!')

        const item = {
            ...state,
            id: params.id,
        }
        const { code, data, message } = await api.post<User>('backend/user/modify', item)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(updateBackendUser(data))
            navigate('/backend/user/list')
        }
    })

    return (
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
                <AInput title="邮箱">
                    <input
                        className="base-input"
                        name="email"
                        onChange={e => setState({ email: e.target.value })}
                        placeholder="邮箱"
                        type="text"
                        value={state.email}
                    />
                    <span className="input-info error">请输入邮箱</span>
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
                <Link className="btn btn-blue" to="/backend/user/list">返回</Link>
                <a className="btn btn-yellow" href={undefined} onClick={handleModify}>编辑用户</a>
            </div>
        </div>
    )
}
export default UserModify
