// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

import './LoginFormModal.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
      <span className='sign-in' onClick={() => setShowModal(true)}>Log In</span>

      {showModal && (
        <Modal className='login-form-modal' onClose={() => setShowModal(false)}>

          <div className='close-modal-container'>
            <span className='close-modal' onClick={() => setShowModal(false)}>X</span>
          </div>

          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
