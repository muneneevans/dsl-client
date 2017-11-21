import * as types from "./actionTypes"

import MapService from "../../Services/mapService"

export function fetchCountyMap(){
    return function(dispatch, getState) {
        return MapService.getKenyaCountyMap().then(
            kenyaCountyMap => {
                dispatch({
                    type: types.KENYA_COUNTY_MAP_FETCHED,
                    kenyaCountyMap
                })
            }
        ).catch(error => {
            throw(error)
        });

        

    };
}


export function loadCats() {  
  return function(dispatch) {
    return catApi.getAllCats().then(cats => {
      dispatch(loadCatsSuccess(cats));
    }).catch(error => {
      throw(error);
    });
  };
}