import React from 'react'
import { Navigate } from 'react-router-dom'
import { globalState } from '@/store/global'

interface Props {
    component: React.ComponentType<any>
    location?: string
}

function FrontendAuthorized(props: Props) {
    const { component: Component, ...rest } = props
    const global = useSelector(globalState)
    return global.cookies.user ? <Component {...rest} /> : <Navigate to={{ pathname: '/' }} state= {{ from: rest.location }} replace />
}
export default FrontendAuthorized
