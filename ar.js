const glassModal = document.querySelector(".quizConatiner");
const next = document.querySelector(".next");
const finish = document.querySelector(".finish");
const circleParent = document.querySelector(".circle_parent");
const question_title = document.querySelector(".question");
const scoreResult = document.querySelector(".score");
const applause = new Audio("./assets/sounds/applause.wav");
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
function showDialog(imageSrc, textContent) {
    document.getElementById("dialogImage").src = imageSrc;
    document.getElementById("dialogText").innerText = textContent;
    document.getElementById("dialogBox").style.display = "block";
}

function closeDialog() {
    document.getElementById("dialogBox").style.display = "none";
}

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

questions.forEach(() => {
    circleParent
      .appendChild(document.createElement("div"))
      .classList.add("circle_status");
  });
  const circle = document.querySelectorAll(".circle_status");
  
  loadQuestion();

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
      defaultsTwo = { startVelocity: 20, spread: 180, ticks: 10, zIndex: 9999 };
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
          zIndex: 9999
        })
      );
    }, 250);
  };