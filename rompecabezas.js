window.onload = function () {
  const slotsContainer = document.getElementById("slots");
  const piecesContainer = document.getElementById("pieces");
  const resultDiv = document.getElementById("result");

  const expresion = [2, "+", 3, "=", 5];
  const desordenado = [...expresion].sort(() => Math.random() - 0.5);

  expresion.forEach(() => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.ondragover = e => e.preventDefault();
    slot.ondrop = e => {
      const data = e.dataTransfer.getData("text");
      if (slot.textContent === "") {
        slot.textContent = data;
        verificar();
      }
    };
    slotsContainer.appendChild(slot);
  });

  desordenado.forEach(valor => {
    const piece = document.createElement("div");
    piece.className = "piece";
    piece.textContent = valor;
    piece.draggable = true;
    piece.ondragstart = e => {
      e.preventDefault(); // evita búsqueda automática
      e.dataTransfer.setData("text/plain", e.target.textContent);
    };
    piecesContainer.appendChild(piece);
  });

  function verificar() {
    const slots = document.querySelectorAll(".slot");
    const valores = Array.from(slots).map(s => s.textContent);
    if (valores.every(v => v !== "")) {
      const correcto = valores.join("") === expresion.join("");
      resultDiv.textContent = correcto ? "✅ ¡Correcto!" : "❌ Intenta otra vez.";
      resultDiv.style.color = correcto ? "green" : "red";
    }
  }
};









