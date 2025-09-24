window.onload = function () {
  const adivinanzas = [
    { pregunta: "De color roja suelo estar, como una variable me has de encontrar.", opciones: ["X", "Y", "Z", "Tesoro pirata"], correcta: 0 },
    { pregunta: "Tus números suelo multiplicar, un tesoro escondido bajo de mí suele estar.", opciones: ["Signo de división", "Multiplicador", "X", "Raíz cuadrada"], correcta: 2 },
    { pregunta: "Soy invisible pero te empujo, si caes me culpas, aunque no me veas.", opciones: ["Gravedad", "Fuerza centrípeta", "Presión", "Inercia"], correcta: 0 },
    { pregunta: "Si me usas bien, todo se resume. Soy el centro de tus datos.", opciones: ["Moda", "Media", "Mediana", "Desviación"], correcta: 1 },
    { pregunta: "Soy curva y elegante, dibujo trayectorias en el aire.", opciones: ["Parábola", "Recta", "Circunferencia", "Tangente"], correcta: 0 },
    { pregunta: "Me ves en ecuaciones, soy como una letra con poder.", opciones: ["Variable", "Constante", "Coeficiente", "Exponente"], correcta: 0 },
    { pregunta: "Si me divides entre cero, el universo se confunde.", opciones: ["Cero", "Infinito", "Error", "Nada"], correcta: 2 },
    { pregunta: "Soy la ley que dice que todo sigue igual, hasta que algo lo cambie.", opciones: ["Ley de la inercia", "Ley de acción y reacción", "Ley de gravedad", "Ley de conservación"], correcta: 0 },
    { pregunta: "Soy el número que no termina, pero todos me conocen.", opciones: ["e", "π", "i", "∞"], correcta: 1 },
    { pregunta: "Si me lanzas, te doy una probabilidad. Si me repites, te doy estadística.", opciones: ["Dado", "Encuesta", "Experimento", "Variable aleatoria"], correcta: 0 }
  ];

  let actual = 0;
  let puntaje = 0;

  const riddleDiv = document.getElementById('riddle');
  const optionsDiv = document.getElementById('options');
  const resultDiv = document.getElementById('result');
  const restartBtn = document.getElementById('restart');
  const volverBtn = document.getElementById('volver');
  const progressFill = document.getElementById('progress-fill');

  function mostrarAdivinanza() {
    resultDiv.innerHTML = '';
    const adivinanza = adivinanzas[actual];
    riddleDiv.textContent = adivinanza.pregunta;
    optionsDiv.innerHTML = '';

    adivinanza.opciones.forEach((opcion, index) => {
      const btn = document.createElement('button');
      btn.textContent = opcion;
      btn.onclick = () => verificar(index, btn);
      optionsDiv.appendChild(btn);
    });

    actualizarProgreso();
  }

  function verificar(seleccionada, boton) {
    const adivinanza = adivinanzas[actual];
    const botones = optionsDiv.querySelectorAll('button');

    botones.forEach((btn, idx) => {
      btn.classList.add('disabled');
      if (idx === adivinanza.correcta) {
        btn.classList.add('correct');
      } else if (btn === boton) {
        btn.classList.add('incorrect');
      }
    });

    if (seleccionada === adivinanza.correcta) {
      puntaje++;
    }

    setTimeout(() => {
      actual++;
      if (actual < adivinanzas.length) {
        mostrarAdivinanza();
      } else {
        mostrarResultado();
      }
    }, 1000);
  }

  function mostrarResultado() {
    riddleDiv.innerHTML = '';
    optionsDiv.innerHTML = '';
    resultDiv.innerHTML = `¡Has terminado! Tu puntaje es ${puntaje} de ${adivinanzas.length}.`;
    restartBtn.style.display = 'block';
    volverBtn.style.display = 'block';
    progressFill.style.width = '100%';
  }

  function actualizarProgreso() {
    const progreso = (actual / adivinanzas.length) * 100;
    progressFill.style.width = `${progreso}%`;
  }

  restartBtn.onclick = () => {
    actual = 0;
    puntaje = 0;
    restartBtn.style.display = 'none';
    volverBtn.style.display = 'none';
    mostrarAdivinanza();
  }

  mostrarAdivinanza();
};

