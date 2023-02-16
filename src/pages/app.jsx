/* eslint-disable react/require-optimization, no-inline-comments */

import React from 'react'
import { useLocation } from 'react-router-dom'

import Frontend from './frontend.jsx'
import Backend from './backend.jsx'

import 'virtual:windi.css'
import '../assets/scss/style.scss'
import '../assets/css/hljs/googlecode.css'
import 'nprogress/nprogress.css'

const App = () => {
    const location = useLocation()
    if (location.pathname.indexOf('backend') >= 0) {
        return <Backend />
    }
    return <Frontend />
}
export default App
