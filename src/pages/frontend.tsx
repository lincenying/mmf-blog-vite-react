import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Route, Routes } from 'react-router-dom'

import NotFound from './frontend/404'

import About from './frontend/about'
import Article from './frontend/article'
import Main from './frontend/topics'
import userAccount from './frontend/user-account'
import userPassword from './frontend/user-password'
import ReloadPrompt from '@/components/reload-prompt'
import Sign from '@/components/sign'
import Authorized from '@/components/frontend-authorized'
import FrontendNavigation from '@/components/frontend-navigation'

function Frontend() {
    const location = useLocation()
    return (
        <div className="frontend">
            <FrontendNavigation />
            <TransitionGroup appear className="main-wrap">
                <CSSTransition classNames="slide-left" in={false} key={location.key} timeout={{ appear: 300, enter: 300, exit: 300 }}>
                    <Routes>
                        <Route element={<Main />} path="/" />
                        <Route element={<Main />} path="/trending/:by" />
                        <Route element={<Main />} path="/category/:id" />
                        <Route element={<Main />} path="/search/:key" />
                        <Route element={<Article />} path="/article/:id" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Authorized component={userAccount} />} path="/user/account" />
                        <Route element={<Authorized component={userPassword} />} path="/user/password" />
                        <Route element={<NotFound />} path="*" />
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
            <Sign />
            <ReloadPrompt />
        </div>
    )
}

export default Frontend
