import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "styles/BasketSidebar.module.scss";
import emptyCardImg from "images/basket.png";
import GetIcon from "components/GetIcon";
import Title from "components/Title";
import clsx from "clsx";
import BasketItem from "components/BasketItem";
import { BasketContext } from "context/BasketContext";
import { useContext, useRef } from "react";
import React, { useState, useEffect } from 'react';

const BasketSidebar = () => {
  const {
    basketIsOpen,
    setBasketItems,
    setBasketIsOpen,
    basketItems,
    setBasketTotal,
    basketTotal: _basketTotal
  } = useContext(BasketContext);
  const container = useRef();
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [popupTop, setPopupTop] = useState('50%');
  const [popupLeft, setPopupLeft] = useState('50%');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setPopupTop(`${window.innerHeight / 2}px`);
      setPopupLeft(`${window.innerWidth / 2}px`);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOrderSubmit = () => {
    setIsLoading(true); // Set loading state before navigating

    setTimeout(() => {
      setIsLoading(false); // Reset loading state after the timeout
      navigate('/order-submission');
      setBasketIsOpen(false);
    }, 1000);
  };

  return (
    <div>
      <div
        className={clsx(styles.sidebarContainer, basketIsOpen ? styles.show : styles.hide)}
        ref={container}
        onClick={(event) => event.target === container.current && setBasketIsOpen(false)}
      >
        <div className={styles.sidebar}>
          <div className={styles.header}>
            <div className={styles.title}>
              <Title txt="your basket" size={20} transform="uppercase" />
              {basketItems.length > 1 ? (
                <small>{basketItems.length} items in basket</small>
              ) : (
                <small>{basketItems.length} item in basket</small>
              )}
            </div>
            <button className={styles.close} onClick={() => setBasketIsOpen(false)}>
              <GetIcon icon="BsX" size={30} />
            </button>
          </div>
          {basketItems.length > 0 ? (
            <>
              <div className={styles.items}>
                {basketItems?.map((item, key) => (
                  <BasketItem data={item} key={key} />
                ))}
              </div>
              <div className={styles.basketTotal}>
                <div className={styles.totalPrice}>
                  <Title txt="Product HKD" size={17} transform="uppercase" />
                  <div className={styles.price}>
                    <span>{"$" + _basketTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className={styles.totalPrice}>
                  <Title txt="Tax" size={17} transform="uppercase" />
                  <div className={styles.price}>
                    <span>{"$" +0}</span>
                  </div>
                </div>
                <div className={styles.totalPrice}>
                  <Title txt="Total HKD" size={17} transform="uppercase" />
                  <div className={styles.price}>
                    <span>{"$" + _basketTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.confirmBtn}
                  onClick={handleOrderSubmit}
                  disabled={isLoading} // Disable the button when loading
                >
                  {isLoading ? (
                    <div className={styles.loadingIcon}>Loading...</div> // Show loading icon
                  ) : (
                    'Confirm Cart'
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyBasket}>
              <img src={emptyCardImg} alt="Empty Basket" />
              <Title txt="Your basket is empty!" size={18} transform="uppercase" />
              <small>Add items to the basket to proceed.</small>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BasketSidebar;