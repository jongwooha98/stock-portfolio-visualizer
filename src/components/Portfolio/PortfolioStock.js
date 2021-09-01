import React, { useState } from 'react';
import './_portfolio.scss';
import RemoveFromPortfolio from './RemoveFromPortfolio';
import TradingViewWidget from 'react-tradingview-widget';
import Crud from '../../firebase/Crud';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Dialog, Avatar, IconButton } from '@material-ui/core';

function PortfolioStock(props) {
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  const initialShareCount = props.volume / 1;
  const [shareCount, setShareCount] = useState(initialShareCount);

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

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    const data = {
      ticker: props.ticker,
      shares: shareCount,
    };
    Crud.update(props.id, data)
      .then(() => {
        console.log('update success');
      })
      .catch((e) => {
        console.log(e);
      });
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="portfolio__stock__container" onClick={handleClickOpen}>
        <div className="intro">
          <Avatar
            alt=""
            src={props.logo}
            className="company-logo"
            fontSize="inherit"
          />

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
      </div>
      <Dialog fullScreen open={isModalOpen} onClose={handleClose}>
        <div className="myStocks-modal">
          <IconButton
            className="close-button"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <div className="myStocks-modal__content">
            <div className="header">
              <Avatar
                alt=""
                src={props.logo}
                className="company-logo"
                fontSize="inherit"
              />

              <h2 className="name">{props.name}</h2>
            </div>
            <div className="tradingview-widget">
              <TradingViewWidget
                symbol={props.ticker}
                autosize="true"
                interval="D"
                timezone="Etc/UTC"
                theme="light"
                style="1"
                locale="en"
                toolbar_bg="#f1f3f6"
                save_image="false"
              />
            </div>
            <div className="footer">
              <div style={{ width: '25%' }}>
                &nbsp;
                {/* empty for style purpose */}
              </div>
              <div className="shares" style={{ width: '50%' }}>
                <IconButton
                  onClick={removeShare}
                  className="shares__update shares__remove"
                >
                  <RemoveIcon />
                </IconButton>

                <div className="shares__current">
                  <span>{shareCount && shareCount}</span>
                  <span>{shareCount > 1 ? `shares` : `share`}</span>
                </div>
                <IconButton
                  onClick={addShare}
                  className="shares__update shares__add"
                >
                  <AddIcon />
                </IconButton>
              </div>
              <div className="remove-from-portfolio" style={{ width: '25%' }}>
                <RemoveFromPortfolio
                  id={props.id}
                  ticker={props.ticker}
                  name={props.name}
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default PortfolioStock;
