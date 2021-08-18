import React, { useState } from 'react';
import './_portfolio.scss';
import RemoveFromPortfolio from './RemoveFromPortfolio';
import Crud from '../../firebase/Crud';
// import ReactDom from 'react-dom';
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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
    setShareCount((prevState) => prevState - 1);
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal(e) {
    const data = {
      ticker: props.name,
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
    <div className="row" onClick={openModal}>
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
                <span>shares</span>
              </div>
              <AddIcon
                onClick={addShare}
                className="shares__update shares__add"
              />
            </div>
          </div>
          <div className="remove-from-portfolio">
            <RemoveFromPortfolio id={props.id} name={props.name} />
          </div>
        </div>
      </Modal>
      <div className="row__intro">
        <h1>{props?.name}</h1>
        <p>{shareCount && shareCount + ' shares'}</p>
      </div>
      <div className="row__chart">
        {/* <img src={StockChart} height={16}/> */}
      </div>
      <div className="row__numbers">
        <p className="row__price">{props.price}</p>

        <p
          className={
            percentage > 0
              ? 'row__percentage-positive'
              : percentage < 0
              ? 'row__percentage-negative'
              : 'row__percentage'
          }
        >
          {Number(percentage).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default PortfolioStock;
