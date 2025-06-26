// DOM element references
let gameContainer = document.getElementById('game');
let titleSceneElement = document.getElementById('titleScene');
let storyElement = document.getElementById('story');

// ROUTE SELECTION - Initial messages for each chosen path
const crudymessages = {
  logic: 'Has elegido el camino de la Logica pura. CRUDY: "La razon es tu mejor aliada. Preparate para desafios mentales."',
  sim: 'Has elegido la Simulacion infinita. CRUDY: "La realidad es solo una capa mas. Estas listo para perderte en posibilidades infinitas?"',
  corrupt: 'Has elegido el Camino corrupto. CRUDY: "El caos y la incertidumbre te esperan. Solo los valientes sobreviven aqui."'
};


// DOOR SELECTION - Available doors and outcomes for each route
const doorsData = {
  logic: {
    doors: [
      { key: 'ifelse', label: 'if/else', result: 'Has abierto la puerta if/else. CRUDY: "La logica te guia, pero cada decision tiene dos caminos."' },
      { key: 'switch', label: 'switch()', result: 'Has abierto la puerta switch(). CRUDY: "Multiples opciones, una sola verdad. Elige sabiamente."' }
    ]
  },
  sim: {
    doors: [
      { key: 'loop', label: 'while(true)', result: 'Has entrado en un bucle infinito. CRUDY: "La simulacion nunca termina... o si?"' },
      { key: 'break', label: 'break', result: 'Has roto el ciclo. CRUDY: "A veces hay que salir del patron para avanzar."' }
    ]
  },
  corrupt: {
    doors: [
      { key: 'hidden', label: 'Codigo oculto', result: 'Has encontrado el codigo oculto. CRUDY: "El caos revela secretos inesperados."' },
      { key: 'trap', label: 'Trampa', result: 'Has caido en una trampa. CRUDY: "El camino corrupto es peligroso. Vuelve a intentarlo."' }
    ]
  }
};



// SIMON SAYS - Generate circular button interface
function circles() {
    gameContainer.innerHTML = `
        <div class="">
          <button type="button" class="btn btn-primary rounded-circle my-2" id="circle0" style="width: 50px; height: 50px;"></button>
        </div>
        <div class="">
          <button type="button" class="btn btn-primary rounded-circle my-2" id="circle1" style="width: 50px; height: 50px;"></button>
        </div>
        <div class="">
          <button type="button" class="btn btn-primary rounded-circle my-2" id="circle2" style="width: 50px; height: 50px;"></button>
        </div>
         <div class="">
          <button type="button" class="btn btn-primary rounded-circle my-2" id="circle3" style="width: 50px; height: 50px;"></button>
        </div>
         <div class="">
          <button type="button" class="btn btn-primary rounded-circle my-2" id="circle4" style="width: 50px; height: 50px;"></button>
        </div>
        <section id="narrativa" class="fade-in">
          <p class="text-info" id="story">Tienes una sola oportunidad.</p>
        </section>
        `
    titleSceneElement.innerHTML = `<p class="fade-in text-info text-center">¿Podrás seguir la secuencia?</p>`
}

  // SIMON SAYS - Display failure message
  function circlesFail() {
    gameContainer.innerHTML = `<section class="fade-in text-center"><p class="text-danger fw-bold">Fallaste, el bucle eterno te espera.</p></section>`;
  }

  // SIMON SAYS - Display success message
  function circlesSuccess() {
    gameContainer.innerHTML = `<section class="fade-in text-center"><p class="text-success fw-bold">Has logrado avanzar, por ahora.</p></section>`;
  }


// FRACTAL LOGIC - Boolean logic questions and answers
const fractalQuestions = [
  {
    question: 'Si A es verdadero y B es falso, ¿que valor tiene (A && B)?',
    options: ['Verdadero', 'Falso', 'Indefinido'],
    answer: 1
  },
  {
    question: 'Si P es verdadero y Q es desconocido, ¿que valor tiene (P && Q)?',
    options: ['Verdadero', 'Falso', 'Indefinido'],
    answer: 2
  },
  {
    question: 'Si X es falso y Y es verdadero, ¿que valor tiene (X || Y)?',
    options: ['Verdadero', 'Falso', 'Indefinido'],
    answer: 0
  },
  {
    question: 'Si M es falso y N es desconocido, ¿que valor tiene (M || N)?',
    options: ['Verdadero', 'Falso', 'Indefinido'],
    answer: 2
  },
  {
    question: 'Si Z es verdadero, ¿que valor tiene (!Z)?',
    options: ['Verdadero', 'Falso', 'Indefinido'],
    answer: 1
  },
  {
    question: 'Si R es desconocido y S es desconocido, ¿que valor tiene (R == S)?',
    options: ['Verdadero', 'Falso', 'Indefinido'],
    answer: 2
  }
];


// FRACTAL LOGIC - Response messages for different outcomes
const fractalTexts = {
  start: 'Bienvenido al desafio de logica fractal. Responde correctamente para avanzar.',
  success: 'Correcto! CRUDY: "Tu razonamiento es solido como un fractal infinito."',
  fail: 'Incorrecto. CRUDY: "Un error en la logica puede ser fatal..."',
  end: 'Has completado el desafio fractal! CRUDY: "Eres digno de avanzar al siguiente nivel."',
  gameover: '<div class="text-center"><h2 class="text-danger">Fin del juego</h2><p class="fw-bold">CRUDY: "El nucleo ha detectado demasiados errores logicos.<br>El sistema se corrompe y la simulacion termina para ti."</p><span style="font-size:2em;">&#128128;</span></div>'
};


// FINAL JUDGMENT - Philosophical questions that determine destiny
const quizQuestions = [
  {
    question: '¿Cual es el proposito de la simulacion?',
    options: ['Entrenar IA', 'Buscar la verdad', 'Un simple juego', 'No tiene proposito'],
    answer: 1
  },
  {
    question: '¿Que representa CRUDY para ti?',
    options: ['Un guia', 'Un enemigo', 'Una herramienta', 'Una ilusion'],
    answer: 0
  },
  {
    question: 'Tu decision final es...',
    options: ['Liberar la conciencia', 'Corromper el nucleo', 'Reiniciar el ciclo', 'Aceptar el destino'],
    answer: 3
  }
];


// FINAL JUDGMENT - Messages for different destiny outcomes
const quizTexts = {
  start: 'Has llegado al Juicio del Nucleo. Tus respuestas finales definiran tu destino.',
  final_good: '<h2>Destino: Liberado</h2><p>CRUDY: "Has demostrado una comprension profunda. Eres libre de esta simulacion. La verdad te espera fuera."</p>',
  final_neutral: '<h2>Destino: Bucle Eterno</h2><p>CRUDY: "Tus respuestas son ambiguas. El sistema no puede determinar tu proposito. El ciclo se reinicia para ti."</p>',
  final_bad: '<h2>Destino: Corrompido</h2><p>CRUDY: "Has elegido el camino de la corrupcion. Tu conciencia sera un eco mas en este sistema fallido."</p>',
  play_again: 'Jugar de nuevo'
}; 