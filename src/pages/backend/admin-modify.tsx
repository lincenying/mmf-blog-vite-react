import React from 'react'
import { Link } from 'react-router-dom'

import api from '@/api'
import { adminState, getAdminItem, updateAdminItem } from '@/store/backend/admin'

import AInput from '@/components/a-input'
import type { User } from '@/types'

function AdminModify() {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const admin = useSelector(adminState)

    const [state, setState] = useSetState({
        username: admin.item.data?.username || '',
        email: admin.item.data?.email || '',
        password: '',
    })

    useMount(async () => {
        console.log('admin-modify useMount: start')
        dispatch(await getAdminItem({ id: params.id }))
        console.log('admin-modify useMount: end')
    })

    const prevAdmin = usePrevious(admin)

    useUpdateEffect(() => {
        const { username, email } = admin.item.data! || {}
        if (prevAdmin?.item.data?.username !== username) {
            setState({ username, email })
        }
    }, [admin])

    const handleModify = useLockFn(async () => {
        if (!state.username || !state.email) {
            return setMessage('请将表单填写完整!')
        }

        const item = {
            ...state,
            id: params.id,
        }
        const { code, data, message } = await api.post<User>('backend/admin/modify', item)
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(updateAdminItem(data))
            navigate('/backend/admin/list')
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
                <Link className="btn btn-blue" to="/backend/admin/list">返回</Link>
                <a className="btn btn-yellow" href={undefined} onClick={handleModify}>编辑管理员</a>
            </div>
        </div>
    )
}
export default AdminModify
