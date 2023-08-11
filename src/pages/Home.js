import styles from "styles/Home.module.scss";
import React, { useRef } from "react";
import Card from "components/Card";
import { Link } from "react-router-dom";
import Title from "components/Title";
import useMakeRequest from "hooks/useMakeRequest";
import json from "/Users/tangjaii/Downloads/CoffeeTan/src/datas/products.JSON"
import beansImage from 'images/coffeee.jpg';
import powderImage from 'images/brew.jpg';
import heroImage from 'images/coffee_he.jpeg';
import loadings from 'images/coffee_load.gif';
const Home = () => {

  var result = useMakeRequest("http://127.0.0.1:3001");
  console.log(result);
  const json = 
  {
    "data": [
        "Grounded Coffee",
        "Coffee Beans",
    ],
    "error": null
}
result = eval(json);

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
     <img src={loadings} alt="Loading..." style={{ width: "900px", height: "900px" }} />
        </div>
      );
    }
  } else {
    return (
      <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.hero}>
        
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <h1 className={styles.title}>Experience the Rich Flavor of Vietnam Coffee</h1>
            <p className={styles.subtitle}>Discover the unique taste of Vietnam coffee beans and powder.</p>
            <button className={styles.button} >       <Link to="/viewProducts"  className={styles.a}>
            Shop Now
              </Link></button>
          </div>
        </div>
      </header>
      <section className={styles.intro}>
        <div className={styles.backgroundImage}></div>
        <h2 className={styles.heading}>Introduction</h2>
        <p className={styles.text}>Vietnam is one of the world's top coffee producers, known for its high-quality coffee beans and powder. With a rich history of coffee cultivation and a unique climate, Vietnam produces coffee with a distinct flavor profile that is popular among coffee lovers around the globe.</p>
      </section>
      <section className={styles.beans}>
        <div className={styles.backgroundImage}></div>
        <h2 className={styles.heading}>Vietnam Coffee Beans</h2>
        <div className={styles.row}>
          <div className={styles.column}>
            <img src={beansImage} alt="Vietnam coffee beans" className={styles.image} />
          </div>
          <div className={styles.column}>
            <p className={styles.text}>Vietnam coffee beans are grown in the highlands of the Central Highlands region, where the cool climate and rich soil create ideal growing conditions. Our beans are carefully selected and roasted to bring out their unique flavor profile, which is characterized by notes of chocolate, nuts, and spices.</p>
            <p className={styles.text}>To brew fresh coffee with Vietnam coffee beans, grind the beans to a medium-fine consistency and use a French press or drip coffee maker. For a stronger flavor, use a higher ratio of coffee to water. Add hot water and let steep for 4-5 minutes. Enjoy!</p>
          </div>
        </div>
      </section>
      <section className={styles.brewing}>
        <div className={styles.backgroundImage}></div>
        <h2 className={styles.heading}>Vietnam Coffee Powder</h2>
        <div className={styles.row}>
          <div className={styles.column}>
            <p className={styles.text}>Our Vietnam coffee powder is made from the finest Arabica and Robusta beans, grown and roasted in the Central Highlands region. The powder has a rich, full-bodied flavor with notes of chocolate and caramel, making it the perfect choice for espresso and other coffee drinks.</p>
            <p className={styles.text}>To brew fresh coffee with Vietnam coffee powder, use an espresso machine or stovetop espresso maker. For a milder flavor, use a lower ratio of coffee to water. Add hot water and enjoy!</p>
          </div>
          <div className={styles.column}>
            <img src={powderImage} alt="Vietnam coffee powder" className={styles.image} />
          </div>
        </div>
      </section>
      <section className={styles.conclusion}>
        <div className={styles.backgroundImage}></div>
        <h2 className={styles.heading}>Experience the Rich Flavor of Vietnam Coffee</h2>
        <p className={styles.text}>Whether you prefer whole beans or coffee powder, our Vietnam coffee products are sure to delight your taste buds. Shop now and experience the unique flavors of Vietnam coffee.</p>
        <button className={styles.button}><Link to="/viewProducts"  className={styles.a}>
            Shop Now
              </Link></button>
      </section>
      <section className={styles.intro} >
          <div className={styles.backgroundImage}></div>
          <h2 className={styles.heading}>About Us</h2>
          <p className={styles.text}> At OurCompany, we take pride in providing the finest quality coffee products to coffee enthusiasts worldwide. With a passion for sourcing the best coffee beans and powder, we offer a diverse range of flavors and varieties to suit every palate. Our commitment to excellence extends from the cultivation and roasting process to the packaging and delivery of our products. Whether you're a connoisseur or a casual coffee lover, we strive to deliver an exceptional coffee experience that awakens your senses. Join us on this flavorful journey and discover the richness and uniqueness of Vietnam coffee.</p>
        </section>
    </div>
    );
  }
};

export default Home;
