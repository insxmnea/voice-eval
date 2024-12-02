import { FC, useState } from "react";
import styles from "./HomePage.module.scss";
import { ToggleButton } from "@/widgets/toggle-button";
import classNames from "classnames";

export const HomePage: FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.speech}>Output</div>
      <div className={styles.controls}>
        <input type="file" id="audioUpload" multiple accept="audio/*" />
        <button id="processAudio">Process</button>
        <div id="results"></div>

        <button
          className={classNames(styles.buttonWithIcon, {
            [styles.recording]: isRecording,
          })}
        ></button>

        <div className={styles.settings}>
          <ToggleButton text="Real time transcription" />
          <ToggleButton text="Wait for user input" />
        </div>
      </div>
    </div>
  );
};
