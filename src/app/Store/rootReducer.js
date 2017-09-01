import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

// import * as facilityReducer from './Facilities/reducer'
import mapReducer from './Maps/reducer'
import facilityReducer from './Facilities/reducer'
import indicatorReducer from "./Indicators/reducer"
import commonReducer from "./Common/reducer"

const rootReducer = combineReducers({
     mapReducer,
     commonReducer,
     facilityReducer,
     indicatorReducer,
     router: routerReducer
})

export default rootReducer