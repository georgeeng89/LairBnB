import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, } from 'react-router-dom'
import { Modal, ModalEditForm } from '../../context/Modal';

// import EditSpotForm from '../EditSpotForm/EditSpotForm';

import EditReviewForm from '../EditReviewForm/EditReviewForm';

import './EditReview.css'


function EditReview({user, review, id, spotId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
      <span className='sign-in' onClick={() => setShowModal(true)}>Edit Review</span>


      {showModal && (
        <ModalEditForm onClose={() => setShowModal(false)}>

          <div className='close-modal-container'>
            <span className='close-modal' onClick={() => setShowModal(false)}>X</span>
          </div>

          <EditReviewForm user={user} review={review} id={id} spotId={spotId}/>

        </ModalEditForm>
      )}
    </>
  );
}

export default EditReview;
