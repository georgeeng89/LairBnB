import { csrfFetch } from './csrf';


//actions
const LOAD_SPOTS = 'spot/LOAD_SPOTS';
const ADD_SPOT = 'spot/ADD_SPOT'


//action creators
export const addSpot = (newSpot) => ({
  type: ADD_SPOT, //action
  newSpot
});

const load = (list) => ({
  type: LOAD_SPOTS,
  list
});


export const getSpot = () => async (dispatch) => {
  const response = await fetch(`/api/spot`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createSpot = (payload) => async (dispatch, getState) => {
  const response = await csrfFetch('/api/spot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  console.log(response)

  if (response.ok) {
    const newSpot = await response.json()

    console.log('NEW SPOT ????? ----> ', newSpot)

    dispatch(addSpot(newSpot))
    return newSpot;
  }
}




const initialState = {
  entries: {}
};

const spotReducer = (state = initialState, action) => {

  let newState;
  switch (action.type) {

    case LOAD_SPOTS: {
      newState = { ...state }
      const spotList = {}
      action.list.forEach(spot => {
        spotList[spot.id] = spot;
      })
      newState.entries = spotList;
      return newState;
    }

    case ADD_SPOT: {
      newState = { ...state }
      newState.entries = { ...newState.entries, [action.newSpot.id]: action.newSpot }
      return newState;
    }

    default: return state;
  }
}

export default spotReducer;
