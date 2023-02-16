import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { globalState } from '@/store/global'

const BackendAuthorized = ({ component: Component, ...rest }) => {
    const global = useSelector(globalState)

    return global.cookies.b_user ? <Component {...rest} /> : <Navigate to={{ pathname: '/backend', state: { from: rest.location } }} replace />
}
export default BackendAuthorized
