<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <router-link to="/admin/login">
          <img 
            src="/3PNG.png" 
            alt="Dr. Oscar Medrano" 
            class="h-12 w-12 object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
        </router-link>
        <div>
          <h1 class="text-xl font-bold text-primary-800">Dr. Oscar Medrano</h1>
          <p class="text-sm text-gray-500">Médico de Familia - Ecografista</p>
        </div>
      </div>
      <nav class="hidden md:flex space-x-6">
        <a href="#servicios" class="text-gray-600 hover:text-accent-500 transition-colors">Servicios</a>
        <a href="#horarios" class="text-gray-600 hover:text-accent-500 transition-colors">Horarios</a>
        <a href="#ubicacion" class="text-gray-600 hover:text-accent-500 transition-colors">Ubicación</a>
        <a href="#agendar" class="text-accent-500 hover:text-accent-600 transition-colors font-medium">Agendar Cita</a>
      </nav>
      <button 
        @click="mobileMenuOpen = !mobileMenuOpen" 
        class="md:hidden text-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <!-- Menú móvil -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-gray-50 py-4">
      <div class="flex flex-col space-y-3 px-4">
        <a href="#servicios" class="text-gray-600 hover:text-accent-500 text-right" @click="mobileMenuOpen = false">Servicios</a>
        <a href="#horarios" class="text-gray-600 hover:text-accent-500 text-right" @click="mobileMenuOpen = false">Horarios</a>
        <a href="#ubicacion" class="text-gray-600 hover:text-accent-500 text-right" @click="mobileMenuOpen = false">Ubicación</a>
        <a href="#agendar" class="text-accent-500 hover:text-accent-600 font-medium text-right" @click="mobileMenuOpen = false">Agendar Cita</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const mobileMenuOpen = ref(false);

const isAdmin = computed(() => localStorage.getItem('token') !== null);

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  router.push('/');
};
</script>
