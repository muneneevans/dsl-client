import { combineReducers } from "redux"

// import * as facilityReducer from './Facilities/reducer'
import mapReducer from './Maps/reducer'
import facilityReducer from './Facilities/reducer'

const rootReducer = combineReducers({
     mapReducer,
     facilityReducer
})

export default rootReducer