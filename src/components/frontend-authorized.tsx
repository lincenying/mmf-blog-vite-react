import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
    [x: string]: any
    component: any
}

const FrontendAuthorized = (props: Props) => {
    const { component: Component, ...rest } = props
    return rest.global.cookies.user ? <Component {...rest} /> : <Navigate to={{ pathname: '/' }} state= {{ from: rest.location }} replace />
}
export default FrontendAuthorized
