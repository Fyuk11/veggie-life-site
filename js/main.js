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

// ===== FILTRO DEL MENÚ DESTACADO =====
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  //const menuItems = document.querySelectorAll(".menu-card");
const menuCards = document.querySelectorAll('.menu-card');



  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Quitar la clase activa de todos los botones
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
       menuCards.forEach(card => {
  card.addEventListener('click', () => {
    // Quita clase selected de todas
    menuCards.forEach(c => c.classList.remove('selected'));
    // Agrega a la seleccionada
    card.classList.add('selected');
  });
});
    
    });
  });
});

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
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


// ====== Reservas: min fecha hoy + WhatsApp dinámico + Formspree + habilitación WA ======
(() => {
  const form = document.getElementById('reservaForm');
  const fecha = document.getElementById('fecha');
  const tel = document.getElementById('tel');
  const btnWA = document.getElementById('btnWA');
  const successDiv = document.getElementById('reserva-success');

  // Fecha mínima = hoy
  const today = new Date();
  const toYMD = (d) => d.toISOString().split('T')[0];
  fecha.min = toYMD(today);

  // Sanitiza teléfono
  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^\d+ ]/g, '');
  });

  // Arma el mensaje de WhatsApp
  const buildWA = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const telefonoDestino = '5491121652703'; // Cambiar por número real
    const f = fecha.value;
    const h = document.getElementById('hora').value;
    const p = document.getElementById('personas').value;
    const msg = document.getElementById('mensaje').value.trim();
    return `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(
      `Hola! Quiero reservar:\n- Nombre: ${nombre}\n- Fecha: ${f}\n- Hora: ${h}\n- Personas: ${p}\n- Comentarios: ${msg || '-'}`
    )}`;
  };

  // Chequea campos obligatorios
  const checkRequiredFields = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const t = tel.value.trim();
    const h = document.getElementById('hora').value;
    const p = document.getElementById('personas').value;
    const f = fecha.value;
    return nombre && t && h && p && f;
  };

  // Actualiza enlace WA
  const updateWAButton = () => {
    if (checkRequiredFields()) {
      btnWA.href = buildWA();
      btnWA.classList.remove('disabled');
      btnWA.style.pointerEvents = 'auto';
      btnWA.style.opacity = '1';
    } else {
      btnWA.href = '#';
      btnWA.classList.add('disabled');
      btnWA.style.pointerEvents = 'none';
      btnWA.style.opacity = '0.5';
    }
  };

  // Escucha cambios en campos
  form.addEventListener('input', updateWAButton);

  // 🔹 Forzar actualización al hacer clic
  btnWA.addEventListener('click', (e) => {
    if (!checkRequiredFields()) {
      e.preventDefault();
      alert('Por favor completá todos los campos obligatorios antes de reservar por WhatsApp.');
    } else {
      btnWA.href = buildWA(); // Actualiza el enlace justo antes de abrirlo
    }
  });

  // Inicializa
  updateWAButton();

  // Envío a Formspree
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        form.reset();
        updateWAButton();
        successDiv.style.display = 'block';
        setTimeout(() => { successDiv.style.display = 'none'; }, 5000);
      } else {
        alert('Hubo un error al enviar la solicitud. Por favor, intentá nuevamente.');
      }
    } catch (err) {
      alert('Error de red. Verificá tu conexión e intentá nuevamente.');
    }
  });

})();



// Footer – año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// botones
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    menuCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});


// Siempre al cargar la página, ir al top
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// --- Smooth scroll SOLO para anclas internas ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    // Ignorar si es solo "#"
    if (!targetId || targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight : 0;
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// SCROLL TO TOP
(() => {
  const btnTop = document.getElementById('btnTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btnTop.classList.add('show');
    else btnTop.classList.remove('show');
  });

  btnTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

