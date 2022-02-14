import { csrfFetch } from './csrf';

const LOAD_REVIEWS = '/review/LOAD_REVIEWS'
const ADD_REVIEW = 'review/ADD_REVIEWS'
const REMOVE_REVIEW = '/review/REMOVE_REVIEW'
const LOAD_REVIEW = '/review/LOAD_REVIEW'


const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

const loadReviews = (reviews) => ({
      type: LOAD_REVIEWS,
      reviews
})

const removeReview = (review) => ({
      type: REMOVE_REVIEW,
      review
})
const loadReview = (review) => ({
      type: LOAD_REVIEW,
      review
})




export const getReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/review')
  if (res.ok) {
      const reviews = await res.json()
      dispatch(loadReviews(reviews))
      return reviews
  }
}

// export const getReviewBySpotId = (id) => async (dispatch) => {
//   const res = await csrfFetch(`/api/reviews/spot/${id}`)
//   if (res.ok) {
//       const reviews = await res.json()
//       dispatch(loadReviews(reviews))
//       return reviews
//   }
// }

export const editReview = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/review/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
  })
  if (res.ok) {
      const review = await res.json()
      dispatch(loadReview(review))
      return review
  }
}


export const postReview = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/review/spot/${payload.spotId}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
  })
  if (res.ok) {
      const review = await res.json()
      dispatch(addReview(review))
      return review
  }
}

export const destroyReview = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/review/${id}`, {
      method: 'DELETE'
  })
  if (res.ok) {
      const review = await res.json()
      dispatch(removeReview(review))
      return review
  }
}



const initialState = { reviews: {}, isLoading: true }

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS: {
            newState = { ...state }
            const reviewObj = { ...state.reviews }
            action.reviews.forEach(review => reviewObj[review.id] = review)
            newState.reviews = reviewObj
            return newState
        }


        case ADD_REVIEW: {
            newState = { ...state }
            newState.reviews = { ...state.reviews, [action.review.id]: action.review }
            return newState
        }


        case LOAD_REVIEW: {
            newState = { ...state }
            newState.reviews = { ...state.reviews, [action.review.id]: action.review }
            return newState
        }


        case REMOVE_REVIEW: {
            newState = { ...state }
            delete newState.reviews[action.review.id]
            return newState
        }


        default:
            return state;
    }
}

export default reviewReducer;
