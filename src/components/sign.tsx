import React from 'react'
import SignIn from '@/components/sign-in.jsx'
import SignUp from '@/components/sign-up.jsx'

function Sign() {
    const location = useLocation()
    const backend = useRef(location.pathname.indexOf('/backend') === 0)
    const signUpHtml = !backend.current ? <SignUp /> : ''
    const signInHtml = !backend.current ? <SignIn /> : ''
    return (
        <>
            {signUpHtml}
            {signInHtml}
        </>
    )
}
export default Sign
