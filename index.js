const modal = document.getElementById("exampleModalLabel");

setTimeout(() => {
  document.getElementById("splashScreen").style.display = "none";
}, 2300);

function openModel(event) {
  modal.innerHTML = event;
}

const keys = document.querySelectorAll(".key");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playNote(note) {
  const oscillator = audioContext.createOscillator();

  const gainNode = audioContext.createGain();

  const frequencies = {
    C: 261.63,
    "C#": 277.18,
    D: 293.66,
    "D#": 311.13,
    E: 329.63,

    F: 349.23,
    "F#": 369.99,
    G: 392.0,
    "G#": 415.3,
    A: 440.0,

    "A#": 466.16,
    B: 493.88,
  };

  oscillator.frequency.value = frequencies[note];

  oscillator.type = "sine";

  oscillator.connect(gainNode);

  gainNode.connect(audioContext.destination);

  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

  oscillator.start();

  setTimeout(() => oscillator.stop(), 500);
}

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key.dataset.note));
});
