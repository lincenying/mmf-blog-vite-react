import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMount, useSetState } from 'ahooks'
import { Link, useLocation } from 'react-router-dom'

import api from '@/api'
import { backendUserDelete, backendUserRecover, backendUserState, getUserList } from '@/store/backend/user'
import { setMessage, timeAgo } from '@/utils'

const UserList = () => {
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

    useMount(() => {
        console.log('user-list useMount:')
        if (user.lists.data.length === 0) getUserListFunc(1)
    })

    const handleRecover = async (id: string) => {
        const { code, message } = await api.get('backend/user/recover', {
            id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(backendUserRecover(id))
        }
    }
    const handleDelete = async (id: string) => {
        const { code, message } = await api.get('backend/user/delete', {
            id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(backendUserDelete(id))
        }
    }
    const handleLoadMore = async () => {
        if (state.loading) return
        const { page } = user.lists
        setState({ loading: true })
        await getUserListFunc(page + 1)
        setState({ loading: false })
    }

    const lists = user.lists.data.map((item, index) => {
        const btn = item.is_delete
            ? (
            <a onClick={handleRecover.bind(null, item._id)} href={undefined}>
                恢复
            </a>
                )
            : (
            <a onClick={handleDelete.bind(null, item._id)} href={undefined}>
                删除
            </a>
                )
        return (
            <div key={index} className="list-section">
                <div className={`list-username${item.is_delete ? ' text-red-500 line-through' : ''}`}>{item.username}</div>
                <div className="list-email">{item.email}</div>
                <div className="list-date">{timeAgo(item.update_date)}</div>
                <div className="list-action">
                    <Link to={`/backend/user/modify/${item._id}`} className="badge badge-success">
                        编辑
                    </Link>
                    {btn}
                </div>
            </div>
        )
    })
    const next = user.lists.hasNext
        ? (
        <div className="settings-footer">
            {' '}
            <a onClick={handleLoadMore} className="admin-load-more" href={undefined}>
                {state.loading ? '加载中...' : '加载更多'}
            </a>{' '}
        </div>
            )
        : (
                ''
            )
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
