import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Category from '@/components/aside-category'
import Other from '@/components/aside-other'
import Trending from '@/components/aside-trending'
import Comment from '@/components/frontend-comment'
import Actions from '@/components/item-actions'

import { articleState, getArticleItem } from '@/store/frontend/article'
import { getTrending, trendingState } from '@/store/frontend/trending'
import { categoryState, getCategoryList } from '@/store/global/category'

function addTarget(content: string) {
    if (!content) {
        return ''
    }
    return content.replace(/<a(.*?)href=/g, '<a$1target="_blank" href=')
}

export default function Article() {
    const location = useLocation()
    const params = useParams()
    const { id } = params
    const pathname = location.pathname

    const article = useSelector(articleState)
    const category = useSelector(categoryState)
    const trending = useSelector(trendingState)
    const dispatch = useDispatch()

    useMount(async () => {
        console.log('article useMount: start')
        window.scrollTo(0, 0)
        if (article.pathname !== location.pathname) {
            dispatch(await getArticleItem({ id, pathname }))
        }
        if (category.lists.length === 0) {
            dispatch(await getCategoryList())
        }
        if (trending.data.length === 0) {
            dispatch(await getTrending())
        }
        console.log('article useMount: end')
    })

    let html

    if (!article.isLoad || pathname !== article.pathname) {
        html = (
            <div className="main-left">
                <div className="card card-answer">
                    <div className="answer-content">加载中, 请稍等...</div>
                </div>
            </div>
        )
    }
    else if (article.data?._id) {
        html = (
            <div className="main-left">
                <div className="card card-question-head">
                    <div className="question-content">
                        <Link className="topic-link-item" to={`/category/${article.data.category}`}>
                            {article.data.category_name}
                        </Link>
                        <h2 className="question-title">
                            <Link className="question-title-link" to={`/article/${article.data._id}`}>
                                {article.data.title}
                            </Link>
                        </h2>
                    </div>
                </div>
                <div className="card card-answer">
                    <div className="answer-content">
                        <div
                            className="article-content markdown-body"
                            dangerouslySetInnerHTML={{
                                __html: addTarget(article.data.html),
                            }}
                        />
                    </div>
                    <Actions item={article.data} />
                </div>
                <Comment />
            </div>
        )
    }
    else {
        html = (
            <div className="main-left">
                <div className="card card-answer">
                    <div className="answer-content">该文章不存在, 或者该文章已经被删除</div>
                </div>
            </div>
        )
    }
    return (
        <div className="main wrap">
            {html}
            <div className="main-right">
                <Category payload={category.lists} />
                <Trending payload={trending.data} />
                <Other />
            </div>
        </div>
    )
}
