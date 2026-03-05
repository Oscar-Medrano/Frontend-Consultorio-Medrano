<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Seleccionar Fecha</h2>
    <input
      type="date"
      :value="modelValue"
      :min="minDate"
      :max="maxDate"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input-field"
    />
    <p v-if="!isValidDate" class="text-red-500 text-sm mt-2">
      Por favor seleccione una fecha válida (Lunes-Viernes)
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

// Calcular fecha mínima (hoy)
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

// Calcular fecha máxima (3 meses adelante)
const maxDate = computed(() => {
  const max = new Date();
  max.setMonth(max.getMonth() + 3);
  return max.toISOString().split('T')[0];
});

// Verificar si es un día válido (Lunes-Viernes)
const isValidDate = computed(() => {
  if (!props.modelValue) return true;
  const date = new Date(props.modelValue);
  const day = date.getDay();
  // 0 = Domingo, 1 = Lunes, ..., 5 = Viernes, 6 = Sábado
  return day >= 1 && day <= 5;
});
</script>
