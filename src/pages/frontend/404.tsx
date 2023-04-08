import React from 'react'

import Trending from '@/components/aside-trending'
import { getTrending, trendingState } from '@/store/frontend/trending'

export default function About() {
    const trending = useSelector(trendingState)
    const dispatch = useDispatch()

    useMount(async () => {
        console.log('404 useMount: start')
        if (trending.data.length === 0)
            dispatch(await getTrending())
        console.log('404 useMount: end')
    })

    return (
        <div className="main wrap">
            <div className="main-left">
                <div className="card card-answer">
                    <div className="answer-content">
                        <div className="flex py-40px justify-center">
                            <img src="/static/images/error_1.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-right">
                <Trending payload={trending.data} />
            </div>
        </div>
    )
}
