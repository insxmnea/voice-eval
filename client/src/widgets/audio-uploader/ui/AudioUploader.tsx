import axios from "axios";
import { FC, useState } from "react";

export const AudioUploader: FC = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (event: any) => {
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

  return (
    <div>
      <h1>Audio Transcription</h1>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Transcribe</button>
      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};
