import styles from "styles/ViewProducts.module.scss";
import Card from "components/Card";
import Title from "components/Title";
import useMakeRequest from "hooks/useMakeRequest";
import json from "/Users/tangjaii/Downloads/CoffeeTan/src/datas/products.JSON"
import loadings from 'images/coffee_load.gif';
const ViewProducts = () => {
  var result = useMakeRequest("http://172.20.10.3:3001/api/getProducts");

  if (!result.data) {
    if (result.error) {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <Title txt={result.error} size={25} transform="uppercase" />
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <img src={loadings} alt="Loading..." style={{ width: "1200px", height: "900px" }} />
        </div>
      );
    }
  } else {
    return (
      <section className={styles.home}>
        <div className={styles.container}>
          <div className={styles.row}>
            {result.data && (
              <div className={styles.title}>
                <Title txt="all products" color="#171717" size={22} transform="uppercase" />
              </div>
            )}
          </div>
          <div className={styles.row}>
            {result.data ? (
              result.data.map((product, key) => <Card product={product} key={key} />)
            ) : (
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Title txt={result.error} size={25} transform="uppercase" />
              </div>
            )}
          </div>
        </div>
      </section> 
    );
  }
};

export default ViewProducts;
