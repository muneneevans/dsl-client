import * as types from "./actionTypes"
import Immutable from "seamless-immutable"


const InitialState = Immutable({
    kenyaCountyMap: undefined
});

export default function mapReducer(state = InitialState, action={}) {
    switch (action.type) {
        case types.KENYA_COUNTY_MAP_FETCHED:
            return state.merge({
                kenyaCountyMap: action.kenyaCountyMap
            });
        default:
            return state
    }
}


//selectors
export function getKenyaCountyMap(state){
    return  state.mapReducer.kenyaCountyMap;
    // return  {'asdfasdf': 'asdfasdf'};
}
