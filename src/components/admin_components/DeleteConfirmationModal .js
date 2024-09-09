import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Potwierdź</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Czy napewno chcesz usunąć ten produkt?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Nie
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Tak
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
