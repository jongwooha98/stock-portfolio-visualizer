import React, { useState } from 'react';
import './_portfolio.scss';
import Crud from '../../firebase/Crud';
import { Button, TextField } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';

function random_rgb() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
}

const customStyles = {
  content: {
    // width: '80%',
    maxWidth: '768px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function AddPortfolioStock() {
  const initialState = {
    ticker: '',
    shares: '',
  };
  const [newStock, setNewStock] = useState(initialState);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'ticker') {
      value = value.toUpperCase();
    }
    setNewStock({ ...newStock, [name]: value });
  };
  const addNewStock = () => {
    const randomColor = random_rgb();

    const data = {
      ticker: newStock.ticker,
      shares: newStock.shares / 1,
      pieColor: randomColor,
    };
    Crud.create(data)
      .then(() => {
        console.log('success: new stock added');
      })
      .catch((e) => {
        console.log(e);
      });
    setNewStock(initialState);
  };
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal(e) {
    setNewStock(initialState);
    e.stopPropagation();
    setIsModalOpen(false);
  }

  return (
    <>
      <IconButton className="add-stock__open-modal" onClick={openModal}>
        <AddIcon />
      </IconButton>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add new stock"
      >
        <div className="add-stock__modal">
          <CloseIcon onClick={closeModal} className="close-button" />
          <form noValidate autoComplete="off" className="add-stock__form">
            <TextField
              id="add-stock__ticker"
              className="add-stock__ticker"
              label="Ticker"
              onChange={handleInputChange}
              type="text"
              name="ticker"
              value={newStock.ticker}
            />
            <TextField
              id="add-stock__shares"
              label="Shares"
              onChange={handleInputChange}
              type="number"
              name="shares"
              value={newStock.shares}
            />
            <Button
              onClick={() => {
                addNewStock();
              }}
              variant="contained"
              color="primary"
            >
              Add to My Portfolio
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AddPortfolioStock;
