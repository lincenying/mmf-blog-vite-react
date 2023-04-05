import React, { useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounceEffect, useMount, useScroll, useSetState, useUnmount, useUpdateEffect, useWhyDidYouUpdate } from 'ahooks'

import ls from 'store2'

import Category from '@/components/aside-category'
import Other from '@/components/aside-other'
import Trending from '@/components/aside-trending'
import TopicsItemNone from '@/components/topics-item-none'
import TopicsItem from '@/components/topics-item'

import { getTopics, topicsState } from '@/store/frontend/topics'
import { getTrending, trendingState } from '@/store/frontend/trending'
import { categoryState, getCategoryList } from '@/store/global/category'

export default function Topics() {
    const location = useLocation()
    const { id, key, by } = useParams()
    const pathname = location.pathname

    const topics = useSelector(topicsState)
    const category = useSelector(categoryState)
    const trending = useSelector(trendingState)
    const dispatch = useDispatch()

    const firstPathname = useRef(pathname)
    const [state, setState] = useSetState({
        scrollTop: 0,
        loading: false,
    })

    const handlefetchPosts = async (page = 1) => {
        dispatch(await getTopics({ id, key, by, pathname, page }))
    }

    const handleLoadMore = async () => {
        if (state.loading) return
        const { page } = topics
        setState({ loading: true })
        await handlefetchPosts(page + 1)
        setState({ loading: false })
    }

    const scroll = useScroll(document)

    useDebounceEffect(
        () => {
            ls.set(pathname, scroll?.top)
        },
        [scroll],
        {
            wait: 200,
        },
    )

    useUnmount(() => {
        // const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        // console.log('useUnmount', scrollTop)
        // if (scrollTop > 0 && ls.get(pathname) === null) ls.set(pathname, scrollTop)
    })

    useMount(async () => {
        console.log('topics useMount:')
        const pathname = firstPathname.current

        if (topics.pathname !== firstPathname.current) handlefetchPosts()
        if (category.lists.length === 0) dispatch(await getCategoryList({}))
        if (trending.data.length === 0) dispatch(await getTrending())

        if (topics.pathname !== '') {
            const scrollTop = ls.get(pathname)
            console.log('useMount', scrollTop)
            if (scrollTop !== null) {
                ls.remove(pathname)
                window.scrollTo(0, scrollTop)
            }
        }
    })

    useUpdateEffect(() => {
        console.log('topics useUpdateEffect:')
        if (topics.pathname !== firstPathname.current)
            handlefetchPosts()
    }, [location.pathname])

    useWhyDidYouUpdate('topicsComponent', { location, topics, category, trending })

    let html
    if (!topics.pathname) {
        html = (
            <div className="home-feeds cards-wrap">
                <TopicsItemNone>加载中, 请稍等...</TopicsItemNone>
            </div>
        )
    }
    else if (topics.data.length > 0) {
        const lists = topics.data.map(item => <TopicsItem key={item._id} payload={item} />)
        const hasNext = topics.hasNext
            ? (
            <a onClick={handleLoadMore} href={undefined} className={`load-more ${state.loading ? 'loading' : ''}`}>
                {state.loading ? '加载中' : '加载'}
                <i className="icon icon-circle-loading" />
            </a>
                )
            : (
                    ''
                )
        html = (
            <div className="home-feeds cards-wrap">
                {lists}
                <div className="load-more-wrap">{hasNext}</div>
            </div>
        )
    }
    else {
        html = (
            <div className="home-feeds cards-wrap">
                <TopicsItemNone>当前分类还没有文章...</TopicsItemNone>
            </div>
        )
    }
    return (
        <div className="main wrap">
            <div className="main-left">{html}</div>
            <div className="main-right">
                <Category payload={category.lists} />
                <Trending payload={trending.data} />
                <Other />
            </div>
        </div>
    )
}
