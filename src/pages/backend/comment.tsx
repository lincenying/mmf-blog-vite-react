import md5 from 'md5'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMount, useSetState } from 'ahooks'

import { useLocation, useParams } from 'react-router-dom'
import api from '@/api'
import { commentState, deleteComment, getCommentList, recoverComment } from '@/store/global/comment'
import { setMessage, timeAgo } from '@/utils'

const Comment = () => {
    const location = useLocation()
    const params = useParams()
    const { id } = params
    const dispatch = useDispatch()
    const comment = useSelector(commentState)

    const [state, setState] = useSetState({
        loading: false,
    })

    const pathname = location.pathname

    const handleGetComment = async (page: number) => {
        page = page || comment.page
        dispatch(await getCommentList({ id, page, pathname }))
    }

    useMount(() => {
        if (comment.pathname !== pathname) handleGetComment(1)
    })

    const handleRecover = async (id: string) => {
        const { code, message } = await api.get('frontend/comment/recover', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(recoverComment(id))
        }
    }
    const handleDelete = async (id: string) => {
        const { code, message } = await api.get('frontend/comment/delete', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(deleteComment(id))
        }
    }
    const handleLoadMore = async () => {
        if (state.loading) return
        const { page } = comment
        setState({ loading: true })
        await handleGetComment(page + 1)
        setState({ loading: false })
    }
    const avatar = (email = 'lincenying@126.com') => {
        return `https://fdn.geekzu.org/avatar/${md5(email)}?s=256&d=identicon&r=g`
    }

    const html = comment.data.map((item) => {
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
            <div key={item._id} className="comment-item">
                <a href={undefined} className="comment-author-avatar-link">
                    <img src={avatar(item.userid.email)} alt="" className="avatar-img" />
                </a>
                <div className="comment-content-wrap">
                    <span className="comment-author-wrap">
                        <a href={undefined} className="comment-author">
                            {item.username}
                        </a>
                    </span>
                    <div className="comment-content">{item.content}</div>
                    <div className="comment-footer">
                        <span className="comment-time">{timeAgo(item.timestamp)}</span>
                        {btn}
                    </div>
                </div>
            </div>
        )
    })
    const next = comment.hasNext
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
        <div className="card">
            <div className="comments">
                <div className="comment-items-wrap">{html}</div>
                {next}
            </div>
        </div>
    )
}
export default Comment
