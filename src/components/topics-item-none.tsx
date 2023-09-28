import type { ReactNode } from 'react'
import React from 'react'

interface Props {
    readonly children?: ReactNode
}

function TopicsItemNone(props: Props) {
    const { children } = props
    return (
        <div className="card feed">
            <div className="feed-content">
                <div className="feed-desc-wrap">
                    <div className="feed-article-content markdown-body">{children}</div>
                </div>
            </div>
        </div>
    )
}
export default React.memo(TopicsItemNone)
