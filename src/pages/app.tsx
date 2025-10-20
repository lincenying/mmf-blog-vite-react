import React from 'react'
import { useLocation } from 'react-router'

import Backend from './backend'
import Frontend from './frontend'

import 'uno.css'
import '../assets/scss/style.scss'
import '../assets/css/hljs/googlecode.css'
import 'nprogress/nprogress.css'

function App() {
    const location = useLocation()
    if (location.pathname.includes('backend')) {
        return <Backend />
    }

    return <Frontend />
}
export default App
