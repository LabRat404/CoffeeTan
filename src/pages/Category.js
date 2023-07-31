import styles from "styles/Category.module.scss";
import Card from "components/Card";
import Title from "components/Title";
import useMakeRequest from "hooks/useMakeRequest";
import { useParams } from "react-router-dom";
import loadings from 'images/coffee_load.gif';
const Category = () => {
  const { slug } = useParams();
  var result = useMakeRequest(`https://fakestoreapi.com/products/category/${slug}`);

  const json = {
    "data": [
      {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://shoplineimg.com/58a2887559d52406350002fc/64394d921edb27001ad7297d/800x.webp?source_format=jpg",
        "rating": {
          "rate": 3.9,
          "count": 120
        }
      },
      {
        "id": 13,
        "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
        "price": 599,
        "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
        "rating": {
          "rate": 2.9,
          "count": 250
        }
      },
    ],
    "error": null
  }
  // console.log(eval(json).data)
  // console.log("asdasdas")
  // console.log(result.data)
  result = eval(json);

  if (!result.data) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <img src= {loadings} alt="Loading..." />
      </div>
    );
  } else {
    return (
      <section className={styles.category}>
        <div className={styles.container}>
          <div className={styles.row}>
            {result.data && (
              <div className={styles.title}>
                <Title txt={slug} color="#171717" size={22} transform="uppercase" />
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

export default Category;
