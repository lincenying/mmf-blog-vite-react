import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useLockFn } from 'ahooks'

import api from '@/api'
import { getCommentList, commentState } from '@/store/global/comment'
import { globalState } from '@/store/global'
import { setMessage } from '@/utils'

import Avatar from '@/components/avatar.jsx'

export default function FrontendComment(props) {
    const pathname = props.location.pathname

    const global = useSelector(globalState)
    const comment = useSelector(commentState)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState('')

    const handleGetComment = async page => {
        if (loading) return
        const {
            location: { pathname },
            match: {
                params: { id }
            }
        } = props
        page = page || comment.page
        await dispatch(getCommentList({ id, pathname, limit: 10, page }))
        setLoading(false)
    }

    useMount(() => {
        if (comment.pathname !== pathname) handleGetComment(1)
    })

    const handleLoadMore = async () => {
        if (loading) return
        const { page } = comment
        setLoading(true)
        await handleGetComment(page + 1)
        setLoading(false)
    }

    const handlePostComment = useLockFn(async () => {
        const username = global.cookies.user
        if (!username) {
            setMessage('请先登录!')
            dispatch({ type: 'global/showLoginModal', payload: true })
        } else if (content === '') {
            setMessage('请输入评论内容!')
        } else {
            const { code, data } = await api.post('frontend/comment/insert', {
                content,
                id: props.match.params.id
            })
            if (code === 200) {
                setContent('')
                setMessage({
                    content: '评论发布成功!',
                    type: 'success'
                })
                dispatch({ type: 'comment/insertCommentItem', payload: { item: data } })
            }
        }
    })

    const handleReply = item => {
        setContent('回复 @' + item.username + ': ')
        document.querySelector('#content').focus()
    }

    const html = comment.data.map(item => {
        return (
            <div key={item._id} className="comment-item">
                <a href={null} className="comment-author-avatar-link">
                    <Avatar email={item.userid.email} />
                </a>
                <div className="comment-content-wrap">
                    <span className="comment-author-wrap">
                        <a href={null} className="comment-author">
                            {item.username}
                        </a>
                    </span>
                    <div className="comment-content">{item.content}</div>
                    <div className="comment-footer">
                        <span className="comment-time">{item.creat_date}</span>
                        <a onClick={handleReply.bind(null, item)} href={null} className="comment-action-item comment-reply">
                            回复
                        </a>
                    </div>
                </div>
            </div>
        )
    })
    const hasNext = comment.hasNext ? (
        <div className="load-more-wrap">
            {' '}
            <a onClick={handleLoadMore} href={null} className="comments-load-more">
                {loading ? '加载中...' : '加载更多'}
            </a>{' '}
        </div>
    ) : (
        ''
    )

    return (
        <div className="card">
            <div className="comments">
                <div className="comment-post-wrap">
                    {' '}
                    <Avatar email={global.cookies.useremail} />
                    <div className="comment-post-input-wrap base-textarea-wrap">
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            id="content"
                            className="textarea-input base-input"
                            cols="30"
                            rows="4"
                        />
                    </div>
                    <div className="comment-post-actions">
                        <a onClick={handlePostComment} href={null} className="btn btn-blue">
                            发表评论
                        </a>
                    </div>
                </div>
                <div className="comment-items-wrap">{html}</div>
                {hasNext}
            </div>
        </div>
    )
}
