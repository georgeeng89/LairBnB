import { csrfFetch } from './csrf';


//actions

const LOAD_BOOKINGS = "booking/LOAD_BOOKINGS";
const ADD_BOOKING = "booking/ADD_BOOKING";
const DELETE_BOOKING = "booking/DELETE_BOOKING";


//action creators


const getBookings = (bookings) => {
  return {
    type: LOAD_BOOKINGS,
    bookings,
  };
};

const createBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    booking,
  };
};

const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId,
  };
};



//thunks



export const getAllBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getBookings(data));
    return data;
  }
};


export const getUserBookings = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${userId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getBookings(data));
    return data;
  }
};

export const createOneBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createBooking(data));
    return data;
  }
};

export const deleteSingleBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBooking(bookingId));
    return data;
  }
};

export const bookingsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {


    case LOAD_BOOKINGS:
      newState = { ...state };
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;


    case ADD_BOOKING:
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;


    case DELETE_BOOKING:
      const removeState = { ...state };
      delete removeState[action.bookingId];
      return removeState;

    default: return state;
  }
};


export default bookingsReducer;
