import React from 'react'
import { Link } from 'react-router-dom'
import type { Category } from '@/types'

function AsideCategory(props: { readonly payload: Category[] }) {
    const { payload } = props
    const html = payload.map((item) => {
        return (
            <Link className="topic-item" key={item._id} to={`/category/${item._id}`}>
                <span className="avatar-link">
                    <img className="avatar-image" src="/static/images/topic-1.png" />
                </span>
                <div>
                    <h3 className="topic-title">{item.cate_name}</h3>
                    <p className="topic-meta">
                        {item.cate_num || 0}
                        {' '}
                        篇文章
                    </p>
                    <i className="icon icon-arrow-right" />
                </div>
            </Link>
        )
    })
    return <div className="card card-topics">{html}</div>
}

export default React.memo(AsideCategory)
