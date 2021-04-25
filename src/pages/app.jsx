/* eslint-disable react/require-optimization, no-inline-comments */

import React from 'react'
import { withRouter } from 'react-router-dom'

import Frontend from './frontend.jsx'
import Backend from './backend.jsx'

import 'virtual:windi.css'
import 'toastr/build/toastr.css'
import '../assets/scss/style.scss'
import '../assets/css/hljs/googlecode.css'
import 'nprogress/nprogress.css'

const App = props => {
    if (props.location.pathname.indexOf('backend') >= 0) {
        return <Backend />
    }
    return <Frontend />
}
export default withRouter(App)
