import styles from "styles/MobileCategories.module.scss";
import CategoryItem from "components/CategoryItem";
import useMakeRequest from "hooks/useMakeRequest";

const MobileCategories = ({ setNavIsOpen }) => {

  const result = useMakeRequest(`http://172.20.10.3:3001/api/getCategory`);

  return (
    <div className={styles.mobileCategories}>
      <ul className={styles.mobileCategoriesMenu}>
        {result.data ? result.data.map((cat, index) => <CategoryItem data={cat} key={index} setNavIsOpen={setNavIsOpen} />) : <div>{result.error}</div>}
      </ul>
    </div>
  );
};

export default MobileCategories;
