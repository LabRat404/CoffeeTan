import styles from "styles/Footer.module.scss";
import GetIcon from "components/GetIcon";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='me-5 d-none d-lg-block'></div>
      <p>
        <GetIcon icon="BsInstagram" size={22} color="#da0037" /> <a href="https://instagram.com/tantan091.jpg?igshid=OGQ5ZDc2ODk2ZA==">Instagram</a>
      </p>
      <p>
        <GetIcon icon="BsTelephone" size={22} color="#da0037" /> Tan +852 55793330
      </p>
    </footer>

  );
};

export default Footer;
