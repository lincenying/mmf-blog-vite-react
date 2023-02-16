import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useSetState } from 'ahooks'
import { Link, useLocation } from 'react-router-dom'

import api from '@/api'
import { getArticleList, backendArticleState } from '@/store/backend/article'
import { setMessage, timeAgo } from '@/utils'

export default function ArticleList() {
    const location = useLocation()
    const { pathname } = location
    const dispatch = useDispatch()
    const topics = useSelector(backendArticleState)

    const [state, setState] = useSetState({
        loading: false
    })

    const handleGetArticleList = async page => {
        page = page || topics.page
        await dispatch(getArticleList({ page, pathname }))
    }

    useMount(() => {
        console.log('article-list useMount:')
        if (topics.data.length === 0) handleGetArticleList(1)
    })

    const handleRecover = async id => {
        const { code, message } = await api.get('backend/article/recover', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'backendArticle/recover', payload: { id } })
        }
    }
    const handleDelete = async id => {
        const { code, message } = await api.get('backend/article/delete', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'backendArticle/deletes', payload: { id } })
        }
    }
    const handleLoadMore = async () => {
        if (state.loading) return
        const { page } = topics
        setState({ loading: true })
        await handleGetArticleList(page + 1)
        setState({ loading: false })
    }

    const lists = topics.data.map((item, index) => {
        const btn = item.is_delete ? (
            <a onClick={handleRecover.bind(null, item._id)} href={null}>
                恢复
            </a>
        ) : (
            <a onClick={handleDelete.bind(null, item._id)} href={null}>
                删除
            </a>
        )
        const com =
            item.comment_count > 0 ? (
                <Link to={'/backend/article/comment/' + item._id} className="badge badge-success">
                    评论
                </Link>
            ) : (
                ''
            )
        return (
            <div key={index} className="list-section">
                <div className={'list-title' + (item.is_delete ? ' text-red-500 line-through' : '')}>{item.title}</div>
                <div className="list-category">{item.category_name}</div>
                <div className="list-date">{timeAgo(item.update_date)}</div>
                <div className="list-action">
                    <Link to={'/backend/article/modify/' + item._id} className="badge badge-success">
                        编辑
                    </Link>
                    {btn}
                    {com}
                </div>
            </div>
        )
    })
    const next = topics.hasNext ? (
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
                    <div className="list-title">标题</div>
                    <div className="list-category">分类</div>
                    <div className="list-date">时间</div>
                    <div className="list-action">操作</div>
                </div>
                {lists}
            </div>
            {next}
        </div>
    )
}
