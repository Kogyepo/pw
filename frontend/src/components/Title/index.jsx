
import classNames from "classnames";
import styles from "./styles.module.scss";

const Title = ({ text, isSecondary = false }) => {
  return (
    <h1
      className={classNames(styles.text, {
        [styles.secondary]: isSecondary,
      })}
    >
      {text}
    </h1>
  );
};

export default Title;
