import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter } from 'react-router-dom'

import Root from './pages/app'
import store from './store'

console.log(`当前环境: ${import.meta.env.VITE_APP_ENV}`)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StoreContext.Provider value={store}>
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </StoreContext.Provider>
    </Provider>,
)
