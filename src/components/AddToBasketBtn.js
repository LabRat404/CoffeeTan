import { toast } from 'react-toastify';
import styles from "styles/AddToBasketBtn.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import { BasketContext } from "context/BasketContext";
import { useContext } from "react";
import GetIcon from "components/GetIcon";

const AddToBasketBtn = ({ data: product }) => {
  const { basketItems, setBasketItems, setBasketTotal, currentQuantity } = useContext(BasketContext);

  const addToBasket = (product) => {
    let arr = [...basketItems];
    let filtered = basketItems.filter((item) => item.id === product.id);
    if (filtered.length > 0) {
      filtered[0].quantity += 1;
      arr[arr.indexOf(filtered[0])] = filtered[0];
      setBasketItems(arr);
    } else {
      setBasketItems((oldState) => [
        ...oldState,
        {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: currentQuantity,
        },
      ]);
    }

    setBasketTotal((oldTotal) => (oldTotal += product.price * (currentQuantity || 1)));

    // Show success message

    toast.success(` ${product.title} added to basket! 🛒 `, {
      autoClose: 1600,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <button
      className={styles.addToBasket}
      onClick={(e) => {
        e.preventDefault();
        addToBasket(product);
      }}
    >
      <GetIcon icon="BsFillCartPlusFill" size={18} /> add to basket
    </button>
  );
};

export default AddToBasketBtn;