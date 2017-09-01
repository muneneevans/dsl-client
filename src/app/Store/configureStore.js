import {  createStore,  applyMiddleware } from 'redux' 
import rootReducer from "./rootReducer"
import thunk from 'redux-thunk'
import { routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

export const history = createHistory()


const store  = createStore(rootReducer, applyMiddleware(thunk,routerMiddleware(history)))

export default store