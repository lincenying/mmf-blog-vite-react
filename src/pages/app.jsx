/* eslint-disable react/require-optimization, no-inline-comments */

// import ScrollToTop from '@/components/global/ScrollToTop.jsx'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { globalState } from '@/store/global'

import MatchWhenAuthorizedFrontend from '@/components/frontend-authorized.jsx'
import FrontendNavigation from '@/components/frontend-navigation.jsx'
import Sign from '@/components/sign.jsx'
import About from './frontend/about.jsx'
import Article from './frontend/article.jsx'
import Main from './frontend/topics.jsx'
import userAccount from './frontend/user-account.jsx'
import userPassword from './frontend/user-password.jsx'

import ReloadPrompt from '@/components/reload-prompt.jsx'

import MatchWhenAuthorized from '@/components/backend-authorized.jsx'
import BackendMenu from '@/components/backend-menu.jsx'
import AdminList from './backend/admin-list.jsx'
import AdminModify from './backend/admin-modify.jsx'
import ArticleInsert from './backend/article-insert.jsx'
import ArticleList from './backend/article-list.jsx'
import ArticleModify from './backend/article-modify.jsx'
import CategoryInsert from './backend/category-insert.jsx'
import CategoryList from './backend/category-list.jsx'
import CategoryModify from './backend/category-modify.jsx'
import Comment from './backend/comment.jsx'
import Login from './backend/login.jsx'
import UserList from './backend/user-list.jsx'
import UserModify from './backend/user-modify.jsx'

// import 'virtual:windi.css'
import 'toastr/build/toastr.min.css'
import '../assets/scss/style.scss'
import '../assets/css/hljs/googlecode.css'
import 'nprogress/nprogress.css'

const App = props => {
    const global = useSelector(globalState)
    if (props.location.pathname.indexOf('backend') >= 0) {
        return (
            <div id="app" className="backend">
                <FrontendNavigation location={props.location} history={props.history} />
                <div className="main wrap">
                    <div className="main-left">
                        <div className="home-feeds cards-wrap">
                            <Switch key={props.location.pathname} location={props.location}>
                                <Route name="backend" path="/backend" component={Login} exact />
                                <MatchWhenAuthorized name="admin_list" path="/backend/admin/list" global={global} component={AdminList} />
                                <MatchWhenAuthorized name="admin_modify" path="/backend/admin/modify/:id" global={global} component={AdminModify} />
                                <MatchWhenAuthorized name="article_insert" path="/backend/article/list" global={global} component={ArticleList} />
                                <MatchWhenAuthorized name="article_insert" path="/backend/article/insert" global={global} component={ArticleInsert} />
                                <MatchWhenAuthorized
                                    name="article_modify"
                                    path="/backend/article/modify/:id"
                                    global={global}
                                    component={ArticleModify}
                                />
                                <MatchWhenAuthorized name="article_comment" path="/backend/article/comment/:id" global={global} component={Comment} />
                                <MatchWhenAuthorized name="category_list" path="/backend/category/list" global={global} component={CategoryList} />
                                <MatchWhenAuthorized
                                    name="category_insert"
                                    path="/backend/category/insert"
                                    global={global}
                                    component={CategoryInsert}
                                />
                                <MatchWhenAuthorized
                                    name="category_modify"
                                    path="/backend/category/modify/:id"
                                    global={global}
                                    component={CategoryModify}
                                />
                                <MatchWhenAuthorized name="user_list" path="/backend/user/list" global={global} component={UserList} />
                                <MatchWhenAuthorized name="user_modify" path="/backend/user/modify/:id" global={global} component={UserModify} />
                            </Switch>
                        </div>
                    </div>
                    <BackendMenu />
                    <ReloadPrompt />
                </div>
            </div>
        )
    }
    return (
        <div id="app" className={'frontend'}>
            <FrontendNavigation location={props.location} history={props.history} />
            <TransitionGroup appear>
                <CSSTransition classNames="example" in={false} key={props.location.key} timeout={{ appear: 300, enter: 300, exit: 300 }}>
                    <Switch key={props.location.pathname} location={props.location}>
                        <Route name="index" path="/" component={Main} exact />
                        <Route name="trending" path="/trending/:by" component={Main} />
                        <Route name="category" path="/category/:id" component={Main} />
                        <Route name="search" path="/search/:key" component={Main} />
                        <Route name="article" path="/article/:id" component={Article} />
                        <Route name="about" path="/about" component={About} />
                        <MatchWhenAuthorizedFrontend name="account" path="/user/account" global={global} component={userAccount} />
                        <MatchWhenAuthorizedFrontend name="password" path="/user/password" global={global} component={userPassword} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Sign />
            <ReloadPrompt />
        </div>
    )
}
export default withRouter(App)
