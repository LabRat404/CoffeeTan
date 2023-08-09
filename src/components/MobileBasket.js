import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from 'styles/MobileBasket.module.scss';
import emptyCardImg from 'images/basket.png';
import BasketItem from 'components/BasketItem';
import { BasketContext } from 'context/BasketContext';
import GetIcon from 'components/GetIcon';
import Title from 'components/Title';

const MobileBasket = () => {
  const navigate = useNavigate();
  const { setBasketIsOpen, basketItems, setBasketItems, setBasketTotal, basketTotal: _basketTotal } = useContext(BasketContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleOrderSubmit = () => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      total_price: _basketTotal.toFixed(2),
      basketItems: basketItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    };
    console.log("ASdasdsadsadas");
console.log(data);
    fetch('http://172.20.10.3:3001/api/OrderPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setBasketIsOpen(false);
          setBasketItems([]);
          setBasketTotal(0);
          toast('❤️ Order submitted successfully! Confirm email will be sent soon!', {
            autoClose: 10000,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          navigate('/');
        } else {
          throw new Error('Failed to submit order, please try again later');
        }
      })
      .catch((error) => {
        console.error('Error submitting order:', error);

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
    <div className={styles.mobileBasket}>
      {basketItems.length > 0 ? (
        <>

          {basketItems.map((item, key) => (
            <BasketItem data={item} key={key} />
          ))}
          <div className={styles.basketTotal}>
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
                <label style={{ fontSize: '0.7rem', marginBottom: '3px', marginTop: '3px' }}>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      padding: '5px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      fontSize: '0.7rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  />
                </label>
              </form>
              <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label style={{ fontSize: '0.7rem', marginBottom: '3px', marginTop: '3px' }}>
                Email:
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      padding: '5px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      fontSize: '0.7rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  />
                </label>
              </form>
              <form style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label style={{ fontSize: '0.7rem', marginBottom: '3px', marginTop: '3px' }}>
                country code+phone:
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      padding: '5px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      fontSize: '0.7rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  />
                </label>
              </form>

  
                </div>
            <small>Shipping outside Hong Kong may cost extra*</small>
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