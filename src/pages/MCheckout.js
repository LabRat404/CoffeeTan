import styles from 'styles/mCheckout.module.scss';
import Title from 'components/Title';
import BasketSidebar from '../components/BasketSidebar';

import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emptyCardImg from "images/basket.png";
import GetIcon from "components/GetIcon";
import clsx from "clsx";
import BasketItem from "components/BasketItem";
import { BasketContext } from "context/BasketContext";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from "react-router-dom";
const MCheckout = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const { basketIsOpen, setBasketItems, setBasketIsOpen, basketItems, setBasketTotal, basketTotal: _basketTotal } = useContext(BasketContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [popupTop, setPopupTop] = useState('50%');
  const [popupLeft, setPopupLeft] = useState('50%');
  const navigate = useNavigate();
  const container = useRef();

  const [currentComponent, setCurrentComponent] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setPopupTop(`${window.innerHeight / 2}px`);
      setPopupLeft(`${window.innerWidth / 2}px`);
    };


    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleOrderSubmit = () => {
    setButtonDisabled(true);
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const zipCodeInput = document.getElementById('zipCode');
    const countryInput = document.getElementById('country');
    const notesInput = document.getElementById('notes');

    const data = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      address: addressInput.value,
      city: cityInput.value,
      zipCode: zipCodeInput.value,
      country: countryInput.value,
      notes: notesInput.value,
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
    if(_basketTotal<1){
      toast.error('Shop something first before placing orders!', {
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

    }else{
      const id = toast.loading("Submitting orders...")
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
          toast.dismiss();
          toast(' Order submitted successfully! Confirm email will be sent soon! Our staff will contact you ASAP!', {
            autoClose: 10000,
            icon:"❤️",
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          // Navigate to the home page
          <Link
          to="/"   
        >
        </Link>
          setCurrentComponent("");
          setNavIsOpen(false);

        
        } else {
          throw new Error('Failed to submit order, please try again later');
        }
      })
      .catch((error) => {
        console.error('Error submitting order:', error);
        // Show error message
        toast.dismiss();
        toast.error('Failed to submit order. Please fill in all the *required or try again later.', {
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
      setButtonDisabled(false);
    }
    
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <div className={styles.checkoutContainer}>

      <div className={styles.checkoutWrapper}>

        <div>
          <button onClick={toggleDropdown} className={styles.tbut}>Show Cart</button>
          {isDropdownOpen && (
            <div className={styles.sidebar}>
              <div className={styles.header}>
                <Title txt="Current Basket" size={25} />
                {basketItems.length > 1 ? (
                  <small>{basketItems.length} items in basket</small>
                ) : (
                  <small>{basketItems.length} item in basket</small>
                )}
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
                      <Title txt="Total HKD" size={20} transform="uppercase" />
                      <div className={styles.price}>
                        <span>{"$" + _basketTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.emptyBasket}>
                  <img src={emptyCardImg} alt="Empty Basket" />
                  <Title txt="Your basket is empty!" size={17} transform="uppercase" />
                  <small>Add items to the basket to proceed.</small>
                </div>
              )}
            </div>
          )}
        </div>


        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Checkout &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;</h2>
          <div className={styles.section}>
            <br />
            <h2>Shipping Address</h2>
            <br />
            <div className={styles.field}>
              <label htmlFor="address" className={styles.label}>
                Address*:
              </label>
              <input type="text" id="address" name="address" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label htmlFor="city" className={styles.label}>
                City*:
              </label>
              <input type="text" id="city" name="city" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label htmlFor="zipCode" className={styles.label}>
                Zip Code:
              </label>
              <input type="text" id="zipCode" name="zipCode" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label htmlFor="country" className={styles.label}>
                Country*:
              </label>
              <input type="text" id="country" name="country" className={styles.input} />
            </div>
          </div>
          <div className={styles.section}>
            <h2>Contact Information</h2>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Full Name*:
              </label>
              <input type="text" id="name" name="name" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email*:
              </label>
              <input type="email" id="email" name="email" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Phone*: (with country code)
              </label>
              <input type="tel" id="phone" name="phone" className={styles.input} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.field}>
              <label htmlFor="notes" className={styles.label}>
                Notes:
              </label>
              <textarea id="notes" name="notes" className={styles.textarea}></textarea>
            </div>
          </div>
          <button className={styles.button} onClick={handleOrderSubmit} disabled={isButtonDisabled}>
  Place Order
</button>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default MCheckout;