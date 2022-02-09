// import { LOAD_ITEMS, REMOVE_ITEM, ADD_ITEM } from './items';
import { csrfFetch } from './csrf';

const LOAD = 'spot/LOAD';
// const LOAD_TYPES = 'spot/LOAD_TYPES';
// const ADD_ONE = 'spot/ADD_ONE';



const load = (list) => ({
  type: LOAD,
  list
});


export const getSpot = () => async (dispatch) => {
  const response = await fetch(`/api/spot`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};



const initialState = {
  list: {}
};


const spotReducer = (state = initialState, action) => {

  let newState;
  switch (action.type) {

    case LOAD: {
      newState = { ...state }

      const spotList = {}

      action.list.forEach(spot => {
        spotList[spot.id] = spot;
      })
  
      newState.list = spotList;
      return newState;
    }
    default: return state;

  }
}

export default spotReducer;
