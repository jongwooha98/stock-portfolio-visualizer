import React, { useState } from 'react';
import './_portfolio.scss';
import useFirestore from '../../Hooks/useFirestore';
import ReactDom from 'react-dom';
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const customStyles = {
  content: {
    width: '80%',
    maxWidth: '768px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
function StockStats(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  // Modal
  let subtitle;
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal(e) {
    e.stopPropagation();
    setIsModalOpen(false);
  }
  const updateHoldings = () => {};
  return (
    <div className="row" onClick={openModal}>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Stock detail"
      >
        <div className="myStocks-modal">
          <div className="header">
            <h2>{props.name}</h2>
            <CloseIcon onClick={closeModal} className="close-button" />
          </div>
          <div className="shares">
            <RemoveCircleOutlineIcon className="shares__update shares__remove" />
            <div className="shares__current">
              <span>{props.volume && props.volume}</span>
              <span>shares</span>
            </div>
            <AddCircleOutlineIcon className="shares__update shares__add" />
          </div>
        </div>
      </Modal>
      <div className="row__intro">
        <h1>{props?.name}</h1>
        <p>{props.volume && props.volume + ' shares'}</p>
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

export default StockStats;
