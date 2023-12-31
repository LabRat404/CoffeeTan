import styles from "styles/MobileBottomNav.module.scss";
import GetIcon from "components/GetIcon";
import MobileCategories from "components/MobileCategories";
import { useState } from "react";
import MobileBasket from "components/MobileBasket";

import clsx from "clsx";
import { Link } from "react-router-dom";

const MobileBottomNav = () => {
  const [currentComponent, setCurrentComponent] = useState("");
  const [navIsOpen, setNavIsOpen] = useState(false);

  return (
    <div className={clsx(styles.bottomNav, navIsOpen ? styles.fullHeight : styles.removeHeight)}>
      <div className={styles.content}>
        {(() => {
          switch (currentComponent) {
            case "categories":
              return <MobileCategories setNavIsOpen={setNavIsOpen} />;
            case "basket":
              return <MobileBasket />;
            default:
              return <div></div>;
          }
        })()}
      </div>
      <div className={styles.navContainer}>
       

        <button
          className={styles.navItem}
          onClick={() => {
            setCurrentComponent("categories");
            setNavIsOpen((oldState) => !oldState);
          }}
        >
          <GetIcon icon="BsList" size={20} />
        </button>
       
        <Link
          to="/"
          className={styles.navItem}
          onClick={() => {
            setCurrentComponent("");
            setNavIsOpen(false);
          }}
        >
          <GetIcon icon="BsHouseFill" size={20} />
        </Link>
        
        <Link
          to="/mobile-basket"
          className={styles.navItem}
          onClick={() => {
            setCurrentComponent("basket");
            setNavIsOpen((oldState) => !oldState);
          }}
        >
          <GetIcon icon="BsCartFill" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;