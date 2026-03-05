<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <Header />

    <!-- hero Section -->
    <section id="inicio" class="relative bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-24 lg:py-32 overflow-hidden">
      <!-- Patrón de fondo -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div ref="heroContent" class="hero-animate">
            <span class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Médico de Familia - Ecografista General, Dopler y Musculoesquelético
            </span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
              Dr. Oscar Medrano
            </h1>
            <p class="text-lg md:text-xl lg:text-2xl font-light italic text-accent-200 mb-8 max-w-2xl mx-auto">
              "Imágenes que Salvan Vidas"
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#agendar" 
                class="bg-white text-primary-700 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg inline-flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Flecha de desplazamiento -->
      <div ref="scrollArrow" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce arrow-animate">
        <a href="#servicios" class="text-white/70 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>

    <!-- Servicios Section -->
    <section id="servicios" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 scroll-animate">
          <span class="text-accent-500 font-medium text-sm uppercase tracking-wider">Evaluación médica completa</span>
          <h2 class="text-3xl md:text-4xl font-bold text-primary-800 mt-2">Servicios Especializados</h2>
        </div>
        
        <div class="max-w-6xl mx-auto">
          <!-- Fila 1: 3 tarjetas -->
          <div class="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <!-- Servicio 1: Consultas Médicas Integrales -->
            <div class="group card scroll-animate hover:bg-accent-500 transition-all duration-300 flex flex-col h-full p-5 md:p-8" data-delay="0">
              <h3 class="text-lg font-semibold mb-3 text-primary-800 group-hover:text-white text-center">Consultas Médicas Integrales</h3>
              <div class="w-12 h-0.5 bg-accent-500 mx-auto mb-3 group-hover:bg-white"></div>
              <p class="text-sm text-gray-600 group-hover:text-white/90 text-center mt-auto">Valoración completa de salud para adultos y niños, incluyendo consultas psicosociales familiares con un enfoque preventivo, humano y de bienestar integral.</p>
            </div>
            
            <!-- Servicio 2: Ecografía Abdominal y Pélvica -->
            <div class="group card scroll-animate hover:bg-accent-500 transition-all duration-300 flex flex-col h-full p-5 md:p-8" data-delay="100">
              <h3 class="text-lg font-semibold mb-3 text-primary-800 group-hover:text-white text-center">Ecografía Abdominal y Pélvica</h3>
              <div class="w-12 h-0.5 bg-accent-500 mx-auto mb-3 group-hover:bg-white"></div>
              <p class="text-sm text-gray-600 group-hover:text-white/90 text-center mt-auto">Estudios especializados abdominales (adulto y pediátrico), renales, hepáticos y prostáticos con medición precisa de volumen pre y post miccional.</p>
            </div>
            
            <!-- Servicio 3: Sistema Musculoesquelético -->
            <div class="group card scroll-animate hover:bg-accent-500 transition-all duration-300 flex flex-col h-full p-5 md:p-8" data-delay="200">
              <h3 class="text-lg font-semibold mb-3 text-primary-800 group-hover:text-white text-center">Sistema Musculoesquelético</h3>
              <div class="w-12 h-0.5 bg-accent-500 mx-auto mb-3 group-hover:bg-white"></div>
              <p class="text-sm text-gray-600 group-hover:text-white/90 text-center mt-auto">Evaluación detallada de lesiones en hombro, brazo, codo, muñeca, mano, cadera, muslo, rodilla, pierna, tobillo y pie para un diagnóstico articular preciso.</p>
            </div>
          </div>
          
          <!-- Fila 2: 2 tarjetas centradas -->
          <div class="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <!-- Servicio 4: Piel y Partes Blandas -->
            <div class="group card scroll-animate hover:bg-accent-500 transition-all duration-300 flex flex-col h-full p-5 md:p-8" data-delay="300">
              <h3 class="text-lg font-semibold mb-3 text-primary-800 group-hover:text-white text-center">Piel y Partes Blandas</h3>
              <div class="w-12 h-0.5 bg-accent-500 mx-auto mb-3 group-hover:bg-white"></div>
              <p class="text-sm text-gray-600 group-hover:text-white/90 text-center mt-auto">Rastreo de biopolímeros, revisión de prótesis mamarias, lesiones de piel, región inguinal, cuello y glándulas mamarias o tiroides con tecnología avanzada.</p>
            </div>
            
            <!-- Servicio 5: Evaluación Vascular Periférica -->
            <div class="group card scroll-animate hover:bg-accent-500 transition-all duration-300 flex flex-col h-full p-5 md:p-8" data-delay="400">
              <h3 class="text-lg font-semibold mb-3 text-primary-800 group-hover:text-white text-center">Evaluación Vascular Periférica</h3>
              <div class="w-12 h-0.5 bg-accent-500 mx-auto mb-3 group-hover:bg-white"></div>
              <p class="text-sm text-gray-600 group-hover:text-white/90 text-center mt-auto">Doppler renal, hepático y tiroideo. Mapeo venoso y arterial de miembros inferiores con evaluación neurovascular del estrecho torácico superior.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Horarios Section -->
    <section id="horarios" class="py-20 bg-linear-to-br from-gray-50 to-gray-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 scroll-animate">
          <span class="text-accent-500 font-medium text-sm uppercase tracking-wider">Horarios</span>
          <h2 class="text-3xl md:text-4xl font-bold text-primary-800 mt-2">Horarios de Atención</h2>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <!-- Tarjeta Horario Principal -->
          <div class="card scroll-animate bg-linear-to-br from-primary-500 to-primary-600 text-white transform hover:scale-105 transition-all duration-300 p-4 md:p-6" data-delay="0">
            <div class="flex items-center mb-4 md:mb-6">
              <div class="bg-white/20 rounded-full p-2 md:p-4 mr-3 md:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base md:text-xl font-semibold">Lunes, Martes, Miércoles y Viernes</h3>
                <p class="text-white/80 text-sm md:text-base">Jornada Completa</p>
              </div>
            </div>
            <div class="flex items-center justify-between bg-white/10 rounded-lg p-3 md:p-4">
              <span class="text-base md:text-lg font-medium">8:00 AM - 2:00 PM</span>
              <span class="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">6 horas</span>
            </div>
          </div>
          
          <!-- Tarjeta Jueves -->
          <div class="card scroll-animate bg-linear-to-br from-accent-500 to-accent-600 text-white transform hover:scale-105 transition-all duration-300 p-4 md:p-6" data-delay="150">
            <div class="flex items-center mb-4 md:mb-6">
              <div class="bg-white/20 rounded-full p-2 md:p-4 mr-3 md:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base md:text-xl font-semibold">Jueves</h3>
                <p class="text-white/80 text-sm md:text-base">Media Jornada</p>
              </div>
            </div>
            <div class="flex items-center justify-between bg-white/10 rounded-lg p-3 md:p-4">
              <span class="text-base md:text-lg font-medium">8:00 AM - 12:00 PM</span>
              <span class="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">4 horas</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ubicación Section -->
    <section id="ubicacion" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 scroll-animate">
          <span class="text-accent-500 font-medium text-sm uppercase tracking-wider">Visítanos</span>
          <h2 class="text-3xl md:text-4xl font-bold text-primary-800 mt-2">Ubicación del Consultorio</h2>
        </div>
        
        <div class="max-w-4xl mx-auto scroll-animate">
          <!-- Contenedor del mapa -->
          <div class="relative rounded-2xl overflow-hidden shadow-xl" style="box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2373.1723906180846!2d-63.17029689364074!3d9.744712178284948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3341e80184fb6d%3A0xcd56bf3e4ebb8339!2sDr%20%C3%93scar%20Medrano%20%2F%20Dra%20Roselvic%20de%20Medrano!5e1!3m2!1sen!2sve!4v1772552987157!5m2!1sen!2sve" 
              width="100%" 
              height="450" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          
          <!-- Información de dirección -->
          <div class="mt-8 text-center">
            <p class="text-lg text-gray-700 mb-2 font-medium">Maturín 6201, Monagas</p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Dr+Oscar+Medrano+Maturin" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center bg-accent-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-accent-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              ¿Cómo llegar?
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Agendar Cita Section -->
    <section id="agendar" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 scroll-animate">
          <span class="text-accent-500 font-medium text-sm uppercase tracking-wider">Agenda tu Cita</span>
          <h2 class="text-3xl md:text-4xl font-bold text-primary-800 mt-2">Reserva tu Turno</h2>
        </div>
        
        <div class="scroll-animate">
          <AppointmentWizard @cita-agendada="onCitaAgendada" />
        </div>
      </div>
    </section>

    <!-- Contacto Section -->
    <section id="contacto" class="py-20 bg-linear-to-br from-primary-700 to-primary-800 text-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 scroll-animate">
          <span class="text-accent-300 font-medium text-sm uppercase tracking-wider">Dr. Oscar Medrano</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Contactos del Doctor</h2>
        </div>
        
        <div class="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          <!-- Email -->
          <div class="card scroll-animate bg-primary-600/50 text-center transform hover:scale-105 transition-all duration-300 w-full sm:w-auto min-w-70" data-delay="0">
            <div class="bg-accent-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Email</h3>
            <p class="text-gray-200">medranomadrid@gmail.com</p>
          </div>
          
          <!-- Teléfono -->
          <div class="card scroll-animate bg-primary-600/50 text-center transform hover:scale-105 transition-all duration-300 w-full sm:w-auto min-w-70" data-delay="150">
            <div class="bg-accent-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Teléfono</h3>
            <p class="text-gray-200">+58 424-8351017</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary-900 text-white py-8 scroll-animate">
      <div class="container mx-auto px-4 text-center">
        <p class="opacity-75">&copy; 2024 Dr. Oscar Medrano. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';

const alert = inject('alert');
import Header from '../components/Header.vue';
import AppointmentWizard from '../components/AppointmentWizard.vue';

const heroContent = ref(null);
const scrollArrow = ref(null);
let observer = null;

// Cuando se agenda una cita exitosamente
const onCitaAgendada = () => {
  alert.success('¡Cita agendada exitosamente! Se abrirá WhatsApp para confirmar con el doctor.');
};

// Intersection Observer para animaciones de scroll
onMounted(() => {
  // Animar el contenido del hero después de un breve delay
  setTimeout(() => {
    if (heroContent.value) {
      heroContent.value.classList.add('hero-visible');
    }
    if (scrollArrow.value) {
      scrollArrow.value.classList.add('arrow-visible');
    }
  }, 300);

  // Observer para las secciones con scroll
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || '0';
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observar todos los elementos con clase scroll-animate
  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.hero-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-visible {
  opacity: 1;
  transform: translateY(0);
}

.arrow-animate {
  opacity: 0;
  transition: opacity 1s ease 1s;
}

.arrow-visible {
  opacity: 1;
}

.scroll-animate {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-animate.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
