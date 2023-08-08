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
  const { basketIsOpen, setBasketIsOpen, basketItems, basketTotal: _basketTotal } = useContext(BasketContext);
  const container = useRef();
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [popupTop, setPopupTop] = useState('50%');
  const [popupLeft, setPopupLeft] = useState('50%');

  useEffect(() => {
    const handleResize = () => {
      setPopupTop(`${window.innerHeight / 2}px`);
      setPopupLeft(`${window.innerWidth / 2}px`);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFormSubmit = () => {
    // Perform form submission logic

    // Show success message
    toast.success('Order submitted successfully!');
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
                  <Title txt="Total HKD" size={17} transform="uppercase" />
                  <div className={styles.price}>
                    <span>{"$" + _basketTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className={styles.total}>
                  <Title txt="Contact Info" size={17} transform="uppercase" />
                  <GetIcon icon="BsPersonVcard" size={20} />
                </div>
                <div style={{ display: 'flex' }}>
                  <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label style={{ fontSize: '0.7rem', marginBottom: '3px', marginTop: '3px' }}>
                      Name:
                      <input type="text" name="name" style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.7rem', textAlign: 'left', width: '100%' }} />
                    </label>
                  </form>
                  <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label style={{ fontSize: '0.7rem', marginBottom: '3px', marginTop: '3px' }}>
                      Email:
                      <input type="text" name="name" style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.7rem', textAlign: 'left', width: '100%' }} />
                    </label>
                  </form>
                  <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label style={{ fontSize: '0.7rem', marginBottom: '3px', marginTop: '3px' }}>
                      country code+phone:
                      <input type="text" name="name" style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.7rem',textAlign: 'left', width: '100%' }} />
                    </label>
                  </form>
                </div>
                <small>Shipping outside Hong Kong may cost extra*</small>
                <button
                  type="button"
                  className={styles.confirmBtn}
                  onClick={handleFormSubmit}
                >
                  Confirm & Submit Order
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyBasket}>
              <img src={emptyCardImg} alt="Empty Basket" />
              <p>Your basket is empty</p>
            </div>
          )}
        </div>
      </div>
      {basketIsOpen && (
        <div
          className={styles.popup}
          style={{ top: popupTop, left: popupLeft }}
          onClick={() => setIsPopupOpen(false)}
        >
          <div className={styles.popupContent}>
            <GetIcon icon="BsArrowRight" size={20} />
            <p>Swipe Right to Open Basket</p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BasketSidebar;