window.onload = function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const info = document.getElementById("info");

  let score = 0;
  let lives = 3;
  const maxScore = 6;
  let birds = [];
  let targets = [];
  let isDragging = false;
  let launchX = 100;
  let launchY = 300;
  let mouseX = 0;
  let mouseY = 0;
  let gameOver = false;

  function generateTarget() {
    let attempts = 0;
    let placed = false;

    while (!placed && attempts < 20) {
      const a = Math.floor(Math.random() * 10);
      const b = Math.floor(Math.random() * 10);
      const correct = Math.random() < 0.5;
      const result = correct ? a + b : a + b + Math.floor(Math.random() * 3 + 1);
      const text = `${a} + ${b} = ${result}`;
      const x = 400 + Math.random() * 150;
      const y = 80 + Math.random() * 240;

      const tooClose = targets.some(t => {
        const dx = t.x - x;
        const dy = t.y - y;
        return Math.sqrt(dx * dx + dy * dy) < 100;
      });

      if (!tooClose) {
        targets.push({ x, y, text, correct });
        placed = true;
      }

      attempts++;
    }
  }

  for (let i = 0; i < 4; i++) generateTarget();

  canvas.addEventListener("mousedown", e => {
    if (gameOver) return;
    isDragging = true;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  });

  canvas.addEventListener("mouseup", e => {
    if (!isDragging || gameOver) return;
    isDragging = false;
    const dx = launchX - e.offsetX;
    const dy = launchY - e.offsetY;
    birds.push({
      x: launchX,
      y: launchY,
      vx: -dx / 10,
      vy: -dy / 10,
      radius: 10
    });
  });

  function mostrarFin(mensaje) {
    gameOver = true;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText(mensaje, canvas.width / 2 - 80, canvas.height / 2 - 20);
    ctx.fillText(`Puntaje final: ${score}`, canvas.width / 2 - 80, canvas.height / 2 + 10);

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

  function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Catapulta
    ctx.fillStyle = "#795548";
    ctx.fillRect(launchX - 10, launchY, 20, 40);

    // Línea de lanzamiento
    if (isDragging) {
      ctx.strokeStyle = "#f44336";
      ctx.beginPath();
      ctx.moveTo(launchX, launchY);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
    }

    // Targets
    ctx.font = "16px Arial";
    targets.forEach(t => {
      ctx.fillStyle = "#000";
      ctx.fillText(t.text, t.x, t.y);
      ctx.strokeRect(t.x - 5, t.y - 20, 100, 30);
    });

    // Birds
    birds.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.5;

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#f44336";
      ctx.fill();

      targets.forEach((t, i) => {
        if (
          b.x > t.x - 5 &&
          b.x < t.x + 95 &&
          b.y > t.y - 20 &&
          b.y < t.y + 10
        ) {
          if (t.correct) {
            score++;
            if (score >= maxScore) {
              mostrarFin("🎉 ¡Has ganado!");
              return;
            }
          } else {
            lives--;
            if (lives <= 0) {
              mostrarFin("❌ ¡Juego terminado!");
              return;
            }
          }
          targets.splice(i, 1);
          generateTarget();
          b.hit = true;
        }
      });
    });

    birds = birds.filter(b => !b.hit && b.x < canvas.width && b.y < canvas.height);

    info.innerHTML = `Puntaje: ${score} | Vidas: ${"❤️".repeat(lives)}`;
    requestAnimationFrame(update);
  }

  update();
};
