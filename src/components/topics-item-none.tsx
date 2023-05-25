import type { ReactNode } from 'react'
import React from 'react'

interface Props {
    children?: ReactNode
}

function TopicsItemNone(props: Props) {
    return (
        <div className="card feed">
            <div className="feed-content">
                <div className="feed-desc-wrap">
                    <div className="feed-article-content markdown-body">{props.children}</div>
                </div>
            </div>
        </div>
    )
}
export default React.memo(TopicsItemNone)
