// Array
var questionArray = [{
    title: "What is a boolean?",
    choices: ["True false", "a css element", "integers", "a type of array"],
    answer: "True false"
}, {
    title: "How would you write an IF statement in JavaScript?",
    choices: ["if i = 5", "if i = 5 then", "if i == 5 then", "if (i == 5)"],
    answer: "if (i == 5)"
}, {
    title: " How do you write 'Hello World' in an alert box?",
    choices: [
        "msgBox('Hello World');",
        "alertBox('Hello World');",
        "msg('Hello World');",
        "alert('Hello World');"
    ],
    answer: "alert('Hello World');"
}, {
    title: "What's the syntax for a for loop",
    choices: [ "for (i = 0; i <= 5)", "for i = 1 to 5","for (i = 0; i <= 5; i++)", "for (i <= 5; i++)"],
    answer: "for (i = 0; i <= 5; i++)"
}, {
    title: "Which operator is used to assign a value to a variable?",
    choices: ["=", "-", "*", "X"],
    answer: "="
}];

// variables of DOM elements
var questions = document.getElementById("questions");
var timer = document.getElementById("timer");
var choicesHTML = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var gameOverText = document.getElementById("game-over-screen");

var questionNumber = 0;
var time = 60;
var timerId; 

// Buttons
startBtn.onclick = quizStart;

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;
initialsEl.onkeyup = checkForEnter;

  // Start Quiz
function quizStart() {
    // hide start screen
    var startScreen = document.getElementById("start-page");
    startScreen.setAttribute("style", "display:none");
  
    // un-hide questions section
    questions.removeAttribute("class");
  
    // start timer
    timerId = setInterval(tick, 1000);
  
    // show starting time
    timer.textContent = time;
  
    getQuestion();
}

function getQuestion() {
    // show question
    var title = document.getElementById("question-title");
    title.textContent = questionArray[questionNumber].title;
  
    choicesHTML.innerHTML = "";
  

    // loop over choices
    questionArray[questionNumber].choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
     
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = choice;
  
      // attach click event listener to each choice
      choiceNode.onclick = questionClick;
  
      // display on the page
      choicesHTML.appendChild(choiceNode);
    });
}
  
  function questionClick() {
    // check choice
    if (this.value !== questionArray[questionNumber].answer) {
      // penalize time
      time -= 12;
  
      if (time < 0) {
        time = 0;
      }
  
      // update time
      timer.textContent = "Score: " + time;
    }
  

  
//    next question
    questionNumber++;
  
    // Stops test when questions are done
    if (questionNumber === questionArray.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}
  
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    gameOverText.style.display = "block";   

    // Remove
    questions.style.display = "none";

    // show final score
    var finalScore = document.getElementById("score-text");
    var div = document.createElement("p").textContent = "Your score is " + time + ".";
    // finalScore.value = time;
    finalScore.append(div);

  }
// Minor  embedded Logic functions
// TICKING FUNCTION
function tick() {
    // update time
    time--;
    timer.textContent = "Score: " + time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
}
  
function saveHighscore() {

    // get highscore
    var newHighScore = {
        score: time,
        initials: initialsEl.value.trim()
    }

    var highScoreArray = JSON.parse(localStorage.getItem("highScores") || "[]")

    highScoreArray.push(newHighScore)
    localStorage.setItem("highScores", JSON.stringify(highScoreArray));

    window.location.href = "highscores.html";
  

}
  

  
