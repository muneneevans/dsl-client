import React from "react" 
import { render } from "react-dom" 
import {Provider} from "react-redux"
import 'babel-polyfill';  

import App from "./Containers/App"
import store from './Store/configureStore'

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);