import React, { useState } from 'react';
import './_portfolio.scss';
import RemoveFromPortfolio from './RemoveFromPortfolio';
import Crud from '../../firebase/Crud';
// import ReactDom from 'react-dom';
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Avatar } from '@material-ui/core';

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
function PortfolioStock(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  // add shares to firestore db
  // const initialState = {
  //   ticker: props.name,
  //   shares: props.volume,
  // };
  const initialShareCount = props.volume / 1;
  // const [myStock, setMyStock] = useState(initialState);
  const [shareCount, setShareCount] = useState(initialShareCount);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const addShare = () => {
    setShareCount((prevState) => prevState + 1);
  };
  const removeShare = () => {
    shareCount === 1
      ? setShareCount(1)
      : setShareCount((prevState) => prevState - 1);
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal(e) {
    const data = {
      ticker: props.ticker,
      shares: shareCount,
    };
    Crud.update(props.id, data)
      .then(() => {
        // setIsSubmitted(true);
        console.log('update success');
      })
      .catch((e) => {
        console.log(e);
      });
    e.stopPropagation();
    setIsModalOpen(false);
  }

  return (
    <div className="portfolio__stock__container" onClick={openModal}>
      <div className="intro">
        <Avatar alt="" src={props.logo} className="company-logo" />

        <div>
          <h1>{props?.ticker}</h1>
          <p>
            {shareCount && shareCount > 1
              ? `${shareCount} shares`
              : `${shareCount} share`}
          </p>
        </div>
      </div>

      <div className="numbers">
        <p className="current-price">{props.price}</p>

        <p
          className={
            percentage > 0
              ? 'percentage--positive'
              : percentage < 0
              ? 'percentage--negative'
              : 'percentage'
          }
        >
          {percentage > 0
            ? `+${Number(percentage).toFixed(2)}%`
            : `${Number(percentage).toFixed(2)}%`}
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Stock detail"
      >
        <div className="myStocks-modal">
          <CloseIcon onClick={closeModal} className="close-button" />
          <div className="myStocks-modal__content">
            <div className="header">
              <h2>{props.name}</h2>
            </div>
            <div className="shares">
              <RemoveIcon
                onClick={removeShare}
                className="shares__update shares__remove"
              />
              <div className="shares__current">
                <span>{shareCount && shareCount}</span>
                <span>{shareCount > 1 ? `shares` : `share`}</span>
              </div>
              <AddIcon
                onClick={addShare}
                className="shares__update shares__add"
              />
            </div>
          </div>
          <div className="remove-from-portfolio">
            <RemoveFromPortfolio
              id={props.id}
              ticker={props.ticker}
              name={props.name}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PortfolioStock;
