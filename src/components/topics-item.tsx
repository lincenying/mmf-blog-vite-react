import type { Article } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import Actions from './item-actions'

function TopicsItem(props: { readonly payload: Article }) {
    const { payload: item } = props
    return (
        <div className="card feed">
            <div className="feed-content">
                <div className="feed-source-time">
                    <span className="feed-source">
                        来自分类
                        {' '}
                        <Link className="feed-minor-link" to={`/category/${item.category}`}>
                            {item.category_name}
                        </Link>
                    </span>
                    <span className="feed-time">{item.update_date}</span>
                </div>
                <div className="feed-main-link-wrap">
                    <Link className="feed-main-link" to={`/article/${item._id}`}>
                        {item.title}
                    </Link>
                </div>
                <div className="feed-desc-wrap">
                    <div className="feed-article-content markdown-body">{item.content}</div>
                </div>
            </div>
            <Actions item={item} />
        </div>
    )
}
export default React.memo(TopicsItem)
