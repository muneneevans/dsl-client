import {levels} from '../Common/dataTypes'
import * as commonSelectors from "../Common/selectors"
import * as facilitySelectors from "../Facilities/selectors"

export function getCurrentFacilityTypeSummary(state){
    switch(state.commonReducer.currentLevel){
        case levels.COUNTRY:
            return facilitySelectors.getCountryFacilityTypesSummary(state)
        case levels.COUNTY:
            return facilitySelectors.getCountyFacilityTypesSummary(state)        
    }    
}