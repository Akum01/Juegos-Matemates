window.onload = function () {
  const equationText = document.getElementById('equation-text');
  const slotsContainer = document.getElementById('slots');
  const piecesContainer = document.getElementById('pieces');
  const resultDiv = document.getElementById('result');

  const niveles = {
    1: {
      ecuacion: "__ + __ = 10",
      cantidadSlots: 2,
      piezas: [2, 4, 6, 8],
      validar: arr => arr[0] + arr[1] === 10
    },
    2: {
      ecuacion: "__ + __ + __ + __ = 20",
      cantidadSlots: 4,
      piezas: [2, 4, 5, 6, 7, 8, 9, 10],
      validar: arr => arr.reduce((a, b) => a + b, 0) === 20
    },
    3: {
      ecuacion: "(__ × __) + __ = 30",
      cantidadSlots: 3,
      piezas: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
      validar: arr => arr[0] * arr[1] + arr[2] === 30
    },
    4: {
      ecuacion: "(__ + __) × (__ - __) = 36",
      cantidadSlots: 4,
      piezas: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15],
      validar: arr => (arr[0] + arr[1]) * (arr[2] - arr[3]) === 36
    }
  };

  window.cargarNivel = function (nivel) {
    const config = niveles[nivel];
    equationText.textContent = "Completa: " + config.ecuacion;
    slotsContainer.innerHTML = "";
    piecesContainer.innerHTML = "";
    resultDiv.textContent = "";

    for (let i = 0; i < config.cantidadSlots; i++) {
      const slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.index = i;
      slot.addEventListener('dragover', e => e.preventDefault());
      slot.addEventListener('drop', e => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        slot.textContent = data;
        verificar(config);
      });
      slotsContainer.appendChild(slot);
    }

    config.piezas.forEach(num => {
      const piece = document.createElement('div');
      piece.className = 'piece';
      piece.textContent = num;
      piece.draggable = true;
      piece.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', piece.textContent);
      });
      piecesContainer.appendChild(piece);
    });
  };

  function verificar(config) {
    const slots = document.querySelectorAll('.slot');
    const valores = Array.from(slots).map(s => parseInt(s.textContent));
    if (valores.every(v => !isNaN(v))) {
      if (config.validar(valores)) {
        resultDiv.textContent = "✅ ¡Correcto!";
        resultDiv.style.color = "green";
      } else {
        resultDiv.textContent = "❌ Intenta otra combinación.";
        resultDiv.style.color = "red";
      }
    }
  }
};







