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
  const { basketIsOpen, setBasketItems, setBasketIsOpen, basketItems, setBasketTotal, basketTotal: _basketTotal } = useContext(BasketContext);
  const container = useRef();
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [popupTop, setPopupTop] = useState('50%');
  const [popupLeft, setPopupLeft] = useState('50%');
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
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const phoneInput = document.querySelector('input[name="phone"]');
  
    const data = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      total_price: _basketTotal.toFixed(2),
      basketItems: basketItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    };
  
    // Perform the form submission logic (e.g., send the data to the server)
    // Use fetch or an HTTP library like axios for this
    console.log(data);
    // Example using fetch:
    fetch('http://172.20.10.3:3001/api/OrderPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Clear the basket
          setBasketIsOpen(false);
          setBasketItems([]);
          setBasketTotal(0);
          // Show success message
          toast('❤️ Order submitted successfully! Confirm email will be sent soon!', {
            autoClose: 10000,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
  
          // Navigate to the home page
          navigate('/');
        } else {
          throw new Error('Failed to submit order, please try again later');
        }
      })
      .catch((error) => {
        console.error('Error submitting order:', error);
        // Show error message
        toast.error('Failed to submit order. Please try again later.', {
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
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
                      <input type="text" name="email" style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.7rem', textAlign: 'left', width: '100%' }} />
                    </label>
                  </form>
                  <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label style={{ fontSize: '0.7rem', marginBottom: '3px', marginTop: '3px' }}>
                      country code+phone:
                      <input type="text"name="phone" style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.7rem', textAlign: 'left', width: '100%' }} />
                    </label>
                  </form>
                </div>
                <small>Shipping outside Hong Kong may cost extra*</small>
                <button
                  type="button"
                  className={styles.confirmBtn}
                  onClick={handleOrderSubmit}
                >
                  Confirm & Submit Order
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