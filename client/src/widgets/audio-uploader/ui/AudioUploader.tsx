import axios from "axios";
import { FC, useState } from "react";
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

  const handleFileChange = (event: any) => {
    setShowEvaluation(false);

    setFile(event.target.files[0]);
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
      <span>Audio Transcription</span>
      <div>
        <input
          className={styles.input}
          type="file"
          accept=".mp3"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Transcribe</button>
        {processing && <p>Processing...</p>}

        {transcription && (
          <div>
            <span>Transcription:</span>
            <p>{transcription}</p>
          </div>
        )}
      </div>

      <div className={styles.wrapper}>
        <textarea
          className={styles.input}
          cols={60}
          rows={10}
          placeholder="Expected text"
          onChange={(e) => setExpectedText(e.target.value)}
        ></textarea>
        <button onClick={onEvaluate}>Evaluate</button>

        {showEvaluation && (
          <div>
            <span>BLEU:</span>
            <p>{bleu}</p>
            <span>WER:</span>
            <p>{wer}</p>
          </div>
        )}
      </div>
    </div>
  );
};
