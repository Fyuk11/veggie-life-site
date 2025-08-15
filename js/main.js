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
  const menuItems = document.querySelectorAll(".menu-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Quitar la clase activa de todos los botones
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      menuItems.forEach(item => {
        const category = item.getAttribute("data-category");
        if (filterValue === "all" || filterValue === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
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
/*(() => {
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
*/

// ====== Reservas: WhatsApp dinámico + validación con UX mejorada ======
/*(() => {
  const form = document.getElementById('reservaForm');
  const fecha = document.getElementById('fecha');
  const tel = document.getElementById('tel');
  const btnWA = document.getElementById('btnWA');
  const nombre = document.getElementById('nombre');
  const hora = document.getElementById('hora');
  const personas = document.getElementById('personas');
  const mensaje = document.getElementById('mensaje');

  // Fecha mínima = hoy
  const today = new Date();
  fecha.min = today.toISOString().split('T')[0];

  // Deshabilitar WA hasta completar campos obligatorios
  const validarCampos = () => {
    return nombre.value.trim() && fecha.value && hora.value && personas.value;
  };

  const actualizarBotonWA = () => {
    if (validarCampos()) {
      const texto = encodeURIComponent(
        `Hola! Quiero reservar:\n- Nombre: ${nombre.value.trim()}\n- Fecha: ${fecha.value}\n- Hora: ${hora.value}\n- Personas: ${personas.value}\n- Comentarios: ${mensaje.value.trim() || '-'}`
      );
      const telefonoDestino = '549XXXXXXXXXX'; // <-- reemplazar por tu número
      btnWA.href = `https://wa.me/${telefonoDestino}?text=${texto}`;
      btnWA.classList.remove('disabled');
      btnWA.removeAttribute('disabled');
    } else {
      btnWA.href = '#';
      btnWA.classList.add('disabled');
      btnWA.setAttribute('disabled', 'true');
    }
  };

  // Sanitizar teléfono del usuario
  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^\d+ ]/g, '');
  });

  // Revisar campos cada vez que cambian
  form.addEventListener('input', actualizarBotonWA);

  // Validación al enviar formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    alert('¡Solicitud enviada! Te contactaremos para confirmar ✅');
    form.reset();
    actualizarBotonWA();
  });

  // Inicializar botón WA
  actualizarBotonWA();
})();
*/

// ====== Reservas: WhatsApp dinámico + Formspree + validación ======
// ====== Reservas: min fecha hoy + WhatsApp dinámico + Formspree ======
/*(() => {
  const form = document.getElementById('reservaForm');
  const fecha = document.getElementById('fecha');
  const tel = document.getElementById('tel');
  const btnWA = document.getElementById('btnWA');
  const successDiv = document.getElementById('reserva-success');

  // Fecha mínima = hoy
  const today = new Date();
  const toYMD = (d) => d.toISOString().split('T')[0];
  fecha.min = toYMD(today);

  // Arma el link de WhatsApp con los datos del form
  const buildWA = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const telefonoDestino = '5491121652703'; // <-- Reemplazar por el número del local (con país)
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

  // Validación y envío a Formspree
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Preparar datos para Formspree
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        form.reset();
        btnWA.href = '#';
        successDiv.style.display = 'block';
        setTimeout(() => { successDiv.style.display = 'none'; }, 5000);
      } else {
        alert('Hubo un error al enviar la solicitud. Por favor, intentá nuevamente.');
      }
    } catch (err) {
      alert('Error de red. Verificá tu conexión e intentá nuevamente.');
    }
  });

  // Sanitiza teléfono del usuario (solo números y +)
  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^\d+ ]/g, '');
  });
})();
*/
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

  // Sanitiza teléfono del usuario (solo números y +)
  tel.addEventListener('input', () => {
    tel.value = tel.value.replace(/[^\d+ ]/g, '');
  });

  // Arma el link de WhatsApp con los datos del form
  const buildWA = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const telefonoDestino = '5491121652703'; // <-- Reemplazar por el número del local
    const f = fecha.value;
    const h = document.getElementById('hora').value;
    const p = document.getElementById('personas').value;
    const msg = document.getElementById('mensaje').value.trim();
    return `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(
      `Hola! Quiero reservar:\n- Nombre: ${nombre}\n- Fecha: ${f}\n- Hora: ${h}\n- Personas: ${p}\n- Comentarios: ${msg || '-'}`
    )}`;
  };

  // Revisa si los campos obligatorios están completos
  const checkRequiredFields = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const t = tel.value.trim();
    const h = document.getElementById('hora').value;
    const p = document.getElementById('personas').value;
    const f = fecha.value;
    return nombre && t && h && p && f;
  };

  // Actualiza botón WA
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

  // Escucha cambios en todos los campos
  form.addEventListener('input', updateWAButton);

  // Inicializa estado WA
  updateWAButton();

  // Validación y envío a Formspree
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
        updateWAButton(); // Reinicia WA
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

// Smooth scroll para cualquier enlace interno
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
