import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from 'styles/CheckOrder.module.scss';
import Title from '../components/Title';
import BasketSidebar from '../components/BasketSidebar';
import { BasketContext } from '../context/BasketContext';
import loadings from 'images/coffee_load.gif';
const CheckOrder = () => {
  const [order, setOrder] = useState(null);
  const { email, orderid } = useParams();
  console.log("ASdsadasdsadad");
  console.log(orderid);

useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://172.20.10.3:3001/api/OrderCheck/${email}/${orderid}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

  const getStatusStyle = (status) => {
    let color;
    let backgroundColor;

    switch (status) {
      case 'In-Progress':
        color = 'white';
        backgroundColor = 'blue';
        break;
      case 'Req-Cancelled':
        color = 'yellow';
        backgroundColor = 'black';
        break;
      case 'Cancelled':
        color = 'white';
        backgroundColor = 'red';
        break;
      case 'Delivered':
        color = 'white';
        backgroundColor = 'green';
        break;
      default:
        color = 'black';
        backgroundColor = 'transparent';
    }

    return {
      color,
      backgroundColor
    };
  };

  const getProductLink = (productId) => {
    return `http://172.20.10.3:3000/product/${productId}`;
  };

  return (
    <div className={styles.checkoutContainer}>
      <Title title="Check Order" />
      <div className={styles.checkoutContent}>
        <div className={styles.orderDetails}>
          {order ? (
            <div>
              <h2>Order Details</h2>
              <p>Order ID: {order.orderId}</p>
              <p>
                Status:{' '}
                <span style={getStatusStyle(order.status)}>{order.status}</span>
              </p>
              <h3>Items:</h3>
              <div className={styles.cardContainer}>
                {order.basketItems.map((item) => (
                  <div className={styles.card} key={item._id}>
                    <Link to={getProductLink(item.id)}>
                      <img
                        src={`http://172.20.10.3:3001/api/productimageget/${item.id}`}
                        alt={item.title}
                        className={styles.productImage}
                      />
                    </Link>
                    <div className={styles.cardDetails}>
                      <h4>
                        <Link to={getProductLink(item.id)}>{item.title}</Link>
                      </h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.price}</p>
                    </div>
                  </div>
                ))}
                 
              </div>
              <p>Total Price: {order.total_price}</p>
              <h3>Shipping Details:</h3>
              <p>Name: {order.name}</p>
              <p>Email: {order.email}</p>
              <p>Address: {order.address}</p>
              <p>City: {order.city}</p>
              <p>Country: {order.country}</p>
              <p>Phone: {order.phone}</p>
              <p>Notes: {order.notes}</p>
           
            </div>
          ) : (
            
              <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <img src={loadings} alt="Loading..." style={{ width: "1200px", height: "900px" }} />
              </div>
            
          )}
        </div>
        <BasketSidebar />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CheckOrder;