import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMount, useSetState, useUpdateEffect, useWhyDidYouUpdate } from 'ahooks'

import ls from 'store2'

import Category from '@/components/aside-category.jsx'
import Other from '@/components/aside-other.jsx'
import Trending from '@/components/aside-trending.jsx'
import PromptWrapper from '@/components/prompt-wrapper.jsx'
import TopicsItemNone from '@/components/topics-item-none.jsx'
import TopicsItem from '@/components/topics-item.jsx'

import { getTopics, topicsState } from '@/store/frontend/topics'
import { getTrending, trendingState } from '@/store/frontend/trending'
import { getCategoryList, categoryState } from '@/store/global/category'

export default function Topics(props) {
    const pathname = props.location.pathname

    const topics = useSelector(topicsState)
    const category = useSelector(categoryState)
    const trending = useSelector(trendingState)
    const dispatch = useDispatch()

    const firstPathname = useRef(pathname)
    const [state, setState] = useSetState({
        scrollTop: 0,
        loading: false
    })

    const handlefetchPosts = async (page = 1) => {
        const {
            location: { pathname },
            match: {
                params: { id, key, by }
            }
        } = props
        await dispatch(getTopics({ id, key, by, pathname, page }))
    }

    const handleLoadMore = async () => {
        if (state.loading) return
        const { page } = topics
        setState({ loading: true })
        await handlefetchPosts(page + 1)
        setState({ loading: false })
    }

    useMount(() => {
        console.log('topics useMount:')
        const pathname = firstPathname.current

        if (topics.pathname !== firstPathname.current) handlefetchPosts()
        if (category.lists.length === 0) dispatch(getCategoryList())
        if (trending.data.length === 0) dispatch(getTrending())

        if (topics.pathname !== '') {
            const scrollTop = ls.get(pathname) || 0
            ls.remove(pathname)
            window.scrollTo(0, scrollTop)
        }
    })

    useUpdateEffect(() => {
        console.log('topics useUpdateEffect:')
        if (topics.pathname !== firstPathname.current) {
            handlefetchPosts()
        }
    }, [props.location.pathname])

    useWhyDidYouUpdate('topicsComponent', { ...props, topics, category, trending })

    let html
    if (!topics.pathname) {
        html = (
            <div className="home-feeds cards-wrap">
                <TopicsItemNone>加载中, 请稍等...</TopicsItemNone>
            </div>
        )
    } else if (topics.data.length > 0) {
        const lists = topics.data.map(item => <TopicsItem key={item._id} payload={item} />)
        const hasNext = topics.hasNext ? (
            <a onClick={handleLoadMore} href={null} className={`load-more ${state.loading ? 'loading' : ''}`}>
                {state.loading ? '加载中' : '加载'}
                <i className="icon icon-circle-loading" />
            </a>
        ) : (
            ''
        )
        html = (
            <div className="home-feeds cards-wrap">
                {lists}
                <div className="load-more-wrap">{hasNext}</div>
            </div>
        )
    } else {
        html = (
            <div className="home-feeds cards-wrap">
                <TopicsItemNone>当前分类还没有文章...</TopicsItemNone>
            </div>
        )
    }
    return (
        <div className="main wrap">
            <PromptWrapper
                message={() => {
                    const path = firstPathname.current
                    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
                    ls.set(path, scrollTop)
                    return true
                }}
            />
            <div className="main-left">{html}</div>
            <div className="main-right">
                <Category payload={category.lists} />
                <Trending payload={trending.data} />
                <Other />
            </div>
        </div>
    )
}
