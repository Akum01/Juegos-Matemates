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

  function iniciarNivel(nivel) {
    // Limpiar tablero
    slotsContainer.innerHTML = "";
    piecesContainer.innerHTML = "";
    resultDiv.textContent = "";

    // Definir operación por nivel
    let expresion = [];
    if (nivel === 1) {
      expresion = [2, "+", 3, "=", 5];
    } else if (nivel === 2) {
      expresion = [4, "+", 5, "+", 6, "+", 5, "=", 20];
    } else if (nivel === 3) {
      expresion = [8, "÷", 2, "=", 4];
    } else if (nivel === 4) {
      expresion = [3, "×", 3, "+", 1, "=", 10];
    }

    const desordenado = [...expresion].sort(() => Math.random() - 0.5);

    // Crear espacios vacíos
    expresion.forEach(() => {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.ondragover = e => e.preventDefault();
      slot.ondrop = e => {
        const data = e.dataTransfer.getData("text");
        if (slot.textContent === "") {
          slot.textContent = data;
          verificar(expresion);
        }
      };
      slotsContainer.appendChild(slot);
    });

    // Crear piezas desordenadas
    desordenado.forEach(valor => {
      const piece = document.createElement("div");
      piece.className = "piece";
      piece.textContent = valor;
      piece.draggable = true;
      piece.ondragstart = e => {
        e.dataTransfer.setData("text", e.target.textContent);
      };
      piecesContainer.appendChild(piece);
    });
  }

  function verificar(expresion) {
    const slots = document.querySelectorAll(".slot");
    const valores = Array.from(slots).map(s => s.textContent);
    if (valores.every(v => v !== "")) {
      const correcto = valores.join("") === expresion.join("");
      resultDiv.textContent = correcto ? "✅ ¡Correcto!" : "❌ Intenta otra vez.";
      resultDiv.style.color = correcto ? "green" : "red";
    }
  }
};








