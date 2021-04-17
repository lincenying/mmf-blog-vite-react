import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

import { globalState } from '@/store/global'

const BackendAuthorized = ({ component: Component, ...rest }) => {
    const global = useSelector(globalState)

    return (
        <Route
            {...rest}
            render={renderProps => {
                return global.cookies.b_user ? (
                    <Component {...renderProps} />
                ) : (
                    <Redirect to={{ pathname: '/backend', state: { from: renderProps.location } }} />
                )
            }}
        />
    )
}
export default BackendAuthorized
