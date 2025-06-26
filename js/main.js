let selectedRoute = null;
let simonFailureCount = 0;

// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
  const game = document.getElementById('game');

  /**
   * Renders the route selection UI in the game container and sets up event listeners
   * for each route button. When a button is clicked, the corresponding route is passed
   * to the pickRoute function.
   *
   * @function
   * @returns {void}
   */
  function showRoutes() {3
    game.innerHTML = `
      <section class="mb-5" id="routes-section">
        <div class="row justify-content-center g-4">
          <div class="col-12 col-md-4">
            <button class="btn scifi-btn w-100 py-3" id="btn-logica">Logica pura</button>
          </div>
          <div class="col-12 col-md-4">
            <button class="btn scifi-btn w-100 py-3" id="btn-simulacion">Simulacion infinita</button>
          </div>
          <div class="col-12 col-md-4">
            <button class="btn scifi-btn w-100 py-3" id="btn-corrupto">Camino corrupto</button>
          </div>
        </div>
      </section>
      <section id="narrativa" class="fade-in">
        <p class="text-info">Elige una ruta para que CRUDY te envie un mensaje...</p>
      </section>
    `;

    document.getElementById('btn-logica').addEventListener('click', () => pickRoute('logic'));
    document.getElementById('btn-simulacion').addEventListener('click', () => pickRoute('sim'));
    document.getElementById('btn-corrupto').addEventListener('click', () => pickRoute('corrupt'));
  }

  /**
   * Handles the selection of a route in the game.
   * Updates the game UI with the narrative message for the selected route,
   * and after a delay, displays the available doors for the next step.
   *
   * @param {string} route - The identifier for the selected route.
   */
  function pickRoute(route) {
    selectedRoute = route;
    
    game.innerHTML = `
      <section id="narrativa" class="fade-in">
        <p>${crudymessages[route]}</p>
      </section>
    `;
    
    setTimeout(() => showDoors(route), 5000);
  }

  /**
   * Renders a set of interactive door buttons for a given route and attaches click event listeners to each.
   *
   * @param {string} route - The key representing the current route in the doorsData object.
   */
  function showDoors(route) {

    const doors = doorsData[route].doors;
    
    let doorsHtml = '<div class="row justify-content-center g-4">';
    
    doors.forEach(door => {
      doorsHtml += `
        <div class="col-12 col-md-4">
          <button class="btn scifi-btn w-100 py-3" data-door="${door.key}">${door.label}</button>
        </div>
      `;
    });
    
    doorsHtml += '</div>';

    game.innerHTML = `
      <section class="mb-5 fade-in">
        ${doorsHtml}
      </section>
    `;
    
    doors.forEach(door => {
      const btn = document.querySelector(`[data-door='${door.key}']`);
      if (btn) btn.addEventListener('click', () => showResult(route, door.key));
    });
  }

  /**
   * Displays the result of selecting a door in the game and triggers the next action after a delay.
   *
   * @param {string} route - The current route or path in the game, used to access the relevant doors data.
   * @param {string} doorKey - The unique key identifying the selected door.
   */
  function showResult(route, doorKey) {
    const door = doorsData[route].doors.find(d => d.key === doorKey);
    
    if (door) {
      game.innerHTML = `
        <section class="fade-in">
          <p>${door.result}</p>
        </section>
      `;
      
      setTimeout(() => simonSay(), 1800);
    }
  }

  showRoutes();
});

// ===== GAME 1: SIMON SAYS - Memory sequence challenge =====
/**
 * Initiates the Simon Says game sequence.
 * 
 * The function performs the following steps with timed delays:
 * 1. Waits 4 seconds before starting.
 * 2. Calls `circles()` to display the game circles.
 * 3. After 100ms, calls `colors()` to show the color sequence.
 * 4. Waits 4500ms (enough time for the color sequence to finish).
 * 5. Calls `validation()` to start the player's input phase.
 *
 * No parameters or return value.
 */
function simonSay() {
  setTimeout(() => {
    circles();

    setTimeout(() => {
        colors();

        // Wait for sequence to finish: 5 colors -> 4500 ms
        setTimeout(() => {
            validation(); // This is where the game actually starts
        }, 4500); 

    }, 100);

}, 4000);
}


