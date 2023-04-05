import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMount, useSetState } from 'ahooks'
import { Link, useLocation } from 'react-router-dom'

import api from '@/api'
import { adminState, deleteAdmin, getAdminList, recoverAdmin } from '@/store/backend/admin'
import { setMessage, timeAgo } from '@/utils'

export default function AdminList() {
    const location = useLocation()
    const pathname = location.pathname
    const dispatch = useDispatch()
    const admin = useSelector(adminState)

    const [state, setState] = useSetState({
        loading: false,
    })

    const getAdminListFunc = async (page: number) => {
        const lists = admin.lists
        page = page || lists.page
        dispatch(await getAdminList({ page, pathname }))
    }

    useMount(() => {
        console.log('admin-list useMount:')
        if (admin.lists.data.length === 0) getAdminListFunc(1)
    })

    const handleDelete = async (id: string) => {
        const { code, message } = await api.get('backend/admin/delete', {
            id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(deleteAdmin(id))
        }
    }
    const handleRecover = async (id: string) => {
        const { code, message } = await api.get('backend/admin/recover', {
            id,
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(recoverAdmin(id))
        }
    }
    const handleLoadMore = async () => {
        if (state.loading) return
        const { page } = admin.lists
        setState({ loading: true })
        await getAdminListFunc(page + 1)
        setState({ loading: false })
    }

    const lists = admin.lists.data.map((item, index) => {
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
                    <Link to={`/backend/admin/modify/${item._id}`} className="badge badge-success">
                        编辑
                    </Link>
                    {btn}
                </div>
            </div>
        )
    })
    const next = admin.lists.hasNext
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
