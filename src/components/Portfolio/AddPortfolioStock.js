import React, { useState } from 'react';
import './_portfolio.scss';
import Finnhub from '../../finnhub/Finnhub';
import Crud from '../../firebase/Crud';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, IconButton, Button, TextField } from '@material-ui/core';

function random_rgb() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
}

function AddPortfolioStock() {
  const initialState = {
    ticker: '',
    shares: '',
  };
  const [newStock, setNewStock] = useState(initialState);
  const [isShareInputValid, setIsShareInputValid] = useState(true);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'ticker') {
      value = value.toUpperCase();
    }
    // Create function checking if ticker already exist in db.
    // If so, update shars instead of adding new doc to db.
    setNewStock({ ...newStock, [name]: value });
    if (value <= 0) {
      setIsShareInputValid(false);
    } else {
      setIsShareInputValid(true);
    }
  };
  const addNewStock = () => {
    if (isShareInputValid) {
      Finnhub.getCompanyProfile2(newStock.ticker).then((response) => {
        const randomColor = random_rgb();
        const data = {
          ticker: newStock.ticker,
          shares: newStock.shares / 1,
          name: response.name,
          logo: response.logo,
          industry: response.industry,
          pieColor: randomColor,
        };
        console.log(data);
        Crud.create(data)
          .then(() => {
            console.log('success: new stock added');
          })
          .catch((e) => {
            console.log(e);
          });
      });

      setNewStock(initialState);
    }
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal(e) {
    setNewStock(initialState);
    setIsShareInputValid(true);

    setIsModalOpen(false);
  }

  return (
    <>
      <IconButton className="add-stock__open-modal" onClick={openModal}>
        <AddIcon />
      </IconButton>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <div className="add-stock__modal">
          <IconButton onClick={closeModal} className="close-button">
            <CloseIcon />
          </IconButton>

          <form noValidate autoComplete="off" className="add-stock__form">
            <TextField
              id="add-stock__ticker"
              className="add-stock__ticker"
              label="Ticker"
              variant="outlined"
              onChange={handleInputChange}
              type="text"
              name="ticker"
              value={newStock.ticker}
            />
            <TextField
              id="add-stock__shares"
              label="Shares"
              variant="outlined"
              onChange={handleInputChange}
              type="number"
              name="shares"
              value={newStock.shares}
              error={!isShareInputValid ? true : false}
              helperText="Please add more than one share"
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
      </Dialog>
    </>
  );
}

export default AddPortfolioStock;
