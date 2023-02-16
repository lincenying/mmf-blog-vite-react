import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Route, Routes, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { globalState } from '@/store/global'

import FrontendNavigation from '@/components/frontend-navigation.jsx'
import Authorized from '@/components/frontend-authorized.jsx'
import Sign from '@/components/sign.jsx'
import ReloadPrompt from '@/components/reload-prompt.jsx'

import NotFound from './frontend/404.jsx'

import About from './frontend/about.jsx'
import Article from './frontend/article.jsx'
import Main from './frontend/topics.jsx'
import userAccount from './frontend/user-account.jsx'
import userPassword from './frontend/user-password.jsx'

const Frontend = () => {
    const global = useSelector(globalState)
    const location = useLocation()
    return (
        <div className="frontend">
            <FrontendNavigation />
            <TransitionGroup appear className="main-wrap">
                <CSSTransition classNames="slide-left" in={false} key={location.key} timeout={{ appear: 300, enter: 300, exit: 300 }}>
                    <Routes>
                        <Route name="index" path="/" element={<Main />} />
                        <Route name="trending" path="/trending/:by" element={<Main />} />
                        <Route name="category" path="/category/:id" element={<Main />} />
                        <Route name="search" path="/search/:key" element={<Main />} />
                        <Route name="article" path="/article/:id" element={<Article />} />
                        <Route name="about" path="/about" element={<About />} />
                        <Route
                            name="account"
                            path="/user/account"
                            element={<Authorized name="account" path="/user/account" global={global} component={userAccount} />}
                        />
                        <Route
                            name="password"
                            path="/user/password"
                            element={<Authorized name="password" path="/user/password" global={global} component={userPassword} />}
                        />
                        <Route path="*" element={NotFound} />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
            <Sign />
            <ReloadPrompt />
        </div>
    )
}

export default Frontend
