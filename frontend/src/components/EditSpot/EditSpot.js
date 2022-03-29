import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, } from 'react-router-dom'
import { Modal, ModalEditForm } from '../../context/Modal';

import EditSpotForm from '../EditSpotForm/EditSpotForm';

import './EditSpot.css'


function EditSpot({user, spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
      <span className='sign-in' onClick={() => setShowModal(true)}>Edit</span>


      {showModal && (
        <ModalEditForm onClose={() => setShowModal(false)}>

          <div className='close-modal-container'>
            <span className='close-modal' onClick={() => setShowModal(false)}>X</span>
          </div>

          <EditSpotForm user={user} spot={spot} showModal={setShowModal}/>
        </ModalEditForm>
      )}
    </>
  );
}

export default EditSpot;
