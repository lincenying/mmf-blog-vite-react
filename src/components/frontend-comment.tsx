import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLockFn, useMount } from 'ahooks'

import api from '@/api'
import { commentState, getCommentList, insertCommentItem } from '@/store/global/comment'
import { globalState, showLoginModal } from '@/store/global'
import { setMessage } from '@/utils'

import Avatar from '@/components/avatar'

import type { Comment } from '@/types'

export default function FrontendComment() {
    const location = useLocation()
    const params = useParams()
    const { id } = params

    const pathname = location.pathname

    const global = useSelector(globalState)
    const comment = useSelector(commentState)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState('')

    const handleGetComment = async (page: number) => {
        if (loading) return
        page = page || comment.page
        dispatch(await getCommentList({ id, pathname, limit: 10, page }))
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
            dispatch(showLoginModal(true))
        }
        else if (content === '') {
            setMessage('请输入评论内容!')
        }
        else {
            const { code, data } = await api.post('frontend/comment/insert', {
                content,
                id,
            })
            if (code === 200) {
                setContent('')
                setMessage({
                    content: '评论发布成功!',
                    type: 'success',
                })
                dispatch(insertCommentItem(data))
            }
        }
    })

    const handleReply = (item: Comment) => {
        setContent(`回复 @${item.username}: `)
        const content: HTMLTextAreaElement = document.querySelector('#content')!
        content.focus()
    }

    const html = comment.data.map((item) => {
        return (
            <div key={item._id} className="comment-item">
                <a href={undefined} className="comment-author-avatar-link">
                    <Avatar email={item.userid.email} />
                </a>
                <div className="comment-content-wrap">
                    <span className="comment-author-wrap">
                        <a href={undefined} className="comment-author">
                            {item.username}
                        </a>
                    </span>
                    <div className="comment-content">{item.content}</div>
                    <div className="comment-footer">
                        <span className="comment-time">{item.creat_date}</span>
                        <a onClick={handleReply.bind(null, item)} href={undefined} className="comment-action-item comment-reply">
                            回复
                        </a>
                    </div>
                </div>
            </div>
        )
    })
    const hasNext = comment.hasNext
        ? (
        <div className="load-more-wrap">
            {' '}
            <a onClick={handleLoadMore} href={undefined} className="comments-load-more">
                {loading ? '加载中...' : '加载更多'}
            </a>{' '}
        </div>
            )
        : (
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
                            cols={30}
                            rows={4}
                        />
                    </div>
                    <div className="comment-post-actions">
                        <a onClick={handlePostComment} href={undefined} className="btn btn-blue">
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
