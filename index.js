const modal = document.querySelector("#exampleModalLabel");
const PIANO = document.querySelector(".piano");
const DRUMS = document.querySelector(".drums");
const SITAR = document.querySelector(".sitar");
const keys = document.querySelectorAll(".key");
const glassModal = document.querySelector(".glass_modal");
const next = document.querySelector(".next");
const finish = document.querySelector(".finish");
const circleParent = document.querySelector(".circle_parent");
const question_title = document.querySelector(".question");
const scoreResult = document.querySelector(".score");
const applause = new Audio("./assets/sounds/applause.wav");
const loaderMp3 = new Audio("./assets/sounds/loader.mp3");
let currentQuestion = 0;
let score = 0;
let questions = [
  {
    question: "Who is known as the 'Father of the Sitar'?",
    options: ["Ravi Shankar", "Anoushka Shankar", "Vilayat Khan"],
    answer: "Ravi Shankar",
  },
  {
    question:
      "Which of these materials is traditionally used to make the sitar's body?",
    options: ["Wood", "Metal", "Plastic"],
    answer: "Wood",
  },
  {
    question: "In which country did the sitar originate?",
    options: ["India", "Pakistan", "Afghanistan"],
    answer: "India",
  },
  {
    question: "What is the main string of a sitar called?",
    options: ["Gandhar", "Chikari", "Badhani"],
    answer: "Chikari",
  },
  {
    question:
      "Which Indian classical music tradition is the sitar most commonly associated with?",
    options: ["Hindustani", "Carnatic", "Dhrupad"],
    answer: "Hindustani",
  },
  {
    question: "Which famous sitar player performed at Woodstock in 1969?",
    options: ["Anoushka Shankar", "Ravi Shankar", "Ustad Vilayat Khan"],
    answer: "Ravi Shankar",
  },
  {
    question: "How many strings does a typical sitar have?",
    options: ["6-7", "8-9", "4-5"],
    answer: "6-7",
  },
  {
    question:
      "What is the name of the tuning pegs on a sitar that are used for fine-tuning?",
    options: ["Tumbi", "Mukhra", "Taraf"],
    answer: "Taraf",
  },
  {
    question: "Which drum is played with a pedal in a drum kit?",
    options: ["Tom Drum", "Bass Drum", "Snare Drum"],
    answer: "Bass Drum",
  },
  {
    question: "What is the hi-hat in a drum set?",
    options: [
      "A type of drum",
      "A pair of cymbals played with a pedal",
      "A tuning mechanism",
    ],
    answer: "A pair of cymbals played with a pedal",
  },
  {
    question: "What type of instrument is a piano classified as?",
    options: ["String instrument", "Percussion instrument", "Wind instrument"],
    answer: "Percussion instrument",
  },
];

const count = 200,
  defaultsOne = {
    origin: { y: 0.7 },
  };

// const duration = 15 * 1000,
//   animationEnd = Date.now() + duration,
//   defaultsTwo = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };


function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaultsOne, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

function fireWorks(min, max) {
  return Math.random() * (max - min) + min;
}

setTimeout(() => {
  document.getElementById("splashScreen").style.display = "none";
}, 3500);

questions.forEach(() => {
  circleParent
    .appendChild(document.createElement("div"))
    .classList.add("circle_status");
});
const circle = document.querySelectorAll(".circle_status");

loadQuestion();

function openModel(event) {
  console.log(event,'dfghj')
  modal.textContent = event;
  switch (event) {
    case "Piano":
      console.log(event, "Piano");
      PIANO.style.display = "flex";
      DRUMS.style.display = "none";
      SITAR.style.display = "none";
      break;

    case "Drums":
      console.log(event, "Drums");
      DRUMS.style.display = "flex";
      PIANO.style.display = "none";
      SITAR.style.display = "none";
      break;

    case "Sitar":
      console.log(event, "Sitar");
      SITAR.style.display = "flex";
      PIANO.style.display = "none";
      DRUMS.style.display = "none";
      break;

    default:
      PIANO.style.display = "none";
      DRUMS.style.display = "none";
      SITAR.style.display = "none";
      break;
  }
}

const currentDevice = () => {
  let device = navigator.userAgent;
  if (device.includes("Android")) {
    return "Android";
  } else if (device.includes("iPhone")) {
    return "iPhone";
  } else {
    return "Desktop";
  }
};

// keys.forEach((key) => {
//   key.addEventListener("mousedown", () => {
//     if (currentDevice() === "Desktop") {
//       let note = key.getAttribute("data-note");
//       console.log(note);

//       let piano = new Audio(`./assets/sounds/piano/${note}.mp3`);
//       piano.currentTime = 0;
//       piano.play();
//     }
//     key.classList.contains("white")
//       ? key.classList.add("white_active")
//       : key.classList.add("black_active");
//   });

//   key.addEventListener("mouseup", () => {
//     key.classList.contains("white")
//       ? key.classList.remove("white_active")
//       : key.classList.remove("black_active");
//   });

