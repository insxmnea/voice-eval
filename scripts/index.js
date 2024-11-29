const output = document.querySelector("#speech");
const recordButton = document.querySelector("#record");
const continuousCheckbox = document.querySelector("#continuous");
const interimCheckbox = document.querySelector("#interim");

const res = [];

const speechRec = new p5.SpeechRec("ru-RU", gotSpeech);
let continuous = false;
let interimResults = false;

let isRecording = false;

function setup() {
  noCanvas();
}

function gotSpeech() {
  if (speechRec.resultValue) {
    res.push(`#${res.length + 1}: ${speechRec.resultString}`);

    output.innerHTML = res.join("\n");

    output.scrollTop = output.scrollHeight;
  }

  stopRecording();
}

function startRecording() {
  speechRec.start(continuous, interimResults);
  isRecording = true;
  recordButton.classList.remove("not-recording");
  recordButton.classList.add("recording");
}

function stopRecording() {
  speechRec.stop();
  isRecording = false;
  recordButton.classList.remove("recording");
  recordButton.classList.add("not-recording");
}

recordButton.addEventListener("click", () => {
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
});

continuousCheckbox.addEventListener("change", () => {
  stopRecording();
  continuous = continuousCheckbox.checked;
});

interimCheckbox.addEventListener("change", () => {
  stopRecording();
  interimResults = interimCheckbox.checked;
});
