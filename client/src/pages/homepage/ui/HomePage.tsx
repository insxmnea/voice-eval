import { FC, useEffect, useRef } from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AudioUploader } from "@/widgets/audio-uploader";

export const HomePage: FC = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const scrollToBottom = () => {
    // outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        continuous: true,
        language: "ru-RU",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.speechWrapper}>
        <div className={styles.speech}>
          {transcript || "Output"}
          <div ref={outputEndRef}></div>
        </div>
        <div className={styles.controls}>
          <button
            className={classNames(styles.buttonWithIcon, {
              [styles.recording]: listening,
            })}
            onClick={() => {
              toggleListening();
            }}
          ></button>

          <button onClick={resetTranscript}>Reset</button>
        </div>
      </div>

      <AudioUploader />
    </div>
  );
};
