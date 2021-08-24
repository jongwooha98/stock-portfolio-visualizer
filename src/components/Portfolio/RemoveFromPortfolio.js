import React, { useState } from 'react';
import './_portfolio.scss';
import Crud from '../../firebase/Crud';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, IconButton, Button } from '@material-ui/core';

function RemoveFromPortfolio(props) {
  const removeEntirePosition = () => {
    Crud.remove(props.id).then(() => {
      console.log(`removed the entire ${props.name} position`);
    });
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={openModal}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        // isOpen={isModalOpen}
        // onRequestClose={closeModal}
        // style={customStyles}
        // contentLabel="Remove stock from portfolio"
      >
        <div className="remove-from-portfolio__modal">
          <IconButton onClick={closeModal} className="close-button">
            <CloseIcon />
          </IconButton>

          <div className="modal__content">
            <h3>Remove {props.ticker} from portfolio?</h3>
            <p>
              Your portfolio will no longer hold any {props.ticker} position.
            </p>
            <div className="selection-buttons">
              <Button variant="contained" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  removeEntirePosition();
                }}
              >
                Yes, Remove
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default RemoveFromPortfolio;
