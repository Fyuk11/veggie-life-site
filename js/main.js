/*document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    AOS.init({
        duration: 1200,
        once: true
    });

    console.log("Veggie Life listo 🍃");
});
*/
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      duration: 800, // ms
      once: true     // anima una sola vez
    });
  } else {
    console.warn('AOS no se cargó');
  }
});



// Efecto de encogimiento del header al hacer scroll
window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Abrir / cerrar menú al hacer clic en la hamburguesa
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== hamburger) {
        navLinks.classList.remove('open');
    }
});

// Filtro de categorías en Menú
document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.menu .filter-btn');
  const cards = document.querySelectorAll('.menu .menu-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = (filter === 'all') || (cat === filter);
        card.style.display = show ? '' : 'none';
      });
    });
  });
});

// Testimonios – scroll con flechas en mobile
(() => {
  const track = document.querySelector('.testi-track');
  const prev = document.querySelector('.testi-prev');
  const next = document.querySelector('.testi-next');
  if (!track || !prev || !next) return;

  const step = () => Math.min(track.clientWidth * 0.9, 380);
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
})();


// ====== Reservas: min fecha hoy + WhatsApp dinámico + validación ======
(() => {
  const form = document.getElementById('reservaForm');
  const fecha = document.getElementById('fecha');
  const tel = document.getElementById('tel');
  const btnWA = document.getElementById('btnWA');

  // Fecha mínima = hoy
  const today = new Date();
  const toYMD = (d) => d.toISOString().split('T')[0];
  fecha.min = toYMD(today);

  // Arma el link de WhatsApp con los datos del form
  const buildWA = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const telefonoDestino = '549XXXXXXXXXX'; // <-- Reemplazar por el número del local (con país)
    const f = fecha.value;
    const h = document.getElementById('hora').value;
    const p = document.getElementById('personas').value;
    const msg = document.getElementById('mensaje').value.trim();
    const texto = encodeURIComponent(
      `Hola! Quiero reservar:\n- Nombre: ${nombre}\n- Fecha: ${f}\n- Hora: ${h}\n- Personas: ${p}\n- Comentarios: ${msg || '-'}`
    );
    return `https://wa.me/${telefonoDestino}?text=${texto}`;
  };

  // Actualiza href del botón WA cuando cambian campos
  form.addEventListener('input', () => { btnWA.href = buildWA(); });

  // Validación básica al enviar (podés integrar EmailJS/Formspree luego)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validación simple
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Simulación de envío OK
    alert('¡Solicitud enviada! Te contactaremos para confirmar ✅');
    form.reset();
    btnWA.href = '#';
  });

  // Sanitiza teléfono del usuario (no el del local)
  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^\d+ ]/g, '');
  });
})();

// Footer – año dinámico
document.getElementById('year').textContent = new Date().getFullYear();
