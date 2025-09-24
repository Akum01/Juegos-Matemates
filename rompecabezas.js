window.onload = function () {
  const niveles = document.querySelectorAll(".niveles button");
  const slotsContainer = document.getElementById("slots");
  const piecesContainer = document.getElementById("pieces");
  const resultDiv = document.getElementById("result");

  niveles.forEach(btn => {
    btn.addEventListener("click", () => {
      const nivel = parseInt(btn.textContent.replace("Nivel ", ""));
      iniciarNivel(nivel);
    });
  });

  function mostrarInstruccion(nivel) {
    const texto = document.getElementById("instruccion");
    if (nivel === 1) {
      texto.textContent = "🧩 Arrastra los elementos para formar una suma básica.";
    } else if (nivel === 2) {
      texto.textContent = "🧩 Completa: ___ + ___ + ___ + ___ = ?";
    } else if (nivel === 3) {
      texto.textContent = "🧩 Forma una operación con división.";
    } else if (nivel === 4) {
      texto.textContent = "🧩 Usa multiplicación y suma para llegar al resultado.";
    }
  }

  function iniciarNivel(nivel) {
    slotsContainer.innerHTML = "";
    piecesContainer.innerHTML = "";
    resultDiv.textContent = "";
    document.getElementById("objetivo").textContent = "";

    mostrarInstruccion(nivel);

    let expresion = [];
    let objetivo = null;

    if (nivel === 1) {
      expresion = [2, "+", 3];
      objetivo = 5;
    } else if (nivel === 2) {
      expresion = [4, "+", 5, "+", 6, "+", 5];
      objetivo = 20;
    } else if (nivel === 3) {
      expresion = [8, "/", 2];
      objetivo = 4;
    } else if (nivel === 4) {
      expresion = [3, "*", 3, "+", 1];
      objetivo = 10;
    }

    document.getElementById("objetivo").textContent = `🎯 Resultado esperado: ${objetivo}`;

    const desordenado = [...expresion].sort(() => Math.random() - 0.5);

    expresion.forEach(() => {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.ondragover = e => e.preventDefault();
      slot.ondrop = e => {
        const data = e.dataTransfer.getData("text/plain");
        if (slot.textContent === "") {
          slot.textContent = data;
          verificar(expresion, objetivo);
        }
      };
      slotsContainer.appendChild(slot);
    });

    desordenado.forEach(valor => {
      const piece = document.createElement("div");
      piece.className = "piece";
      piece.textContent = valor;
      piece.setAttribute("draggable", "true");
      piece.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", e.target.textContent);
      });
      piecesContainer.appendChild(piece);
    });
  }

  function verificar(expresion, objetivo) {
    const slots = document.querySelectorAll(".slot");
    const valores = Array.from(slots).map(s => s.textContent);
    if (valores.every(v => v !== "")) {
      const operacion = valores.join(" ");
      try {
        const resultado = eval(operacion);
        if (resultado === objetivo) {
          resultDiv.textContent = `✅ ¡Correcto! ${operacion} = ${objetivo}`;
          resultDiv.style.color = "green";
        } else {
          resultDiv.textContent = `❌ Intenta otra vez. ${operacion} = ${resultado}`;
          resultDiv.style.color = "red";
        }
      } catch {
        resultDiv.textContent = "⚠️ Operación inválida.";
        resultDiv.style.color = "orange";
      }
    }
  }
};










