document.addEventListener('DOMContentLoaded', () => {
  const navbarHTML = `
    <nav class="navbar">
      <div class="navbar-container">
        <a href="index.html" class="nav-logo">f</a>
        <button class="nav-toggle" aria-label="Abrir menú">
          <span class="hamburger"></span>
        </button>
        <ul class="nav-links">
          <li><a href="index.html">Inicio</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="snocomm.html">Snocomm</a></li>
          <li><a href="https://mamaeresincreible.blogspot.com" target="_blank" >mami</a></li>
          <li><a href="https://www.youtube.com/@MegaDollMusic" target="_blank" class="dropdown-item">· YouTube ·</a></li>
          <li><a href="https://www.even.biz/artists/mega-doll" target="_blank" class="dropdown-item">· Even ·</a></li>
          <li><a href="https://megadoll.bandcamp.com" target="_blank" class="dropdown-item">· Bandcamp ·</a></li>
        </ul>
      </div>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  // Lógica para el botón del menú hamburguesa
  const toggleButton = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggleButton.classList.toggle('active');
  });

  // Función para cambiar el color de fondo de la barra de navegación
  function changeNavbarColor() {
    const colors = ['#09203F', '#f0dda4', '#09203F']; // Colores predefinidos
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Selecciona un color aleatorio
    document.querySelector('.navbar').style.backgroundColor = randomColor; // Cambia el color de fondo
  }

  // Cambiar el color de la barra de navegación cada 2 segundos
  setInterval(changeNavbarColor, 2000); // Puedes ajustar el intervalo si lo deseas

});
