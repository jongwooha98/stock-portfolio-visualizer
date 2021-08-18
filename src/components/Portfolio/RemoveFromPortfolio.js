import React, { useState } from 'react';
import './_portfolio.scss';
import Crud from '../../firebase/Crud';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';

const customStyles = {
  content: {
    // width: '80%',
    // maxWidth: '768px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function RemoveFromPortfolio(props) {
  const removeEntirePosition = () => {
    Crud.remove(props.id).then(() => {
      console.log(`removed the entire ${props.name} position`);
    });
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal(e) {
    e.stopPropagation();
    setIsModalOpen(false);
  }
  const classes = useStyles();

  return (
    <>
      <IconButton aria-label="delete" onClick={openModal}>
        <DeleteIcon />
      </IconButton>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Remove stock from portfolio"
      >
        <div className="remove-from-portfolio__modal">
          <CloseIcon onClick={closeModal} className="close-button" />

          <div className="modal__content">
            <h3>Remove {props.name} from portfolio?</h3>
            <p>Your portfolio will no longer hold any {props.name} position.</p>
            <div className="selection-buttons">
              <Button variant="contained" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
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
      </Modal>
    </>
  );
}

export default RemoveFromPortfolio;
