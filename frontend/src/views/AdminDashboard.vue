<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-2 py-3 flex justify-between items-center">
        <h1 class="text-base md:text-xl font-bold text-gray-800">Panel de Administración</h1>
        <button 
          @click="logout" 
          class="text-gray-600 hover:text-red-500 transition-colors flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="hidden md:inline">Cerrar Sesión</span>
        </button>
      </div>
    </header>

    <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mb-4 md:mb-8">
        <div class="card text-center py-3 md:py-4">
          <div class="bg-primary-100 rounded-full p-2 md:p-4 w-10 md:w-16 h-10 md:h-16 mx-auto mb-2 md:mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 md:h-8 w-5 md:w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-xl md:text-3xl font-bold text-gray-800">{{ stats.total }}</p>
          <p class="text-xs md:text-gray-600">Total</p>
        </div>
        <div class="card text-center py-3 md:py-4">
          <div class="bg-green-100 rounded-full p-2 md:p-4 w-10 md:w-16 h-10 md:h-16 mx-auto mb-2 md:mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 md:h-8 w-5 md:w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-xl md:text-3xl font-bold text-green-600">{{ stats.confirmadas }}</p>
          <p class="text-xs md:text-gray-600">Confirmadas</p>
        </div>
        <div class="card text-center py-3 md:py-4">
          <div class="bg-yellow-100 rounded-full p-2 md:p-4 w-10 md:w-16 h-10 md:h-16 mx-auto mb-2 md:mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 md:h-8 w-5 md:w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-xl md:text-3xl font-bold text-yellow-600">{{ stats.pendientes }}</p>
          <p class="text-xs md:text-gray-600">Pendientes</p>
        </div>
        <div class="card text-center py-3 md:py-4">
          <div class="bg-red-100 rounded-full p-2 md:p-4 w-10 md:w-16 h-10 md:h-16 mx-auto mb-2 md:mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 md:h-8 w-5 md:w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-xl md:text-3xl font-bold text-red-600">{{ stats.canceladas }}</p>
          <p class="text-xs md:text-gray-600">Canceladas</p>
        </div>
      </div>

      <!-- Citas Table -->
      <div class="card p-3 md:p-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-2 md:gap-4">
          <h2 class="text-lg md:text-xl font-bold text-gray-800">Citas Agendadas</h2>
          <div class="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
            <!-- Search -->
            <div class="relative w-full md:w-auto">
              <input
                v-model="busqueda"
                type="text"
                placeholder="Buscar..."
                class="w-full md:w-40 lg:w-48 pl-8 md:pl-10 pr-2 md:pr-4 py-1.5 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-xs md:text-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 absolute left-2 top-1.5 md:top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <!-- Filter by status -->
            <select
              v-model="filtroEstado"
              class="border border-gray-300 rounded-lg px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full md:w-auto"
            >
              <option value="">Estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>

            <!-- Filter by period -->
            <select
              v-model="filtroPeriodo"
              class="border border-gray-300 rounded-lg px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full md:w-auto"
            >
              <option value="">Todas</option>
              <option value="semana">Semana</option>
              <option value="mes">Mes</option>
            </select>

            <button 
              @click="cargarCitas" 
              class="text-primary-500 hover:text-primary-600 flex items-center justify-center text-xs md:text-sm px-2"
              title="Actualizar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
        
        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-6 md:h-8 w-6 md:w-8 border-b-2 border-primary-500"></div>
        </div>
        
        <div v-else-if="citasFiltradas.length === 0" class="text-center py-8 md:py-12">
          <div class="bg-gray-100 rounded-full p-4 md:p-6 w-16 md:w-24 h-16 md:h-24 mx-auto mb-3 md:mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 md:h-12 w-8 md:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-base md:text-xl text-gray-600 font-medium">{{ getMensajeVacio }}</p>
          <p class="text-gray-400 mt-1 md:mt-2 text-sm">Las citas aparecerán aquí</p>
        </div>
        
        <div v-else class="overflow-x-auto -mx-3 md:mx-0">
          <table class="w-full min-w-150">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Paciente</th>
                <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Teléfono</th>
                <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Fecha</th>
                <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Hora</th>
                <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Estado</th>
                <th class="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="cita in citasFiltradas" 
                :key="cita.id"
                class="border-b border-gray-200 hover:bg-gray-50"
              >
                <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-800">{{ cita.paciente_nombre }}</td>
                <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-800">{{ cita.paciente_telefono }}</td>
                <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-800">{{ formatDate(cita.fecha) }}</td>
                <td class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-800">{{ cita.horario }}</td>
                <td class="px-2 md:px-4 py-2 md:py-3">
                  <span 
                    :class="getEstadoBadgeClass(cita.estado)"
                    class="px-2 py-0.5 md:py-1 rounded-full text-xs font-medium"
                  >
                    {{ getEstadoLabel(cita.estado) }}
                  </span>
                </td>
                <td class="px-2 md:px-4 py-2 md:py-3">
                  <div class="flex items-center gap-1 md:gap-2">
                    <!-- Confirmar - Enviar por WhatsApp -->
                    <button 
                      v-if="cita.estado === 'pendiente'"
                      @click="confirmarPorWhatsApp(cita)"
                      class="text-green-500 hover:text-green-600 transition-colors"
                      title="Confirmar cita por WhatsApp"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <!-- Notificar que no se puede atender por WhatsApp -->
                    <button 
                      v-if="cita.estado === 'pendiente'"
                      @click="notificarPorWhatsApp(cita)"
                      class="text-red-500 hover:text-red-600 transition-colors"
                      title="Notificar que no se puede atender por WhatsApp"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="toast.show"
      :class="[
        'fixed bottom-2 md:bottom-4 right-2 md:right-4 px-3 md:px-6 py-2 md:py-3 rounded-lg shadow-lg transition-all duration-300 text-sm md:text-base',
        toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { citasService, statsService } from '../services/api';

