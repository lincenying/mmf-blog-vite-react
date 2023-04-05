import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLockFn } from 'ahooks'

import api from '@/api'
import { setMessage } from '@/utils'

import { globalState } from '@/store/global'
import { updateTopicsLikeState } from '@/store/frontend/topics'
import { updateArticleLikeState } from '@/store/frontend/article'
import type { Article } from '@/types'

export default function ItemActions(props: { item: Article }) {
    const global = useSelector(globalState)
    const dispatch = useDispatch()

    const handleLike = useLockFn(async () => {
        const username = global.cookies.user
        const { item } = props
        if (!username) {
            setMessage('请先登录!')
            dispatch({ type: 'global/showLoginModal', payload: true })
            return
        }
        let url = 'frontend/like'
        if (item.like_status) url = 'frontend/unlike'
        const { code, message } = await api.get(url, { id: item._id })
        if (code === 200) {
            setMessage({ type: 'success', content: message })
            dispatch(updateTopicsLikeState(item._id))
            dispatch(updateArticleLikeState(item._id))
            // dispatch({type: 'updateTrendingLikeState', payload: item._id})
        }
    })
    const handleShare = () => {
        const top = window.screen.height / 2 - 250
        const left = window.screen.width / 2 - 300
        const title = `${props.item.title} - M.M.F 小屋`
        const url = `https://www.mmxiaowu.com/article/${props.item._id}`
        window.open(
            `http://service.weibo.com/share/share.php?title=${
                encodeURIComponent(title.replace(/&nbsp;/g, ' ').replace(/<br \/>/g, ' '))
                }&url=${
                encodeURIComponent(url)}`,
            '分享至新浪微博',
            `height=500, width=600, top=${top}, left=${left}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`,
        )
    }

    const item = props.item
    return (
        <div className="actions-wrap">
            <a onClick={handleLike} href={undefined} className={item.like_status ? 'action-item active' : 'action-item'}>
                <i className={item.like_status ? 'icon icon-action-voteup-active' : 'icon icon-action-voteup'} />
                <span className="text">{item.like} 赞</span>
            </a>
            <a href={undefined} className="action-item">
                <i className="icon icon-action-comment" />
                <span className="text">{item.comment_count} 评论</span>
            </a>
            <a href={undefined} className="action-item action-item-fav">
                <i className="icon icon-action-fav" />
                <span className="text">{item.visit} 浏览</span>
            </a>
            <a onClick={handleShare} href={undefined} className="action-item">
                <i className="icon icon-action-share" />
                <span className="text">分享</span>
            </a>
        </div>
    )
}
