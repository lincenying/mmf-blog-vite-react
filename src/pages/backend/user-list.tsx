import React from 'react'
import { Link } from 'react-router-dom'

import api from '@/api'
import { backendUserState, deleteBackendUser, getUserList, recoverBackendUser } from '@/store/backend/user'
import { timeAgo } from '@/utils'

function UserList() {
    const location = useLocation()
    const pathname = location.pathname
    const dispatch = useDispatch()
    const user = useSelector(backendUserState)

    const [state, setState] = useSetState({
        loading: false,
    })

    const getUserListFunc = async (page: number) => {
        page = page || user.lists.page
        dispatch(await getUserList({ page, pathname }))
    }

    useMount(async () => {
        console.log('user-list useMount: start')
        if (user.lists.data.length === 0) {
            await getUserListFunc(1)
        }
        console.log('user-list useMount: end')
    })

    const handleRecover = async (id: string) => {
        const { code, message } = await api.get('backend/user/recover', {
            id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(recoverBackendUser(id))
        }
    }
    const handleDelete = async (id: string) => {
        const { code, message } = await api.get('backend/user/delete', {
            id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(deleteBackendUser(id))
        }
    }
    const handleLoadMore = async () => {
        if (state.loading) {
            return
        }
        const { page } = user.lists
        setState({ loading: true })
        await getUserListFunc(page + 1)
        setState({ loading: false })
    }

    const lists = user.lists.data.map((item) => {
        const btns = item.is_delete ? (
            <a href={undefined} onClick={handleRecover.bind(null, item._id)}>恢复</a>
        ) : (
            <a href={undefined} onClick={handleDelete.bind(null, item._id)}>删除</a>
        )

        return (
            <div className="list-section" key={item._id}>
                <div className={`list-username${item.is_delete ? ' text-red-500 line-through' : ''}`}>{item.username}</div>
                <div className="list-email">{item.email}</div>
                <div className="list-date">{timeAgo(item.update_date)}</div>
                <div className="list-action">
                    <Link className="badge badge-success" to={`/backend/user/modify/${item._id}`}>编辑</Link>
                    {btns}
                </div>
            </div>
        )
    })
    const next = user.lists.hasNext ? (
        <div className="settings-footer">
            {' '}
            <a className="admin-load-more" href={undefined} onClick={handleLoadMore}>
                {state.loading ? '加载中...' : '加载更多'}
            </a>
            {' '}
        </div>
    ) : null

    return (
        <div className="settings-main card">
            <div className="settings-main-content">
                <div className="list-section list-header">
                    <div className="list-username">用户名</div>
                    <div className="list-email">邮箱</div>
                    <div className="list-date">最后更新</div>
                    <div className="list-action">操作</div>
                </div>
                {lists}
            </div>
            {next}
        </div>
    )
}
export default UserList