//   key.addEventListener("touchstart", () => {
//     if (currentDevice() !== "Desktop") {
//       let note = key.getAttribute("data-note");
//       let piano = new Audio(`./assets/sounds/piano/${note}.mp3`);
//       piano.currentTime = 0;
//       piano.play();
//     }
//     key.classList.contains("white")
//       ? key.classList.add("white_active")
//       : key.classList.add("black_active");
//   });

//   key.addEventListener("touchend", () => {
//     key.classList.contains("white")
//       ? key.classList.remove("white_active")
//       : key.classList.remove("black_active");
//   });

// });
keys.forEach((key) => {
  let startTouchX = 0;
  let endTouchX = 0;
  let isTouching = false;
  let lastKeyTouched = null;
  let alreadyPlayedKeys = new Set();

  // Play sound when a key is pressed (Desktop and Mobile)
  function playSound(note) {
    let piano = new Audio(`./assets/sounds/piano/${note}.mp3`);
    piano.currentTime = 0;
    piano.play();
  }

  // Desktop mouse events
  key.addEventListener("mousedown", () => {
    if (currentDevice() === "Desktop") {
      let note = key.getAttribute("data-note");
      playSound(note);
    }
    key.classList.add(
      key.classList.contains("white") ? "white_active" : "black_active"
    );
  });

  key.addEventListener("mouseup", () => {
    key.classList.remove(
      key.classList.contains("white") ? "white_active" : "black_active"
    );
  });

  // Mobile touch events
  key.addEventListener("touchstart", (event) => {
    if (currentDevice() !== "Desktop") {
      let note = key.getAttribute("data-note");
      playSound(note);
    }
    key.classList.add(
      key.classList.contains("white") ? "white_active" : "black_active"
    );

    // Track starting position of the touch
    startTouchX = event.touches[0].clientX;
    isTouching = true; // mark as touch started
    lastKeyTouched = key; // Store the key that was first touched
    alreadyPlayedKeys.clear(); // Clear the played keys when touch starts
  });

  key.addEventListener("touchend", () => {
    key.classList.remove(
      key.classList.contains("white") ? "white_active" : "black_active"
    );
    isTouching = false; // mark touch as ended
  });

  // Detect swipe on mobile
  key.addEventListener("touchmove", (event) => {
    if (!isTouching) return;

    endTouchX = event.touches[0].clientX;
    if (Math.abs(endTouchX - startTouchX) > 50) {
      handleSwipe(event);

      keys.forEach((key) => {
        if (isKeyUnderTouch(event.touches[0].clientX, key)) {
          if (!alreadyPlayedKeys.has(key)) {
            let note = key.getAttribute("data-note");
            playSound(note);
            alreadyPlayedKeys.add(key);
          }
          key.classList.add(
            key.classList.contains("white") ? "white_active" : "black_active"
          );
        } else {
          key.classList.remove(
            key.classList.contains("white") ? "white_active" : "black_active"
          );
        }
      });
    }
  });

  // Helper function to check if the touch is over the current key
  function isKeyUnderTouch(touchX, key) {
    const keyRect = key.getBoundingClientRect();
    return touchX >= keyRect.left && touchX <= keyRect.right;
  }

  // Handle swipe direction logic (optional, for additional functionality)
  function handleSwipe(event) {
    if (endTouchX > startTouchX) {
      console.log("Swipe Right");
      // You can add your action here (e.g., play next note)
    } else {
      console.log("Swipe Left");
      // You can add your action here (e.g., play previous note)
    }

    // Reset swipe start and end positions after swipe action
    startTouchX = 0;
    endTouchX = 0;
  }
});

const playSound = (keys) => {
  console.log(keys,'dfghj')
  let drums = new Audio(`./assets/sounds/drums/${keys}D.mp3`);
  drums.currentTime = 0;
  drums.play();
};
const playSitar = (keys) => {
  let sitar = new Audio(`./assets/sounds/sitar/s${keys}.mp3`);
  sitar.currentTime = 0;
  sitar.play();
};

const openQuiz = () => {
  glassModal.style.display = "block";
  // loadQuestion();
};

function loadQuestion() {
  // const circle = document.querySelectorAll(".circle_status");

  circle.forEach((val) => {
    val.classList.remove("active_circle");
  });
  circle[currentQuestion].classList.add("active_circle");
  let question = questions[currentQuestion];
  question_title.innerHTML = question.question;
  const options = document.querySelectorAll(".option");

  question.options.forEach((option, index) => {
    options[index].textContent = option;
  });
}

