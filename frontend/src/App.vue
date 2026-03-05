<template>
  <router-view />
  
  <!-- Custom Alert Global -->
  <Teleport to="body">
    <div v-if="alertState.visible" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop con blur -->
      <div 
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="cancel"
      ></div>
      
      <!-- Modal -->
      <div class="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all">
        <!-- Icono -->
        <div class="flex justify-center mb-4">
          <div 
            :class="[
              'rounded-full p-4',
              alertState.type === 'danger' ? 'bg-red-100' : 'bg-green-100'
            ]"
          >
            <!-- Icono de peligro (rojo) -->
            <svg 
              v-if="alertState.type === 'danger'"
              xmlns="http://www.w3.org/2000/svg" 
              class="h-8 w-8 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <!-- Icono de check (verde) -->
            <svg 
              v-else
              xmlns="http://www.w3.org/2000/svg" 
              class="h-8 w-8 text-green-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <!-- Título -->
        <h3 class="text-xl font-bold text-gray-800 text-center mb-2">
          {{ alertState.title }}
        </h3>
        
        <!-- Mensaje -->
        <p class="text-gray-600 text-center mb-6">
          {{ alertState.message }}
        </p>
        
        <!-- Botones -->
        <div class="flex gap-3 justify-center">
          <button
            @click="cancel"
            class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            @click="confirm"
            :class="[
              'px-6 py-2.5 text-white rounded-lg transition-colors font-medium',
              alertState.type === 'danger' 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            ]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, provide } from 'vue';

// Estado reactivo del alert
const alertState = reactive({
  visible: false,
  title: '',
  message: '',
  type: 'confirm',
  resolve: null
});

// Funciones del alert
const showAlert = (options) => {
  alertState.title = options.title || 'Confirmar';
  alertState.message = options.message || '¿Está seguro?';
  alertState.type = options.type || 'confirm';
  alertState.visible = true;
  
  return new Promise((resolve) => {
    alertState.resolve = resolve;
  });
};

const confirm = () => {
  alertState.visible = false;
  if (alertState.resolve) {
    alertState.resolve(true);
    alertState.resolve = null;
  }
};

const cancel = () => {
  alertState.visible = false;
  if (alertState.resolve) {
    alertState.resolve(false);
    alertState.resolve = null;
  }
};

// Proveer funciones globales
provide('alert', {
  confirm: (message, title) => showAlert({ title, message, type: 'confirm' }),
  success: (message, title) => showAlert({ title, message, type: 'success' }),
  danger: (message, title) => showAlert({ title, message, type: 'danger' })
});
</script>

<style>
/* Estilos globales adicionales si son necesarios */
</style>
