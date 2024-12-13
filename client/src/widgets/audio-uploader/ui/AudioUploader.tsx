import axios from "axios";
import { FC, useRef, useState } from "react";
import styles from "./AudioUploader.module.scss";
import { calculateBLEU, calculateWER } from "@/shared/lib/utils";

export const AudioUploader: FC = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [processing, setProcessing] = useState(false);
  const [expectedText, setExpectedText] = useState("");
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [wer, setWER] = useState("");
  const [bleu, setBLEU] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileChange = (event: any) => {
    setShowEvaluation(false);

    setFile(event.target.files[0]);

    const urlObj = URL.createObjectURL(event.target.files[0]);

    if (audioRef.current) audioRef.current.src = urlObj;
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setProcessing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTranscription(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    }

    setProcessing(false);
  };

  const onEvaluate = () => {
    setBLEU(calculateBLEU(expectedText, transcription));
    setWER(calculateWER(expectedText, transcription));

    setShowEvaluation(true);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Audio Transcription</span>
      <div className={styles.uploader}>
        <input
          className={styles.input}
          type="file"
          accept=".mp3"
          onChange={handleFileChange}
        />
        <audio ref={audioRef} controls></audio>
        <button onClick={handleUpload}>Transcribe</button>
      </div>

      <div>
        {processing && <p className={styles.processing}>Processing...</p>}

        {transcription && (
          <div className={styles.transcriptionWrapper}>
            <span>Transcription:</span>
            <p className={styles.transcription}>{transcription}</p>
          </div>
        )}
      </div>

      <div className={styles.evaluationWrapper}>
        <textarea
          className={styles.input}
          cols={60}
          rows={10}
          placeholder="Expected text"
          onChange={(e) => setExpectedText(e.target.value)}
        ></textarea>
        <button onClick={onEvaluate}>Evaluate</button>

        {showEvaluation && (
          <div className={styles.evaluation}>
            <span>
              BLEU (Bilingual Evaluation Understudy) – оценка качества перевода
              по сравнению с ожидаемым текстом: {bleu}
            </span>
            <span>
              WER (Word Error Rate) – частота ошибок на уровне слов: {wer}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
