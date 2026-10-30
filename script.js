/* ==========================================================================
   MUHAMMED AABTHAF // PORTFOLIO INTERACTIVE CORE ENGINE (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. INTRO GATE INITIALIZATION HANDSHAKE
     ------------------------------------------------------------------------ */
  const enterTrigger = document.getElementById('enter-trigger');
  const introGate = document.getElementById('intro-gate');
  const gateStatusText = document.getElementById('gate-status-text');
  const appShell = document.getElementById('app-shell');

  if (enterTrigger) {
    enterTrigger.addEventListener('click', () => {
      if (gateStatusText) {
        gateStatusText.innerText = "INITIALIZING HANDSHAKE... 100%";
      }
      setTimeout(() => {
        if (introGate) introGate.classList.add('hidden');
        if (appShell) appShell.classList.add('active');
      }, 400);
    });
  }

  /* ------------------------------------------------------------------------
     2. NAVIGATION & CHAPTER TAB SWITCHER
     ------------------------------------------------------------------------ */
  const navButtons = document.querySelectorAll('.nav-btn');
  const sectionBlocks = document.querySelectorAll('.section-block');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update Active Navigation Button
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Active Section Block
      sectionBlocks.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     3. HARDWARE TELEMETRY MODULE INSPECTOR (CY-BOT DRONE)
     ------------------------------------------------------------------------ */
  const telemetryData = {
    pixhawk: "[SYSTEM OK] - PIXHAWK / APM FLIGHT CONTROLLER LOADED.\n> Telemetry Link: Active\n> Flight Stabilization & Mission Planning Interface Ready.",
    esc: "[POWER SYSTEM] - HOBBYWING SKYWALKER 40A UBEC ESCs.\n> Quad-motor PWM timing verified.\n> High-load current regulation stable.",
    battery: "[BATTERY TELEMETRY] - 4S 7000mAh LIPO CELL.\n> Voltage Output: Nominal\n> Extended airborne security scanning flight time capability.",
    nn: "[ML SECURITY PAYLOAD] - MLP NEURAL NETWORK CLASSIFIER.\n> Real-time packet capture processing.\n> Automated wireless protocol anomaly detection online."
  };

  const compNodes = document.querySelectorAll('.comp-node');
  const telemetryBox = document.getElementById('telemetry-box');

  compNodes.forEach(node => {
    node.addEventListener('click', () => {
      const moduleKey = node.getAttribute('data-module');

      compNodes.forEach(n => n.classList.remove('selected'));
      node.classList.add('selected');

      if (telemetryBox && telemetryData[moduleKey]) {
        telemetryBox.innerText = telemetryData[moduleKey];
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. ANIMATED CANVAS BACKGROUND ENGINE (GRID, RADAR, PIXELS, LINES)
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let currentMode = 'GRID';
  let animationAngle = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Control Sidebar Toggles
  const ctrlButtons = document.querySelectorAll('.ctrl-btn');
  ctrlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      ctrlButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode');
    });
  });

  // Render Loop
  function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentMode === 'GRID') {
      ctx.strokeStyle = 'rgba(35, 39, 51, 0.4)';
      ctx.lineWidth = 1;
      const size = 40;
      for (let x = 0; x < canvas.width; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
    } 
    else if (currentMode === 'RADAR') {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.strokeStyle = 'rgba(255, 69, 0, 0.2)';
      ctx.lineWidth = 1;

      ctx.beginPath(); ctx.arc(cx, cy, 150, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 300, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 450, 0, Math.PI * 2); ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(animationAngle) * 500, cy + Math.sin(animationAngle) * 500);
      ctx.strokeStyle = '#ff4500';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationAngle += 0.02;
    } 
    else if (currentMode === 'LINES') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.height; i += 12) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i + Math.sin(animationAngle + i) * 15);
        ctx.stroke();
      }
      animationAngle += 0.01;
    } 
    else if (currentMode === 'PIXELS') {
      ctx.fillStyle = 'rgba(255, 69, 0, 0.15)';
      for (let i = 0; i < 25; i++) {
        const rx = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        const ry = Math.floor(Math.random() * (canvas.height / 20)) * 20;
        ctx.fillRect(rx, ry, 6, 6);
      }
    }

    requestAnimationFrame(renderCanvas);
  }

  renderCanvas();
});