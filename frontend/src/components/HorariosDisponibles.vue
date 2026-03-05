<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Horarios Disponibles</h2>
    
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-4">
      <p class="text-red-500">{{ error }}</p>
    </div>
    
    <div v-else-if="horarios.length === 0" class="text-center py-4">
      <p class="text-gray-500">Seleccione una fecha para ver los horarios disponibles</p>
    </div>
    
    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <button
        v-for="horario in horarios"
        :key="horario"
        :disabled="!disponible"
        @click="$emit('seleccionar-horario', horario)"
        :class="[
          'py-2 px-4 rounded-lg font-medium transition-all duration-200',
          disponible
            ? selected === horario
              ? 'bg-primary-500 text-white'
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        ]"
      >
        {{ horario }}
      </button>
    </div>
    
    <p v-if="!disponible && horarios.length > 0" class="text-sm text-gray-500 mt-3">
      * Horarios ya ocupados
    </p>
  </div>
</template>

<script setup>
defineProps({
  horarios: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  disponible: {
    type: Boolean,
    default: true
  },
  selected: {
    type: String,
    default: ''
  }
});

defineEmits(['seleccionar-horario']);
</script>
