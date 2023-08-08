import styles from "styles/Header.module.scss";
import { Link } from "react-router-dom";
import GetIcon from "components/GetIcon";
import clsx from "clsx";
import CategoryItem from "./CategoryItem";
import ViewProducts from "../pages/ViewProducts";
import useMakeRequest from "hooks/useMakeRequest";
import { BasketContext } from "context/BasketContext";
import { useContext } from "react";

const Header = () => {
  var result = useMakeRequest("http://172.20.10.3:3001/api/getCategory");
  const { basketItems, setBasketIsOpen } = useContext(BasketContext);

console.log(result);


  //console.log(result);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <h2>CoffeeTan</h2>
        </Link>
      </div>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <ul>
          
          {result.data &&
  result.data.map((category, index) => (
    <li key={index}>
      <Link to={`/category/${category}`} className={styles.a}>
        {category}
      </Link>
    </li>
  ))}

            <li>
              <Link to="/viewProducts"  className={styles.a}>
                All Products
              </Link>
              <ul className={styles.subMenu}>{result.data ? result.data.map((cat, index) => <CategoryItem data={cat} key={index} />) : <div>{result.error}</div>}</ul>
            </li>
            <li>
              <Link
                to="/"
                className={clsx(styles.basketBtn, styles.a)}
                onClick={(e) => {
                  e.preventDefault();
                  setBasketIsOpen((oldState) => !oldState);
                }}
              >
                <GetIcon icon="BsCart4" size={25} color="#ffffff" />
                {basketItems.length > 0 && <span className={styles.basketLength}> {basketItems.length} </span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
