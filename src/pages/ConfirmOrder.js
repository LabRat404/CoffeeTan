
import styles from 'styles/Checkout.module.scss';
import Title from 'components/Title';
import BasketSidebar from '../components/BasketSidebar';

import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles2 from "styles/BasketSidebar.module.scss";
import emptyCardImg from "images/basket.png";
import GetIcon from "components/GetIcon";
import clsx from "clsx";
import BasketItem from "components/BasketItem";
import { BasketContext } from "context/BasketContext";
import React, { useState, useEffect, useContext, useRef } from 'react';


const Checkout = () => {
    const { basketIsOpen, setBasketItems, setBasketIsOpen, basketItems, setBasketTotal, basketTotal: _basketTotal } = useContext(BasketContext);

    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const [popupTop, setPopupTop] = useState('50%');
    const [popupLeft, setPopupLeft] = useState('50%');
    const navigate = useNavigate();
    const container = useRef();

    useEffect(() => {
        const handleResize = () => {
            setPopupTop(`${window.innerHeight / 2}px`);
            setPopupLeft(`${window.innerWidth / 2}px`);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.checkoutWrapper}>
                <div className={styles.checkoutContent}>
                    <Title txt="Checkout" size={30} transform="uppercase" />
                    <div className={styles2.sidebar}>
                        <div className={styles2.header}>
                            <div className={styles2.title}>
                                <Title txt="Current basket" size={20} transform="uppercase" />
                                {basketItems.length > 1 ? (
                                    <small>{basketItems.length} items in basket</small>
                                ) : (
                                    <small>{basketItems.length} item in basket</small>
                                )}
                            </div>

                        </div>
                        {basketItems.length > 0 ? (
                            <>
                                <div className={styles2.items}>
                                    {basketItems?.map((item, key) => (
                                        <BasketItem data={item} key={key} />
                                    ))}
                                </div>
                                <div className={styles2.basketTotal}>
                                    <div className={styles2.totalPrice}>
                                        <Title txt="Total HKD" size={17} transform="uppercase" />
                                        <div className={styles2.price}>
                                            <span>{"$" + _basketTotal.toFixed(2)}</span>
                                        </div>
                                    </div>


                                </div>
                            </>
                        ) : (
                            <div className={styles2.emptyBasket}>
                                <img src={emptyCardImg} alt="Empty Basket" />
                                <Title txt="Your basket is empty!" size={18} transform="uppercase" />
                                <small>Add items to the basket to proceed.</small>
                            </div>
                        )}
                    </div>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Shipping Address</h2>

                        <div className={styles.field}>
                            <label htmlFor="address" className={styles.label}>
                                Address:
                            </label>
                            <input type="text" id="address" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="city" className={styles.label}>
                                City:
                            </label>
                            <input type="text" id="city" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="zipCode" className={styles.label}>
                                Zip Code:
                            </label>
                            <input type="text" id="zipCode" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="country" className={styles.label}>
                                Country:
                            </label>
                            <input type="text" id="country" className={styles.input} />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Contact Information</h2>
                        <div className={styles.field}>
                            <label htmlFor="fullName" className={styles.label}>
                                Full Name:
                            </label>
                            <input type="text" id="fullName" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email" className={styles.label}>
                                Email:
                            </label>
                            <input type="email" id="email" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="phone" className={styles.label}>
                                Phone: (with contry code)
                            </label>
                            <input type="tel" id="phone" className={styles.input} />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Additional Details</h2>
                        <div className={styles.field}>
                            <label htmlFor="notes" className={styles.label}>
                                Notes:
                            </label>
                            <textarea id="notes" className={styles.textarea}></textarea>
                        </div>
                    </div>
                    <button className={styles.button}>Place Order</button>
                </div>
                <div>
                </div>
            </div>


            <ToastContainer />


        </div>
    );
};

export default Checkout;