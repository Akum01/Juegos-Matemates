window.onload = function () {
  const preguntas = [
    { pregunta: "El número π es un número racional.", respuesta: false },
    { pregunta: "La gravedad es una fuerza que actúa a distancia.", respuesta: true },
    { pregunta: "La moda es el promedio de un conjunto de datos.", respuesta: false },
    { pregunta: "El agua tiene la fórmula química H₂O.", respuesta: true },
    { pregunta: "La velocidad se calcula como distancia dividida por tiempo.", respuesta: true },
    { pregunta: "La desviación estándar mide la dispersión de los datos.", respuesta: true },
    { pregunta: "Un electrón tiene carga positiva.", respuesta: false },
    { pregunta: "La energía cinética depende de la masa y la velocidad.", respuesta: true },
    { pregunta: "La media siempre es igual a la mediana.", respuesta: false },
    { pregunta: "La ley de la inercia fue propuesta por Newton.", respuesta: true }
  ];

  let actual = 0;
  let puntaje = 0;

  const questionDiv = document.getElementById('question');
  const resultDiv = document.getElementById('result');
  const restartBtn = document.getElementById('restart');
  const volverBtn = document.getElementById('volver');
  const progressFill = document.getElementById('progress-fill');
  const btnVerdadero = document.getElementById('verdadero');
  const btnFalso = document.getElementById('falso');

  function mostrarPregunta() {
    resultDiv.innerHTML = '';
    const pregunta = preguntas[actual];
    questionDiv.textContent = pregunta.pregunta;

    btnVerdadero.disabled = false;
    btnFalso.disabled = false;
    btnVerdadero.className = '';
    btnFalso.className = '';
  }

  function verificar(respuestaUsuario) {
    const correcta = preguntas[actual].respuesta;
    const esCorrecta = respuestaUsuario === correcta;

    if (esCorrecta) {
      puntaje++;
    }

    btnVerdadero.disabled = true;
    btnFalso.disabled = true;

    if (correcta) {
      btnVerdadero.classList.add('correct');
      btnFalso.classList.add('incorrect');
    } else {
      btnFalso.classList.add('correct');
      btnVerdadero.classList.add('incorrect');
    }

    setTimeout(() => {
      actual++;
      if (actual < preguntas.length) {
        mostrarPregunta();
      } else {
        mostrarResultado();
      }
    }, 1000);

    actualizarProgreso();
  }

  function mostrarResultado() {
    questionDiv.innerHTML = '';
    resultDiv.innerHTML = `¡Has terminado! Tu puntaje es ${puntaje} de ${preguntas.length}.`;
    restartBtn.style.display = 'block';
    volverBtn.style.display = 'block';
    progressFill.style.width = '100%';
  }

  function actualizarProgreso() {
    const progreso = (actual / preguntas.length) * 100;
    progressFill.style.width = `${progreso}%`;
  }

  restartBtn.onclick = () => {
    actual = 0;
    puntaje = 0;
    restartBtn.style.display = 'none';
    volverBtn.style.display = 'none';
    mostrarPregunta();
  };

  btnVerdadero.onclick = () => verificar(true);
  btnFalso.onclick = () => verificar(false);

  mostrarPregunta();
};








