window.onload = function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const box = 20;
  let score = 0;
  let direction = "RIGHT";
  let gameOver = false;

  let snake = [{ x: 5 * box, y: 5 * box }];
  let operations = [];

  function generateOperation() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const correct = Math.random() < 0.5;
    const result = correct ? a + b : a + b + Math.floor(Math.random() * 3 + 1);
    const text = `${a} + ${b} = ${result}`;
    const x = Math.floor(Math.random() * 18) * box;
    const y = Math.floor(Math.random() * 18) * box;
    operations.push({ x, y, text, correct });
  }

  for (let i = 0; i < 3; i++) generateOperation();

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  });

  function mostrarFin() {
    gameOver = true;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("¡Juego terminado!", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("Puntaje: " + score, canvas.width / 2, canvas.height / 2 + 10);

    const btnReiniciar = document.createElement("button");
    btnReiniciar.textContent = "🔁 Reiniciar";
    btnReiniciar.style.margin = "10px";
    btnReiniciar.onclick = () => location.reload();

    const btnInicio = document.createElement("button");
    btnInicio.textContent = "🏠 Volver al inicio";
    btnInicio.style.margin = "10px";
    btnInicio.onclick = () => (window.location.href = "index.html");

    const contenedor = document.createElement("div");
    contenedor.style.textAlign = "center";
    contenedor.appendChild(btnReiniciar);
    contenedor.appendChild(btnInicio);
    document.body.appendChild(contenedor);
  }

  function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar serpiente
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "#4CAF50" : "#8BC34A";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Dibujar operaciones
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    operations.forEach(op => {
      ctx.fillText(op.text, op.x + 2, op.y + box - 4);
      ctx.strokeRect(op.x, op.y, box * 4, box);
    });

    // Movimiento
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    // Colisión con borde
    if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height) {
      mostrarFin();
      return;
    }

    // Colisión con operación
    for (let i = 0; i < operations.length; i++) {
      const op = operations[i];
      if (
        headX < op.x + box * 4 &&
        headX + box > op.x &&
        headY < op.y + box &&
        headY + box > op.y
      ) {
        if (op.correct) {
          score++;
          document.getElementById("score").textContent = "Puntaje: " + score;
          operations.splice(i, 1);
          generateOperation();
        } else {
          mostrarFin();
          return;
        }
      }
    }

    // Avanzar serpiente
    snake.unshift({ x: headX, y: headY });
    snake.pop();
  }

  setInterval(draw, 200); // velocidad reducida
};



