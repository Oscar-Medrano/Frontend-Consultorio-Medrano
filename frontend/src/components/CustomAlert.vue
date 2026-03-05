<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop con blur -->
      <div 
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="handleCancel"
      ></div>
      
      <!-- Modal -->
      <div class="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all">
        <!-- Icono -->
        <div class="flex justify-center mb-4">
          <div 
            :class="[
              'rounded-full p-4',
              type === 'confirm' ? 'bg-yellow-100' : 'bg-green-100'
            ]"
          >
            <svg 
              v-if="type === 'confirm'"
              xmlns="http://www.w3.org/2000/svg" 
              class="h-8 w-8 text-yellow-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
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
          {{ title }}
        </h3>
        
        <!-- Mensaje -->
        <p class="text-gray-600 text-center mb-6">
          {{ message }}
        </p>
        
        <!-- Botones -->
        <div class="flex gap-3 justify-center">
          <button
            @click="handleCancel"
            class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            @click="handleConfirm"
            :class="[
              'px-6 py-2.5 text-white rounded-lg transition-colors font-medium',
              type === 'confirm' 
                ? 'bg-yellow-500 hover:bg-yellow-600' 
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
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Confirmar'
  },
  message: {
    type: String,
    default: '¿Está seguro?'
  },
  type: {
    type: String,
    default: 'confirm', // 'confirm' o 'success'
    validator: (value) => ['confirm', 'success'].includes(value)
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const show = ref(false);

const open = () => {
  show.value = true;
  return new Promise((resolve) => {
    const handleConfirm = () => {
      show.value = false;
      emit('confirm');
      resolve(true);
      cleanup();
    };
    
    const handleCancel = () => {
      show.value = false;
      emit('cancel');
      resolve(false);
      cleanup();
    };
    
    const cleanup = () => {
      // Cleanup listeners si es necesario
    };
    
    // Guardar referencias para usarlas en los métodos
    window.__alertConfirmResolve = handleConfirm;
    window.__alertConfirmReject = handleCancel;
  });
};

const handleConfirm = () => {
  if (window.__alertConfirmResolve) {
    window.__alertConfirmResolve();
    window.__alertConfirmResolve = null;
    window.__alertConfirmReject = null;
  }
};

const handleCancel = () => {
  if (window.__alertConfirmReject) {
    window.__alertConfirmReject();
    window.__alertConfirmResolve = null;
    window.__alertConfirmReject = null;
  }
};

// Exponer método para abrir el modal
defineExpose({ open });
</script>
