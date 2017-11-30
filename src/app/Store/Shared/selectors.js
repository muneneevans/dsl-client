import {levels} from '../Common/dataTypes'
import * as commonSelectors from "../Common/selectors"
import * as facilitySelectors from "../Facilities/selectors"
import * as indicatorSelectors from '../Indicators/selectors'

export function getCurrentFacilityTypeSummary(state){
    switch(state.commonReducer.currentLevel){
        case levels.COUNTRY:
            return facilitySelectors.getCountryFacilityTypesSummary(state)
        case levels.COUNTY:
            return facilitySelectors.getCountyFacilityTypesSummary(state)        
    }    
}


export function getFacilityCombinedGraphs(state){
    //get all the graphs form the other domains and compile to one graph
    //define all graphs that are being combined
    let combinedGraph = undefined
    let indicatorsGraphData = undefined
    //test if indicator data present
    if (state.indicatorReducer.facilityIndicatorDataValues){
        indicatorsGraphData = indicatorSelectors.getFacilityIndicatorDataValuesMapData(state)
    }
    else{

    }

    //check if hr data is present and append to 
    
}