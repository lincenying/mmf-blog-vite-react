import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useSetState } from 'ahooks'
import { Link } from 'react-router-dom'

import api from '@/api'
import { getAdminList, adminState } from '@/store/backend/admin'
import { setMessage, timeAgo } from '@/utils'

export default function AdminList(props) {
    const dispatch = useDispatch()
    const admin = useSelector(adminState)

    const [state, setState] = useSetState({
        loading: false
    })

    const getAdminListFunc = async page => {
        const {
            location: { pathname }
        } = props
        const lists = admin.lists
        page = page || lists.page
        await dispatch(getAdminList({ page, pathname }))
    }

    useMount(() => {
        console.log('admin-list useMount:')
        if (admin.lists.data.length === 0) getAdminListFunc(1)
    })

    const handleRecover = async id => {
        const { code, message } = await api.get('backend/admin/recover', {
            id
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'backendAdmin/recoverAdmin', payload: { id } })
        }
    }
    const handleDelete = async id => {
        const { code, message } = await api.get('backend/admin/delete', {
            id
        })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'backendAdmin/deleteAdmin', payload: { id } })
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
        const btn = item.is_delete ? (
            <a onClick={handleRecover.bind(null, item._id)} href={null}>
                恢复
            </a>
        ) : (
            <a onClick={handleDelete.bind(null, item._id)} href={null}>
                删除
            </a>
        )
        return (
            <div key={index} className="list-section">
                <div className="list-username">{item.username}</div>
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
    const next = admin.lists.hasNext ? (
        <div className="settings-footer">
            {' '}
            <a onClick={handleLoadMore} className="admin-load-more" href={null}>
                {state.loading ? '加载中...' : '加载更多'}
            </a>{' '}
        </div>
    ) : (
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
