import styles from "styles/BasketItem.module.scss";
import Title from "components/Title";
import GetIcon from "components/GetIcon";
import Quantity from "components/Quantity";
import { BasketContext } from "context/BasketContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

import slugify from "slugify";


const BasketItem = ({ data }) => {
  const { basketItems, setBasketItems, setBasketTotal,setBasketIsOpen } = useContext(BasketContext);

  const removeItemFromBasket = () => {
    let arr = [...basketItems],
      removed = arr[arr.indexOf(data)].price * arr[arr.indexOf(data)].quantity;
    arr.splice(arr.indexOf(data), 1);
    setBasketItems(arr);
    setBasketTotal((total) => {
      return total - removed;
    });
  };

  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <img src={data.image[0]} alt="" />
      </div>
      <div className={styles.detail}>
        <div className={styles.title}>

          <Link to={`/product/${slugify(data.title, { lower: true, strict: true })}-${data.id}`} className={styles.title} onClick={() => setBasketIsOpen(false)}>
          {data.title}
          
          </Link>
        </div>
        <div className={styles.priceContainer}>
          <small className={styles.singlePrice}>{data.price.toFixed(2)}</small>
          <small className={styles.quantityN}>{data.quantity}</small>
          <small className={styles.totalPrice}> {`${(data.price * data.quantity).toFixed(2)}`} HKD</small>
        </div>
        <Quantity data={data} />
      </div>
      <div className={styles.removeItem}>
        <button type="button" onClick={removeItemFromBasket}>
          <GetIcon icon="BsDash" size={17} />
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
