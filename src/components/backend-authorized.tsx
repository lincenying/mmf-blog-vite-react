import React from 'react'
import { Navigate } from 'react-router-dom'

import { globalState } from '@/store/global'

interface Props {
    component: React.ComponentType<any>
    location?: string
}

function BackendAuthorized(props: Props) {
    const { component: Component, ...rest } = props
    const global = useSelector(globalState)

    return global.cookies.b_user ? <Component {...rest} /> : <Navigate to={{ pathname: '/backend' }} state= {{ from: rest.location }} replace />
}
export default BackendAuthorized
