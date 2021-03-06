import md5 from 'md5'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useSetState } from 'ahooks'

import api from '@/api'
import { getCommentList, commentState } from '@/store/global/comment'
import { setMessage, timeAgo } from '@/utils'

const Comment = props => {
    const dispatch = useDispatch()
    const comment = useSelector(commentState)

    const [state, setState] = useSetState({
        loading: false
    })

    const pathname = props.location.pathname

    const handleGetComment = async page => {
        const {
            location: { pathname },
            match: {
                params: { id }
            }
        } = props
        page = page || comment.page
        await dispatch(getCommentList({ id, page, pathname }))
    }

    useMount(() => {
        if (comment.pathname !== pathname) handleGetComment(1)
    })

    const handleRecover = async id => {
        const { code, message } = await api.get('frontend/comment/recover', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'comment/recoverComment', payload: { id } })
        }
    }
    const handleDelete = async id => {
        const { code, message } = await api.get('frontend/comment/delete', { id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch({ type: 'comment/deleteComment', payload: { id } })
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

    const html = comment.data.map(item => {
        const btn = item.is_delete ? (
            <a onClick={handleRecover.bind(null, item._id)} href={null}>
                ??????
            </a>
        ) : (
            <a onClick={handleDelete.bind(null, item._id)} href={null}>
                ??????
            </a>
        )
        return (
            <div key={item._id} className="comment-item">
                <a href={null} className="comment-author-avatar-link">
                    <img src={avatar(item.userid.email)} alt="" className="avatar-img" />
                </a>
                <div className="comment-content-wrap">
                    <span className="comment-author-wrap">
                        <a href={null} className="comment-author">
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
    const next = comment.hasNext ? (
        <div className="settings-footer">
            {' '}
            <a onClick={handleLoadMore} className="admin-load-more" href={null}>
                {state.loading ? '?????????...' : '????????????'}
            </a>{' '}
        </div>
    ) : (
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
