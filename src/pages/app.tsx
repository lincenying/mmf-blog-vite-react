import React from 'react'
import { useLocation } from 'react-router-dom'

import Frontend from './frontend'
import Backend from './backend'

import 'uno.css'
import '../assets/scss/style.scss'
import '../assets/css/hljs/googlecode.css'
import 'nprogress/nprogress.css'

const App = () => {
    const location = useLocation()
    if (location.pathname.includes('backend'))
        return <Backend />

    return <Frontend />
}
export default App
