import { csrfFetch } from './csrf';


//actions

const LOAD_SPOTS = 'spot/LOAD_SPOTS';
const ADD_SPOT = 'spot/ADD_SPOT'
const LOAD_SPOT = 'spot/LOAD_SPOT'
const DELETE_SPOT = 'spot/DELETE_SPOT'


//action creators

export const addSpot = (newSpot) => ({
  type: ADD_SPOT, //action
  newSpot
});

export const loadSpots = (list) => ({
  type: LOAD_SPOTS,
  list
});

export const loadSingleSpot = (spot) => ({
  type: LOAD_SPOT,
  spot
})

export const deleteSpot = (spot) => ({
  type: DELETE_SPOT,
  spot
})

//Thunks

export const getSpot = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spot`);
  if (response.ok) {
    const list = await response.json();
    dispatch(loadSpots(list));
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
    dispatch(addSpot(newSpot))
    return newSpot;
  }
}

//For Editing a Spot
export const editSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spot/${spot.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(loadSingleSpot(updatedSpot))
  }
  return response;
}

export const getSpotId = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spot/${id}`)

  if (response.ok) {
      const spot = await response.json()
      if (spot === null) return null
      dispatch(loadSingleSpot(spot))
      return spot
  }
}

export const destroySpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spot/${id}`, {
      method: 'DELETE'
  })
  if (res.ok) {
      const spot = await res.json()
      dispatch(deleteSpot(spot))
      return spot
  }
}


//Spot Reducer

const initialState = {
  list: {},
  isLoading: true
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
      newState.list = spotList;
      return newState;
    }

    case ADD_SPOT: {
      newState = { ...state }
      newState.list = { ...newState.list, [action.newSpot.spot.id]: action.newSpot.spot }
      return newState;
    }

    case LOAD_SPOT: {
      newState = { ...state }
      newState.list = { ...state.list,[action.spot.id]: action.spot }
      return newState
    }

    case DELETE_SPOT: {
      newState = { ...state }
      delete newState[action.spot.id]
      return newState;
  }

    default: return state;
  }
}

export default spotReducer;
