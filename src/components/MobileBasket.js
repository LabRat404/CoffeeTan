import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from 'styles/MobileBasket.module.scss';
import emptyCardImg from 'images/basket.png';
import BasketItem from 'components/BasketItem';
import { BasketContext } from 'context/BasketContext';
import GetIcon from 'components/GetIcon';
import Title from 'components/Title';
import MCheckout from "../pages/MCheckout";

const MobileBasket = () => {
  const { setBasketIsOpen, basketItems, setBasketItems, setBasketTotal, basketTotal: _basketTotal } = useContext(BasketContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('');

  const handleOrderSubmit = () => {
    
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setCurrentComponent('morder-submission');
    }, 1000);
  };

  return (
    <div className={styles.mobileBasket}>
      {currentComponent === '' ? (
        <>
          {basketItems.length > 0 ? (
            <>
              {basketItems.map((item, key) => (
                <BasketItem data={item} key={key} />
              ))}
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
                    <span>{"$" + 0}</span>
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className={styles.loadingIcon}>Loading...</div>
                  ) : (
                    'Confirm Cart'
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyBasket}>
              <img src={emptyCardImg} alt="" />
              <Title txt="Your basket is empty" size={23} transform="uppercase" />
            </div>
          )}
        </>
      ) : (
        <MCheckout />
      )}
    </div>
  );
};

export default MobileBasket;