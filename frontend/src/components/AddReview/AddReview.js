import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, } from 'react-router-dom'
import { Modal, ModalEditForm } from '../../context/Modal';

// import EditSpotForm from '../EditSpotForm/EditSpotForm';

import AddReviewForm from '../AddReviewForm/AddReviewForm';

import './AddReview.css'



function AddReview({ user, spot }) {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}

      <span className='sign-in add-edit-button' onClick={() => setShowModal(true)}> <i class="fa-solid fa-circle-plus"></i> Review </span>


      {showModal && (
        <ModalEditForm onClose={() => setShowModal(false)}>

          <div className='close-modal-container'>
            <span className='close-modal' onClick={() => setShowModal(false)}><i class="fa-solid fa-xmark"></i></span>
          </div>

          <AddReviewForm user={user} spot={spot} setModal={setShowModal} />

        </ModalEditForm>
      )}
    </>
  );
}

export default AddReview;
