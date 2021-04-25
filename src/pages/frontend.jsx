import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Route, Switch, withRouter } from 'react-router-dom'
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

const Frontend = props => {
    const global = useSelector(globalState)
    return (
        <div className="frontend">
            <FrontendNavigation location={props.location} history={props.history} />
            <TransitionGroup appear className="main-wrap">
                <CSSTransition classNames="slide-left" in={false} key={props.location.key} timeout={{ appear: 300, enter: 300, exit: 300 }}>
                    <Switch key={props.location.pathname} location={props.location}>
                        <Route name="index" path="/" component={Main} exact />
                        <Route name="trending" path="/trending/:by" component={Main} />
                        <Route name="category" path="/category/:id" component={Main} />
                        <Route name="search" path="/search/:key" component={Main} />
                        <Route name="article" path="/article/:id" component={Article} />
                        <Route name="about" path="/about" component={About} />
                        <Authorized name="account" path="/user/account" global={global} component={userAccount} />
                        <Authorized name="password" path="/user/password" global={global} component={userPassword} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Sign />
            <ReloadPrompt />
        </div>
    )
}

export default withRouter(Frontend)