const router = useRouter();
const alert = inject('alert');
const citas = ref([]);
const loading = ref(false);
const busqueda = ref('');
const filtroEstado = ref('');
const filtroPeriodo = ref('');
const toast = ref({
  show: false,
  message: '',
  type: 'success'
});

// Mensaje personalizado según el filtro de período
const getMensajeVacio = computed(() => {
  if (filtroPeriodo.value === 'semana') {
    return 'No hay pacientes citados para esta semana';
  } else if (filtroPeriodo.value === 'mes') {
    return 'No hay pacientes citados para este mes';
  }
  return 'No hay pacientes citados todavía';
});

const stats = computed(() => {
  const todasLasCitas = citas.value;
  const total = todasLasCitas.filter(c => c.estado !== 'cancelada').length;
  const confirmadas = todasLasCitas.filter(c => c.estado === 'confirmada').length;
  const pendientes = todasLasCitas.filter(c => c.estado === 'pendiente').length;
  const canceladas = todasLasCitas.filter(c => c.estado === 'cancelada').length;
  
  return { total, confirmadas, pendientes, canceladas };
});

// Computed property para filtrar citas
const citasFiltradas = computed(() => {
  let result = citas.value;

  // Filtrar por búsqueda
  if (busqueda.value) {
    const search = busqueda.value.toLowerCase();
    result = result.filter(cita => 
      cita.paciente_nombre?.toLowerCase().includes(search) ||
      cita.paciente_telefono?.toLowerCase().includes(search) ||
      cita.email?.toLowerCase().includes(search)
    );
  }

  // Filtrar por estado
  if (filtroEstado.value) {
    result = result.filter(cita => cita.estado === filtroEstado.value);
  }

  // Filtrar por período (semana o mes)
  if (filtroPeriodo.value) {
    const now = new Date();
    const parseDate = (fechaStr) => {
      if (!fechaStr) return null;
      const parts = fechaStr.split('/');
      if (parts.length === 3) {
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      return new Date(fechaStr);
    };

    if (filtroPeriodo.value === 'semana') {
      // Obtener inicio de la semana (domingo)
      const inicioSemana = new Date(now);
      inicioSemana.setDate(now.getDate() - now.getDay());
      inicioSemana.setHours(0, 0, 0, 0);
      
      // Obtener fin de la semana (sábado)
      const finSemana = new Date(now);
      finSemana.setDate(now.getDate() + (6 - now.getDay()));
      finSemana.setHours(23, 59, 59, 999);

      result = result.filter(cita => {
        const fechaCita = parseDate(cita.fecha);
        return fechaCita >= inicioSemana && fechaCita <= finSemana;
      });
    } else if (filtroPeriodo.value === 'mes') {
      // Obtener inicio del mes
      const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1);
      
      // Obtener fin del mes
      const finMes = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      finMes.setHours(23, 59, 59, 999);

      result = result.filter(cita => {
        const fechaCita = parseDate(cita.fecha);
        return fechaCita >= inicioMes && fechaCita <= finMes;
      });
    }
  }

  // Ordenar por fecha y hora (más recientes y futuras primero - descendente)
  result.sort((a, b) => {
    // Parsear fecha en formato DD/MM/YYYY
    const parseDate = (fechaStr) => {
      if (!fechaStr) return new Date(0);
      // Asumimos formato DD/MM/YYYY
      const parts = fechaStr.split('/');
      if (parts.length === 3) {
        // Crear fecha en formato YYYY-MM-DD
        return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      return new Date(fechaStr);
    };
    
    const fechaA = parseDate(a.fecha);
    const fechaB = parseDate(b.fecha);
    
    // Orden descendente: más recientes primero
    return fechaB - fechaA;
  });

  return result;
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  router.push('/');
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-VE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const getEstadoBadgeClass = (estado) => {
  switch (estado) {
    case 'confirmada':
      return 'bg-green-100 text-green-800';
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelada':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getEstadoLabel = (estado) => {
  switch (estado) {
    case 'confirmada':
      return 'Confirmada';
    case 'pendiente':
      return 'Pendiente';
    case 'cancelada':
      return 'Cancelada';
    default:
      return estado;
  }
};

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

// Función para normalizar el número de teléfono (quitar caracteres no numéricos)
const normalizePhoneNumber = (phone) => {
  if (!phone) return '';
  // Eliminar todos los caracteres no numéricos
  return phone.replace(/\D/g, '');
};

// Función para formatear la fecha
const formatDateForMessage = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-VE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Función para abrir WhatsApp con mensaje
const openWhatsApp = (telefono, mensaje) => {
  const numeroLimpio = normalizePhoneNumber(telefono);
  if (!numeroLimpio) {
    showToast('Número de teléfono no válido', 'error');
    return;
  }
  
  const mensajeEncoded = encodeURIComponent(mensaje);
  const url = `https://wa.me/${numeroLimpio}?text=${mensajeEncoded}`;
  window.open(url, '_blank');
};

// Confirmar cita por WhatsApp
const confirmarPorWhatsApp = async (cita) => {
  const confirmed = await alert.confirm(
    '¿Desea confirmar esta cita y enviar notificación por WhatsApp?',
    'Confirmar Cita'
  );
  if (!confirmed) return;
  
  const mensaje = `Saludos ${cita.paciente_nombre}. Le informamos que su cita médica para el ${formatDateForMessage(cita.fecha)} a las ${cita.horario} ha sido confirmada. El motivo de su consulta es: ${cita.motivo}. Lo esperamos en Consultorio Médico Medrano. Será un placer atenderle.`;
  
  // Abrir WhatsApp
  openWhatsApp(cita.paciente_telefono, mensaje);
  
  // Actualizar estado en la base de datos
  try {
    await citasService.confirmarCita(cita.id);
    await cargarCitas();
    showToast('Cita confirmada y notificación enviada');
  } catch (error) {
    console.error('Error confirmando cita:', error);
    showToast('WhatsApp abierto pero error al confirmar en sistema', 'error');
  }
};

// Notificar que no se puede atender por WhatsApp
const notificarPorWhatsApp = async (cita) => {
  const confirmed = await alert.danger(
    '¿Desea notificar al paciente que su cita no puede ser atendida? Esto abrirá WhatsApp para enviar el mensaje.',
    'Cancelar Cita'
  );
  if (!confirmed) return;
  
  const mensaje = `Saludos ${cita.paciente_nombre}. Lamentamos informarle que, por razones de agenda, no podemos atender su cita médica programada para el ${formatDateForMessage(cita.fecha)} a las ${cita.horario}. El motivo de su consulta era: ${cita.motivo}. Por favor, comuníquese con nosotros para agendar una nueva cita en otro momento que le resulte conveniente. Gracias por su comprensión.`;
  
  // Abrir WhatsApp
  openWhatsApp(cita.paciente_telefono, mensaje);
  
  // Actualizar estado en la base de datos
  try {
    await citasService.cancelarCita(cita.id);
    await cargarCitas();
    showToast('Cita cancelada y notificación enviada');
  } catch (error) {
    console.error('Error cancelando cita:', error);
    showToast('WhatsApp abierto pero error al cancelar en sistema', 'error');
  }
};

const cargarCitas = async () => {
  loading.value = true;
  try {
    const response = await citasService.getCitas();
    citas.value = response.data?.data || response.data || [];
  } catch (error) {
    console.error('Error cargando citas:', error);
    if (error.response?.status === 401) {
      logout();
    } else {
      showToast('Error al cargar las citas', 'error');
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  cargarCitas();
});
</script>
