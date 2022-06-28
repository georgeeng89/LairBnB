import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, } from 'react-router-dom'
import { Modal, ModalEditForm } from '../../context/Modal';

import SpotForm from '../SpotForm/SpotForm';


function ListLairModal({user, spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
      <span className='sign-in' onClick={() => setShowModal(true)}>List a Lair</span>


      {showModal && (
        <ModalEditForm onClose={() => setShowModal(false)}>

          <div className='close-modal-container'>
            <span className='close-modal' onClick={() => setShowModal(false)}>X</span>
          </div>

          <SpotForm user={user} spot={spot} showModal={setShowModal}/>
        </ModalEditForm>
      )}
    </>
  );
}

export default ListLairModal;
