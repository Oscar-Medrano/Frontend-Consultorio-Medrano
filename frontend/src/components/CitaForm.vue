<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Datos de la Cita</h2>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
        <input
          v-model="form.nombre"
          type="text"
          required
          placeholder="Ingrese su nombre completo"
          class="input-field"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
        <input
          v-model="form.telefono"
          type="tel"
          required
          placeholder="Ingrese su número de teléfono"
          class="input-field"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Motivo de la consulta *</label>
        <textarea
          v-model="form.motivo"
          required
          placeholder="Describa brevemente el motivo de su consulta"
          rows="3"
          class="input-field resize-none"
        ></textarea>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-3">
        <p class="text-sm text-gray-600"><strong>Fecha:</strong> {{ formatDate(fecha) }}</p>
        <p class="text-sm text-gray-600"><strong>Hora:</strong> {{ horario }}</p>
      </div>
      
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>
      
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        {{ success }}
      </div>
      
      <button
        type="submit"
        :disabled="loading"
        class="btn-primary w-full flex justify-center items-center"
      >
        <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
        {{ loading ? 'Agendando...' : 'Confirmar Cita' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  fecha: {
    type: String,
    default: ''
  },
  horario: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['cita-agendada']);

const form = reactive({
  nombre: '',
  telefono: '',
  motivo: ''
});

const loading = ref(false);
const error = ref('');
const success = ref('');

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-VE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const submitForm = async () => {
  if (!props.fecha || !props.horario) {
    error.value = 'Por favor seleccione una fecha y horario';
    return;
  }
  
  loading.value = true;
  error.value = '';
  success.value = '';
  
  try {
    emit('cita-agendada', {
      ...form,
      fecha: props.fecha,
      horario: props.horario
    });
  } catch (e) {
    error.value = e.response?.data?.error || 'Error al agendar la cita';
  } finally {
    loading.value = false;
  }
};
</script>
