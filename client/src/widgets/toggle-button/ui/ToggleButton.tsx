import { FC } from "react";
import styles from "./ToggleButton.module.scss";

type Props = {
  text: string;
};

export const ToggleButton: FC<Props> = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <span>{text}</span>
      <label className={styles.switch}>
        <input type="checkbox" />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
