import React, { useRef } from 'react'
import { withRouter } from 'react-router-dom'
import SignIn from '@/components/sign-in.jsx'
import SignUp from '@/components/sign-up.jsx'

const Sign = props => {
    const backend = useRef(props.location.pathname.indexOf('/backend') === 0)
    const signUpHtml = !backend.current ? <SignUp /> : ''
    const signInHtml = !backend.current ? <SignIn /> : ''
    return (
        <>
            {signUpHtml}
            {signInHtml}
        </>
    )
}
export default withRouter(Sign)
