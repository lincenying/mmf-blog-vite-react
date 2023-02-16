import React from 'react'
import { Navigate } from 'react-router-dom'

const FrontendAuthorized = ({ component: Component, ...rest }) => {
    return rest.global.cookies.user ? <Component {...rest} /> : <Navigate to={{ pathname: '/', state: { from: rest.location } }} replace />
}
export default FrontendAuthorized