const checkAnswer = (option) => {
  let question = questions[currentQuestion];
  // const circle = document.querySelectorAll(".circle_status");

  const optionsList = document.querySelectorAll(".option");
  if (question.options[option] === question.answer) {
    optionsList[option].classList.add("success");
    new Audio('./assets/sounds/bubble.mp3').play();
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
    score++;
    circle[currentQuestion].classList.add("success");
  } else {
    optionsList[option].classList.add("error");
    navigator.vibrate(200);
    circle[currentQuestion].classList.add("error");
    const correctOption = question.options.findIndex((val) => {
      return val === question.answer;
    });
    optionsList[correctOption].classList.add("success");
  }
  optionsList.forEach((val) => {
    val.setAttribute("disabled", true);
  });
  next.classList.add("enabled");
};

const nextQuestion = () => {
  next.classList.remove("enabled");
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    const optionsList = document.querySelectorAll(".option");
    optionsList.forEach((val) => {
      val.classList.remove("success", "error");
      val.removeAttribute("disabled");
    });
  } else {
    const modalBody = document.querySelector(".glass_modal_body");
    const imgElement = document.createElement("img");
    imgElement.setAttribute("width", 200);
    imgElement.setAttribute("height", 200);
    imgElement.classList.add("img-fluid", "mx-auto", "d-block", "smily-img");

    modalBody.appendChild(imgElement);

    // next.style.display = "block";
    finish.classList.add("enabled");
    circleParent.replaceChildren();
    if (score >= 1) {
      fireWorksAnimation();
      applause.play();
      modalBody.querySelector(".smily-img").src = "./assets/gifs/happy.gif";
    } else {
      modalBody.querySelector(".smily-img").src = "./assets/gifs/moodOff.gif";
    }
    question_title.textContent = `Surprise Surprise`;
    question_title.classList.add("result");
    scoreResult.textContent = `You scored ${score} out of ${questions.length}`;
    // document.querySelectorAll(".option").forEach((val) => {
    //   val.style.display = "none";
    // });
    document.querySelector("#options").style.display = "none";
    next.classList.remove("enabled");
  }
};

const finished = () => {
  location.reload();
};

const fireWorksAnimation = () => {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaultsTwo = { startVelocity: 20, spread: 180, ticks: 10, zIndex: 999 };
  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 60 * (timeLeft / duration);

    confetti(
      Object.assign({}, defaultsTwo, {
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        startVelocity: 45,
        spread: 180,
      })
    );
  }, 250);
};
// MS subba lakshmi code//
document.addEventListener("DOMContentLoaded", function () {
  function setupPlayer(modalId, audioPlayerId) {
      const modal = document.getElementById(modalId);
      const audioPlayer = document.getElementById(audioPlayerId);
      const playlist = modal.querySelector(".playlist");

      if (!playlist) return; // Exit if no playlist found

      let currentSongIndex = -1;

      // Handle playlist item click
      playlist.addEventListener("click", function (event) {
          const item = event.target.closest("li");
          if (!item) return;

          const playPauseBtn = item.querySelector(".playPauseBtn");

          if (playPauseBtn.contains(event.target)) {
              togglePlayPause(item);
          } else {
              playSong(Array.from(playlist.children).indexOf(item));
          }
      });

      // Toggle between play/pause for the selected song
      function togglePlayPause(item) {
          const index = Array.from(playlist.children).indexOf(item);

          if (currentSongIndex === index) {
              if (audioPlayer.paused) {
                  audioPlayer.play();
                  updateUIState(item, true);
              } else {
                  audioPlayer.pause();
                  updateUIState(item, false);
              }
          } else {
              playSong(index);
          }
      }

      // Play the selected song
      function playSong(index) {
          if (currentSongIndex !== -1) {
              updateUIState(playlist.children[currentSongIndex], false);
          }

          currentSongIndex = index;
          const selectedSong = playlist.children[index].getAttribute("data-src");

          if (audioPlayer.src !== selectedSong) {
              audioPlayer.src = selectedSong;
          }
          audioPlayer.play();
          updateUIState(playlist.children[index], true);
      }

      // Update UI state for play/pause button
      function updateUIState(item, isPlaying) {
          const button = item.querySelector(".playPauseBtn");
          button.textContent = isPlaying ? "⏸" : "▶";

          item.classList.toggle("playing", isPlaying);
      }

      // Play next song when the current song ends
      audioPlayer.addEventListener("ended", function () {
          if (currentSongIndex < playlist.children.length - 1) {
              playSong(currentSongIndex + 1);
          } else {
              // Reset UI when the last song finishes
              updateUIState(playlist.children[currentSongIndex], false);
              currentSongIndex = -1;
          }
      });

      // Stop audio and reset UI when modal is closed
      modal.addEventListener("hidden.bs.modal", function () {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;

          playlist.querySelectorAll(".playPauseBtn").forEach((btn) => {
              btn.textContent = "▶";
          });

          if (currentSongIndex !== -1) {
              playlist.children[currentSongIndex].classList.remove("playing");
          }
          currentSongIndex = -1;
      });
  }

  // Setup players for both modals
  setupPlayer("subbuModal", "ms-audio-player");
  setupPlayer("yesudasModal", "yesudas-audio-player");
});