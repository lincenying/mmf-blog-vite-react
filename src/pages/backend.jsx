import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { globalState } from '@/store/global'

import FrontendNavigation from '@/components/frontend-navigation.jsx'
import Authorized from '@/components/backend-authorized.jsx'
import BackendMenu from '@/components/backend-menu.jsx'
import ReloadPrompt from '@/components/reload-prompt.jsx'

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

const Frontend = props => {
    const global = useSelector(globalState)
    return (
        <div className="backend">
            <FrontendNavigation location={props.location} history={props.history} />
            <div className="main wrap">
                <div className="main-left">
                    <div className="home-feeds cards-wrap">
                        <Switch key={props.location.pathname} location={props.location}>
                            <Route name="backend" path="/backend" component={Login} exact />
                            <Authorized name="admin_list" path="/backend/admin/list" global={global} component={AdminList} />
                            <Authorized name="admin_modify" path="/backend/admin/modify/:id" global={global} component={AdminModify} />
                            <Authorized name="article_insert" path="/backend/article/list" global={global} component={ArticleList} />
                            <Authorized name="article_insert" path="/backend/article/insert" global={global} component={ArticleInsert} />
                            <Authorized name="article_modify" path="/backend/article/modify/:id" global={global} component={ArticleModify} />
                            <Authorized name="article_comment" path="/backend/article/comment/:id" global={global} component={Comment} />
                            <Authorized name="category_list" path="/backend/category/list" global={global} component={CategoryList} />
                            <Authorized name="category_insert" path="/backend/category/insert" global={global} component={CategoryInsert} />
                            <Authorized name="category_modify" path="/backend/category/modify/:id" global={global} component={CategoryModify} />
                            <Authorized name="user_list" path="/backend/user/list" global={global} component={UserList} />
                            <Authorized name="user_modify" path="/backend/user/modify/:id" global={global} component={UserModify} />
                        </Switch>
                    </div>
                </div>
                <BackendMenu />
            </div>
            <ReloadPrompt />
        </div>
    )
}

export default withRouter(Frontend)