/**
 * Animates a sequence of color changes on a set of elements with specific IDs.
 * Each element's color is changed from 'btn-primary' to 'btn-danger' and back,
 * with a staggered delay between each element.
 *
 * The IDs of the elements to animate are specified in the `color` array.
 * Each color change lasts for 500ms before reverting.
 *
 * No parameters.
 * No return value.
 */
function colors() {
    const color = ["circle0", "circle2", "circle4", "circle1", "circle3"];
    for (let index = 0; index < color.length; index++) {
        setTimeout(() => {
            document.getElementById(color[index]).classList.remove('btn-primary');
            document.getElementById(color[index]).classList.add('btn-danger');
        }, index * 1000);

        setTimeout(() => {
            document.getElementById(color[index]).classList.remove('btn-danger');
            document.getElementById(color[index]).classList.add('btn-primary');
        }, index * 1000 + 500);
    }
}

/**
 * Initializes the Simon Says game validation logic.
 * Sets up click event listeners on five circle elements, tracks the user's input sequence,
 * and compares it to the correct sequence. If the user matches the correct sequence,
 * triggers success feedback and advances to the next level; otherwise, triggers failure feedback.
 *
 * Dependencies:
 * - Assumes existence of elements with IDs 'circle0' to 'circle4'.
 * - Requires `circlesSuccess`, `circlesFail`, and `startFractalLevel` functions to be defined globally.
 */
function validation() {
    let correctSequence = [0, 2, 4, 1, 3];
    let simonSayArray = [];
    let counter = 0;

    function clickCircle(value) {
        simonSayArray.push(value);
        counter++;

        if (counter === 5) {
            if (JSON.stringify(correctSequence) === JSON.stringify(simonSayArray)) {
                circlesSuccess();
                setTimeout(() => startFractalLevel(), 1800);
            } else {
                circlesFail();
            }
        }
    }

    for (let i = 0; i <= 4; i++) {
        const circle = document.getElementById(`circle${i}`);
        circle.addEventListener('click', () => {
            clickCircle(i);
            circle.classList.add('btn-danger');
        });
    }
}

// ===== GAME 2: FRACTAL LOGIC - Boolean logic challenge =====
function startFractalLevel() {
  let fractalIndex = 0;
  
  let fractalFails = 0;
  
  showFractalQuestion();

  // FRACTAL LOGIC - Display current logic question
  /**
   * Displays the current fractal question and its answer options in the game UI.
   * If all questions have been answered, shows the end message and proceeds to the next quiz level after a delay.
   * Dynamically creates answer buttons and attaches event handlers for user interaction.
   * Also updates the failure counter display.
   *
   * Depends on the following external variables and functions:
   * - fractalIndex: number, current question index.
   * - fractalQuestions: array, list of question objects with 'question' and 'options'.
   * - fractalTexts: object, contains 'start' and 'end' text strings.
   * - startQuizLevel: function, called to proceed to the next level.
   * - checkFractalAnswer: function, called when an answer is selected.
   * - updateFails: function, updates the failure counter display.
   */
  function showFractalQuestion() {
    const game = document.getElementById('game');
    
    if (fractalIndex >= fractalQuestions.length) {
      game.innerHTML = `<section class='fade-in'><p>${fractalTexts.end}</p></section>`;
      
      setTimeout(startQuizLevel, 1800);
      return;
    }
    game.innerHTML = `
      <section class='fade-in'>
        <p>${fractalTexts.start}</p>
        <!-- Current question in bold -->
        <p class='fw-bold mt-3 mb-2'>${fractalQuestions[fractalIndex].question}</p>
        <!-- Container for answer options -->
        <div id='fractal-options'></div>
        <!-- Failure counter -->
        <p class='mt-3 text-danger' id='fractal-fails'></p>
      </section>
    `;
    
    const optionsDiv = document.getElementById('fractal-options');
    
    fractalQuestions[fractalIndex].options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-primary m-2';
      btn.textContent = opt;  // Option text
      
      btn.onclick = () => checkFractalAnswer(idx);
      
      optionsDiv.appendChild(btn);
    });
    
    updateFails();
  }


  /**
   * Checks if the selected answer index is correct for the current fractal question.
   * Updates the UI with feedback and manages game progression or failure state.
   *
   * @param {number} idx - The index of the selected answer.
   */
  function checkFractalAnswer(idx) {
    const game = document.getElementById('game');
    
    if (idx === fractalQuestions[fractalIndex].answer) {
      fractalIndex++;
      
      game.innerHTML = `<section class='fade-in'><p>${fractalTexts.success}</p></section>`;
      
      setTimeout(showFractalQuestion, 1200);
    } else {
      fractalFails++;
      
      if (fractalFails >= 3) {
        game.innerHTML = `<section class='fade-in'><p>${fractalTexts.gameover}</p></section>`;
      } else {
        game.innerHTML = `<section class='fade-in'><p>${fractalTexts.fail}</p></section>`;
        
        setTimeout(showFractalQuestion, 1200);
      }
    }
  }

  /**
   * Updates the displayed number of failed attempts for the fractal game.
   * Finds the HTML element with the ID 'fractal-fails' and sets its text content
   * to show the current number of attempts out of 3.
   *
   * Uses the `fractalFails` variable from the parent scope of startFractalLevel.
   */
  function updateFails() {
    const failsP = document.getElementById('fractal-fails');
    
    if (failsP) {
      failsP.textContent = `Intentos: ${fractalFails}/3`;
    }
  }
}

