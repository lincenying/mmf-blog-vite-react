import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter as Router } from 'react-router-dom'

import Root from './pages/app'
import store from './store'

console.log('当前环境: ' + import.meta.env.VITE_APP_ENV)

render(
    <Provider store={store}>
        <StoreContext.Provider value={store}>
            <Router>
                <Root />
            </Router>
        </StoreContext.Provider>
    </Provider>,
    document.getElementById('root')
)
