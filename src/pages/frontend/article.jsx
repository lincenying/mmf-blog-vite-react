import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount } from 'ahooks'
import { Link } from 'react-router-dom'

import Category from '@/components/aside-category.jsx'
import Other from '@/components/aside-other.jsx'
import Trending from '@/components/aside-trending.jsx'
import Comment from '@/components/frontend-comment.jsx'
import Actions from '@/components/item-actions.jsx'

import { getArticleItem, articleState } from '@/store/frontend/article'
import { getCategoryList, categoryState } from '@/store/global/category'
import { getTrending, trendingState } from '@/store/frontend/trending'

const addTarget = content => {
    if (!content) return ''
    return content.replace(/<a(.*?)href=/g, '<a$1target="_blank" href=')
}

export default function Article(props) {
    const pathname = props.location.pathname

    const article = useSelector(articleState)
    const category = useSelector(categoryState)
    const trending = useSelector(trendingState)
    const dispatch = useDispatch()

    const handlefetchArticle = async () => {
        const {
            match: {
                params: { id }
            },
            location: { pathname }
        } = props
        await dispatch(getArticleItem({ id, pathname }))
    }

    useMount(() => {
        console.log('article useMount:')
        window.scrollTo(0, 0)
        if (article.pathname !== props.location.pathname) handlefetchArticle()
        if (category.lists.length === 0) dispatch(getCategoryList())
        if (trending.data.length === 0) dispatch(getTrending())
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
    } else if (article.data._id) {
        html = (
            <div className="main-left">
                <div className="card card-question-head">
                    <div className="question-content">
                        <Link to={'/category/' + article.data.category} className="topic-link-item">
                            {article.data.category_name}
                        </Link>
                        <h2 className="question-title">
                            <Link to={'/article/' + article.data._id} className="question-title-link">
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
                                __html: addTarget(article.data.html)
                            }}
                        />
                    </div>
                    <Actions item={article.data} />
                </div>
                <Comment {...props} article={article} category={category} trending={trending} />
            </div>
        )
    } else {
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
