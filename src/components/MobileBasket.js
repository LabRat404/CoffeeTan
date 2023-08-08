import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "styles/MobileBasket.module.scss";
import emptyCardImg from "images/basket.png";
import BasketItem from "components/BasketItem";
import { BasketContext } from "context/BasketContext";
import { useContext } from "react";
import GetIcon from "components/GetIcon";
import Title from "components/Title";

const MobileBasket = () => {
  const navigate = useNavigate();
  const { basketItems, setBasketItems, basketTotal: _basketTotal } = useContext(BasketContext);

  const handleOrderSubmit = () => {
    // Perform order submission logic here
    // ...

    // Show success message
    toast.success("Order submitted successfully!");

    // Clear the basket
    setBasketItems([]);

    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className={styles.mobileBasket}>
      {basketItems.length > 0 ? (
        <>
          {basketItems.map((item, key) => (
            <BasketItem data={item} key={key} />
          ))}
          <div className={styles.basketTotal}>
            <div className={styles.total}>
              <Title txt="basket summary" size={18} transform="uppercase" />
              <GetIcon icon="BsFillCartCheckFill" size={20} />
            </div>
            <div className={styles.totalPrice}>
              <small>total</small>
              <div className={styles.price}>
                <span>{_basketTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className={styles.total}>
              <Title txt="Contact Info" size={18} transform="uppercase" />
              <GetIcon icon="BsPersonVcard" size={20} />
            </div>
            <div style={{ display: 'flex' }}>
              <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label style={{ fontSize: '0.7rem', marginBottom: '3px' }}>
                  Name:
                  <input type="text" name="name" style={{  padding: '5px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.7rem', textAlign: 'left', width: '100%' }} />
                </label>
              </form>
              <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label style={{ fontSize: '0.7rem', marginBottom: '3px' }}>
                  Email:
                  <input type="text" name="name" style={{  padding: '5px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.7rem', textAlign: 'left', width: '100%' }} />
                </label>
              </form>
              <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label style={{ fontSize: '0.7rem', marginBottom: '3px' }}>
                  Phone num:
                  <input type="text" name="name" style={{  padding: '5px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.7rem', textAlign: 'left', width: '100%' }} />
                </label>
              </form>
            </div>
            <button type="button" className={styles.confirmBtn} onClick={handleOrderSubmit}>
              Confirm & Submit Order
            </button>
          </div>
        </>
      ) : (
        <div className={styles.emptyBasket}>
          <img src={emptyCardImg} alt="" />
          <Title txt="your basket is empty" size={23} transform="uppercase" />
        </div>
      )}
    </div>
  );
};

export default MobileBasket;