// Bloquear combinaciones de teclas
document.addEventListener('keydown', (event) => {
  if (
    (event.ctrlKey && event.key === 'u') || // Ctrl+U
    (event.ctrlKey && event.shiftKey && event.key === 'i') || // Ctrl+Shift+I
    (event.ctrlKey && event.shiftKey && event.key === 'j') || // Ctrl+Shift+J
    (event.ctrlKey && event.key === 's') || // Ctrl+S
    (event.key === 'F12') // F12
  ) {
    event.preventDefault();
    
  }
});

// Bloquear clic derecho
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  
});

// Bloquear solicitudes de curl/wget y similares
function blockAutomatedRequests() {
  const userAgent = navigator.userAgent.toLowerCase();
  const blockedAgents = ['curl', 'wget', 'httpie', 'httpclient'
    ];

  for (let agent of blockedAgents) {
    if (userAgent.includes(agent)) {
      document.body.innerHTML = '<h1>CONCORD</h1><p>Tu solicitud fue bloqueada.</p>';
      return;
    }
  }
}

// Detectar el sistema operativo y redirigir según corresponda

// Ejecutar funciones al cargar la página
blockAutomatedRequests();
