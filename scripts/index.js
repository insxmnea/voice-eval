const output = document.querySelector("#speech");
const recordButton = document.querySelector("#record");
const res = [];

const speechRec = new p5.SpeechRec("ru-RU", gotSpeech);
let continuous = true;
let interimResults = false;

let isRecording = false;

function setup() {
  noCanvas();

  // speechRec.start(continuous, interimResults);
}

function gotSpeech() {
  console.log(speechRec);
  if (speechRec.resultValue) {
    let said = speechRec.resultString;

    res.push(said);

    output.innerHTML = res.join("<br>");
  }
}

recordButton.addEventListener("click", () => {
  if (isRecording) {
    speechRec.stop();
    isRecording = false;
    recordButton.classList.remove("recording");
    recordButton.classList.add("not-recording");
  } else {
    speechRec.start(continuous, interimResults);
    isRecording = true;
    recordButton.classList.remove("not-recording");
    recordButton.classList.add("recording");
  }
});