function startQuizLevel() {
  let quizIndex = 0;
  
  let score = 0;
  
  showQuizQuestion();

  // FINAL JUDGMENT - Display philosophical questions
  /**
   * Displays the current quiz question and its answer options in the game container.
   * If all questions have been answered, shows the final result instead.
   * Dynamically creates buttons for each answer option and attaches click handlers.
   *
   * Depends on the following global variables/functions:
   * - quizIndex: number, the current question index.
   * - quizQuestions: array, list of quiz question objects with 'question' and 'options'.
   * - quizTexts: object, contains text strings for the quiz UI.
   * - showFinalResult: function, displays the final quiz result.
   * - checkQuizAnswer: function, checks the selected answer.
   */
  function showQuizQuestion() {
    const game = document.getElementById('game');
    
    if (quizIndex >= quizQuestions.length) {
      showFinalResult();
      return;
    }
    game.innerHTML = `
      <section class='fade-in'>
        <p>${quizTexts.start}</p>
        <!-- Current question in bold -->
        <p class='fw-bold mt-3 mb-2'>${quizQuestions[quizIndex].question}</p>
        <!-- Container for answer options -->
        <div id='quiz-options'></div>
      </section>
    `;
    
    const optionsDiv = document.getElementById('quiz-options');
    
    quizQuestions[quizIndex].options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-light m-2';  // Different style (light)
      btn.textContent = opt;  // Option text
      
      btn.onclick = () => checkQuizAnswer(idx);
      
      optionsDiv.appendChild(btn);
    });
  }


  // FINAL JUDGMENT - Process answer and update score
  /**
   * Checks if the selected answer index is correct for the current quiz question.
   * Increments the score if the answer is correct, advances to the next question,
   * and displays the next quiz question.
   *
   * @param {number} idx - The index of the selected answer.
   */
  function checkQuizAnswer(idx) {
    if (idx === quizQuestions[quizIndex].answer) {
      score++;
    }
    
    quizIndex++;
    
    showQuizQuestion();
  }

  // FINAL JUDGMENT - Determine and display final destiny
  /**
   * Displays the final result of the quiz game based on the player's score.
   * Updates the game container with a final message and a "Play Again" button.
   * The final message is determined by the value of the global `score` variable:
   *   - If score >= 2: shows a positive message.
   *   - If score === 1: shows a neutral message.
   *   - Otherwise: shows a negative message.
   * The "Play Again" button reloads the page when clicked.
   *
   * Dependencies:
   * - Assumes existence of global variables: `score` and `quizTexts`.
   * - Expects an element with id 'game' in the DOM.
   */
  function showFinalResult() {
    const game = document.getElementById('game');
    
    let finalMessage = '';
    
    if (score >= 2) {
      finalMessage = quizTexts.final_good;
    } else if (score === 1) {
      finalMessage = quizTexts.final_neutral;
    } else {
      finalMessage = quizTexts.final_bad;
    }
    
    game.innerHTML = `
      <section class='fade-in'>
        ${finalMessage}
        <button class='btn btn-primary mt-4' id='btn-play-again'>${quizTexts.play_again}</button>
      </section>
    `;
    
    document.getElementById('btn-play-again').onclick = () => {
      window.location.reload();
    };
  }
} 