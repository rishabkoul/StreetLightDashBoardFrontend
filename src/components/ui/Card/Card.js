import styles from "./Card.module.css";

const Card = ({ children, center_text }) => {
  return (
    <div className={styles.card}>
      <div
        className={
          center_text === "true" ? styles.containercenter : styles.container
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
