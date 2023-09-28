import React from 'react'
import { Link } from 'react-router-dom'

import api from '@/api'
import { backendArticleState, deleteBackendArticle, getArticleList, recoverBackendArticle } from '@/store/backend/article'
import { timeAgo } from '@/utils'

export default function ArticleList() {
    const location = useLocation()
    const { pathname } = location
    const dispatch = useDispatch()
    const topics = useSelector(backendArticleState)

    const [state, setState] = useSetState({
        loading: false,
    })

    const handleGetArticleList = async (page: number) => {
        page = page || topics.page
        dispatch(await getArticleList({ page, pathname }))
    }

    useMount(async () => {
        console.log('article-list useMount: start')
        if (topics.data.length === 0)
            await handleGetArticleList(1)
        console.log('article-list useMount: end')
    })

    const handleDelete = async (id: string) => {
        const { code, message } = await api.get('backend/article/delete', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(deleteBackendArticle(id))
        }
    }
    const handleRecover = async (id: string) => {
        const { code, message } = await api.get('backend/article/recover', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(recoverBackendArticle(id))
        }
    }
    const handleLoadMore = async () => {
        if (state.loading)
            return
        const { page } = topics
        setState({ loading: true })
        await handleGetArticleList(page + 1)
        setState({ loading: false })
    }

    const lists = topics.data.map((item) => {
        const btns = item.is_delete ? (
            <a href={undefined} onClick={handleRecover.bind(null, item._id)}>恢复</a>
        ) : (
            <a href={undefined} onClick={handleDelete.bind(null, item._id)}>删除</a>
        )

        const com = item.comment_count > 0 ? (
            <Link className="badge badge-success" to={`/backend/article/comment/${item._id}`}>评论</Link>
        ) : null
        return (
            <div className="list-section" key={item._id}>
                <div className={`list-title${item.is_delete ? ' text-red-500 line-through' : ''}`}>{item.title}</div>
                <div className="list-category">{item.category_name}</div>
                <div className="list-date">{timeAgo(item.update_date)}</div>
                <div className="list-action">
                    <Link className="badge badge-success" to={`/backend/article/modify/${item._id}`}>编辑</Link>
                    {btns}
                    {com}
                </div>
            </div>
        )
    })

    const next = topics.hasNext ? (
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
