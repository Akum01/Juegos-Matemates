window.onload = function () {
  const preguntas = [
    { pregunta: "¿Cuál es el valor de √49?", opciones: ["8", "7", "6", "5"], correcta: 1 },
    { pregunta: "¿Cuál es la fórmula de la velocidad en física clásica?", opciones: ["v = d/t", "v = 1/2mv²", "v = t/d", "v = m·a"], correcta: 0 },
    { pregunta: "¿Cuál es el número de Avogadro?", opciones: ["6.02×10²³", "1.67×10⁻²⁷", "9.81×10³", "3.14×10⁸"], correcta: 0 },
    { pregunta: "¿Cuál es la media de los números 4, 8, 6 y 2?", opciones: ["4", "7", "5", "6"], correcta: 2 },
    { pregunta: "¿Cuál es la fórmula química del agua?", opciones: ["CO₂", "CH₄", "H₂O", "O₂"], correcta: 2 },
    { pregunta: "¿Qué representa la letra g en física?", opciones: ["Gramos", "Ganancia", "Gravedad", "Gas"], correcta: 2 },
    { pregunta: "¿Cuál es el resultado de 3³?", opciones: ["81", "9", "6", "27"], correcta: 3 },
    { pregunta: "¿Qué mide la desviación estándar en estadística?", opciones: ["La dispersión de los datos", "La tendencia central", "La probabilidad", "La frecuencia absoluta"], correcta: 0 },
    { pregunta: "¿Cuál es la unidad de fuerza en el Sistema Internacional?", opciones: ["Watt", "Pascal", "Newton", "Joule"], correcta: 2 },
    { pregunta: "¿Cuál es el valor de π aproximado?", opciones: ["5.14", "3.14", "2.14", "4.14"], correcta: 1 },
    { pregunta: "¿Qué representa la fórmula F = ma?", opciones: ["Segunda ley de Newton", "Ley de la gravedad", "Ley de acción y reacción", "Ley de la inercia"], correcta: 0 },
    { pregunta: "¿Cuál es el símbolo químico del sodio?", opciones: ["So", "Sd", "S", "Na"], correcta: 3 },
    { pregunta: "¿Qué tipo de gráfico se usa comúnmente para representar frecuencias?", opciones: ["Gráfico de barras", "Diagrama de dispersión", "Gráfico circular", "Histograma"], correcta: 3 },
    { pregunta: "¿Cuál es la fórmula del área de un triángulo?", opciones: ["A = b + h", "A = (b·h)/2", "A = b·h", "A = (b + h)/2"], correcta: 1 },
    { pregunta: "¿Qué tipo de enlace une dos átomos que comparten electrones?", opciones: ["Metálico", "Covalente", "Radical", "Iónico"], correcta: 1 }
  ];

  let preguntaActual = 0;
  let puntaje = 0;

  const questionDiv = document.getElementById('question');
  const answersDiv = document.getElementById('answers');
  const resultDiv = document.getElementById('result');
  const restartBtn = document.getElementById('restart');
  const volverBtn = document.getElementById('volver');
  const progressFill = document.getElementById('progress-fill');

  function mostrarPregunta() {
    resultDiv.innerHTML = '';
    const pregunta = preguntas[preguntaActual];
    questionDiv.textContent = pregunta.pregunta;
    answersDiv.innerHTML = '';

    pregunta.opciones.forEach((opcion, index) => {
      const btn = document.createElement('button');
      btn.textContent = opcion;
      btn.onclick = () => verificarRespuesta(index, btn);
      answersDiv.appendChild(btn);
    });

    actualizarProgreso();
  }

  function verificarRespuesta(opcionSeleccionada, botonSeleccionado) {
    const pregunta = preguntas[preguntaActual];
    const botones = answersDiv.querySelectorAll('button');

    botones.forEach((btn, idx) => {
      btn.classList.add('disabled');
      if (idx === pregunta.correcta) {
        btn.classList.add('correct');
      } else if (btn === botonSeleccionado) {
        btn.classList.add('incorrect');
      }
    });

    if (opcionSeleccionada === pregunta.correcta) {
      puntaje++;
      playCorrectSound();
    } else {
      playWrongSound();
    }

    setTimeout(() => {
      preguntaActual++;
      if (preguntaActual < preguntas.length) {
        mostrarPregunta();
      } else {
        mostrarResultado();
      }
    }, 1000);
  }

  function mostrarResultado() {
    questionDiv.innerHTML = '';
    answersDiv.innerHTML = '';
    resultDiv.innerHTML = `¡Has terminado! Tu puntaje es ${puntaje} de ${preguntas.length}.`;
    restartBtn.style.display = 'block';
    volverBtn.style.display = 'block';
    progressFill.style.width = '100%';
  }

  function actualizarProgreso() {
    const progreso = (preguntaActual / preguntas.length) * 100;
    progressFill.style.width = `${progreso}%`;
  }

  restartBtn.onclick = () => {
    preguntaActual = 0;
    puntaje = 0;
    restartBtn.style.display = 'none';
    volverBtn.style.display = 'none';
    mostrarPregunta();
  }

  mostrarPregunta();
};
