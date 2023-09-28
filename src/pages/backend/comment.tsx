import md5 from 'md5'
import React from 'react'

import api from '@/api'
import { commentState, deleteComment, getCommentList, recoverComment } from '@/store/global/comment'
import { timeAgo } from '@/utils'

function Comment() {
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
        if (comment.pathname !== pathname)
            handleGetComment(1)
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
        if (state.loading)
            return
        const { page } = comment
        setState({ loading: true })
        await handleGetComment(page + 1)
        setState({ loading: false })
    }
    const avatar = (email = 'lincenying@126.com') => {
        return `https://fdn.geekzu.org/avatar/${md5(email)}?s=256&d=identicon&r=g`
    }

    const html = comment.data.map((item) => {
        const btns = item.is_delete ? (
            <a href={undefined} onClick={handleRecover.bind(null, item._id)}>恢复</a>
        ) : (
            <a href={undefined} onClick={handleDelete.bind(null, item._id)}>删除</a>
        )

        return (
            <div className="comment-item" key={item._id}>
                <a className="comment-author-avatar-link" href={undefined}>
                    <img alt="" className="avatar-img" src={avatar(item.userid.email)} />
                </a>
                <div className="comment-content-wrap">
                    <span className="comment-author-wrap">
                        <a className="comment-author" href={undefined}>{item.username}</a>
                    </span>
                    <div className="comment-content">{item.content}</div>
                    <div className="comment-footer">
                        <span className="comment-time">{timeAgo(item.timestamp)}</span>
                        {btns}
                    </div>
                </div>
            </div>
        )
    })

    const next = comment.hasNext ? (
        <div className="settings-footer">
            {' '}
            <a className="admin-load-more" href={undefined} onClick={handleLoadMore}>
                {state.loading ? '加载中...' : '加载更多'}
            </a>
            {' '}
        </div>
    ) : null

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
