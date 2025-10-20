import React from 'react'
import { Navigate } from 'react-router'

import { globalState } from '@/store/global'

interface Props {
    readonly component: React.ComponentType<any>
    readonly location?: string
}

function BackendAuthorized(props: Props) {
    const { component: Component, ...rest } = props
    const global = useSelector(globalState)

    return global.cookies.b_user ? (
        <Component {...rest} />
    ) : (
        <Navigate replace state={{ from: rest.location }} to={{ pathname: '/backend' }} />
    )
}
export default BackendAuthorized
