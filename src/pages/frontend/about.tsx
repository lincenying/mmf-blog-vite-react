import React from 'react'

import Trending from '@/components/aside-trending'
import { getTrending, trendingState } from '@/store/frontend/trending'

export default function About() {
    const trending = useSelector(trendingState)
    const dispatch = useDispatch()

    useMount(async () => {
        console.log('about useMount: start')
        if (trending.data.length === 0)
            dispatch(await getTrending())
        console.log('about useMount: end')
    })

    return (
        <div className="main wrap">
            <div className="main-left">
                <div className="card card-answer">
                    <div className="answer-content">
                        <div className="article-content">
                            <h3 className="about-title">关于作者</h3>
                            <div className="flex-item">
                                <div className="flex-label">姓名:</div>
                                <div className="flex-content">林岑影</div>
                            </div>
                            <div className="flex-item">
                                <div className="flex-label">年龄:</div>
                                <div className="flex-content">1987.09</div>
                            </div>
                            <div className="flex-item">
                                <div className="flex-label">职业:</div>
                                <div className="flex-content">前端开发</div>
                            </div>
                            <div className="flex-item">
                                <div className="flex-label">Github:</div>
                                <div className="flex-content">
                                    <a href="https://github.com/lincenying" rel="noopener noreferrer" target="_blank">
                                        @lincenying
                                    </a>
                                </div>
                            </div>
                            <div className="flex-item">
                                <div className="flex-label">技能:</div>
                                <div className="flex-content">
                                    <ul className="about-ul">
                                        <li>HTML5 + CSS3</li>
                                        <li>NodeJS</li>
                                        <li>React</li>
                                        <li>Vue</li>
                                        <li>ES6</li>
                                        <li>Gulp</li>
                                        <li>WebPack</li>
                                        <li>jQuery</li>
                                        <li>PHP</li>
                                    </ul>
                                </div>
                            </div>
                            <h3 className="about-title">关于网站</h3>
                            <p>本站采用 React, React-Router, Redux 搭建, 分成前台和后台</p>
                            <p>主要功能包括: 管理员, 用户, 分类, 文章, 评论, 文章点赞</p>
                            <p>主要技术栈: react, react-router, redux, redux-toolkit, vitejs</p>
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
