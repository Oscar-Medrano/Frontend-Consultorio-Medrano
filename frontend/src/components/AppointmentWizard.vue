<template>
  <div class="wizard-container">
    <!-- Barra de Progreso -->
    <div class="progress-container mb-8">
      <div class="flex items-center justify-between max-w-lg mx-auto">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="flex flex-col items-center relative"
        >
          <div 
            class="step-indicator flex items-center justify-center rounded-full font-semibold transition-all duration-300"
            :class="getStepClass(index)"
          >
            <svg v-if="index < currentStep" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span 
            class="step-label mt-2 text-xs font-medium transition-all duration-300"
            :class="index <= currentStep ? 'text-accent-600' : 'text-gray-400'"
          >
            {{ step }}
          </span>
          <div v-if="index < steps.length - 1" class="step-line absolute top-5" :class="index < currentStep ? 'bg-accent-500' : 'bg-gray-200'" :style="{ left: 'calc(50% + 20px)', width: 'calc(100% - 40px)' }"></div>
        </div>
      </div>
    </div>

    <!-- Contenido del Wizard -->
    <div class="step-content bg-white rounded-2xl shadow-lg p-8">
      
      <!-- Paso 1: Google Sign-In -->
      <div v-if="currentStep === 0" class="step-enter">
        <h3 class="text-2xl font-bold text-primary-800 mb-6 text-center">Agenda tu cita médica</h3>
        
        <!-- Usuario ya autenticado -->
        <div v-if="googleUserStore.isAuthenticated" class="text-center">
          <p class="text-gray-600 mb-6">Por favor, ingresa tu nombre, teléfono y motivo de consulta para confirmar la cita</p>
        </div>
        
        <!-- Botón de Google Sign-In -->
        <div v-if="!googleUserStore.isAuthenticated" class="text-center">
          <button 
            @click="handleGoogleSignIn"
            :disabled="googleUserStore.loading"
            class="w-full py-4 px-6 rounded-xl font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm"
          >
            <svg v-if="!googleUserStore.loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-6 h-6">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ googleUserStore.loading ? 'Iniciando sesión...' : 'Continuar con Google' }}</span>
          </button>
          
          <p class="text-xs text-gray-500 mt-4">
            Al continuar, aceptas nuestros términos y condiciones
          </p>
        </div>
        
        <!-- Datos adicionales si ya está autenticado -->
        <div v-if="googleUserStore.isAuthenticated">
          <form @submit.prevent="goToDateSelection" class="space-y-5">
            <!-- Nombre ( editable para permitir correcciones) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input 
                v-model="formData.nombre"
                type="text" 
                required
                placeholder="Ingresa tu nombre completo"
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
              />
            </div>

            <!-- Email (solo lectura - verificar Gmail real) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email <span class="text-xs text-gray-400">(verificado con Google)</span></label>
              <input 
                :value="googleUserStore.email"
                type="email" 
                disabled
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <!-- Teléfono -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
              <div class="flex gap-1 md:gap-3">
                <select 
                  v-model="formData.pais"
                  class="w-18 md:w-28 px-1 md:px-3 py-3 md:py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 outline-none bg-white country-select text-xs md:text-sm"
                  :style="{ minWidth: '72px', maxWidth: '96px' }"
                >
                  <option v-for="country in countries" :key="country.code" :value="country.code">
                    {{ country.emoji }} +{{ country.phoneCode }}
                  </option>
                </select>
                <input 
                  v-model="formData.telefono"
                  type="tel" 
                  required
                  :placeholder="phonePlaceholder"
                  class="flex-1 px-2 md:px-4 py-3 md:py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all text-sm md:text-base w-20"
                  @input="validatePhone"
                  inputmode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <p v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</p>
            </div>

            <!-- Motivo de Consulta -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Motivo de Consulta *</label>
              <div class="relative">
                <select 
                  v-model="formData.motivo"
                  required
                  class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all bg-white appearance-none pr-10"
                >
                  <option value="" disabled>Selecciona el motivo de tu consulta</option>
                  <option value="Consulta Médica General">Consulta Médica General</option>
                  <option value="Consulta Médica Pediátrica">Consulta Médica Pediátrica</option>
                  <option value="Consulta Psicosocial Familiar">Consulta Psicosocial Familiar</option>
                  <option value="Eco Abdominal Adulto">Eco Abdominal Adulto</option>
                  <option value="Eco Abdominal Infantil">Eco Abdominal Infantil</option>
                  <option value="Eco Abdominal con énfasis Renal - Hepático - Pancreático">Eco Abdominal con énfasis Renal - Hepático - Pancreático</option>
                  <option value="Eco Abdominal y Pélvico Combinado">Eco Abdominal y Pélvico Combinado</option>
                  <option value="Eco Pélvico Ginecológico / Vesical">Eco Pélvico Ginecológico / Vesical</option>
                  <option value="Eco Renovesicoprostático con volumen pre y post miccional">Eco Renovesicoprostático con volumen pre y post miccional</option>
                  <option value="Eco Prostático Transabdominal">Eco Prostático Transabdominal</option>
                  <option value="Eco Testicular con evaluación Doppler">Eco Testicular con evaluación Doppler</option>
                  <option value="Eco Musculoesquelético de Hombro">Eco Musculoesquelético de Hombro</option>
                  <option value="Eco Musculoesquelético de Brazo">Eco Musculoesquelético de Brazo</option>
                  <option value="Eco Musculoesquelético de Codo">Eco Musculoesquelético de Codo</option>
                  <option value="Eco Musculoesquelético de Antebrazo">Eco Musculoesquelético de Antebrazo</option>
                  <option value="Eco Musculoesquelético de Muñeca">Eco Musculoesquelético de Muñeca</option>
                  <option value="Eco Musculoesquelético de Mano">Eco Musculoesquelético de Mano</option>
                  <option value="Eco Musculoesquelético de Cadera Adulto">Eco Musculoesquelético de Cadera Adulto</option>
                  <option value="Eco de Cadera Infantil">Eco de Cadera Infantil</option>
                  <option value="Eco Musculoesquelético de Muslo">Eco Musculoesquelético de Muslo</option>
                  <option value="Eco Musculoesquelético de Rodilla">Eco Musculoesquelético de Rodilla</option>
                  <option value="Eco Musculoesquelético de Pierna">Eco Musculoesquelético de Pierna</option>
                  <option value="Eco Musculoesquelético de Tobillo">Eco Musculoesquelético de Tobillo</option>
                  <option value="Eco Musculoesquelético de Pie">Eco Musculoesquelético de Pie</option>
                  <option value="Eco de Partes Blandas (General)">Eco de Partes Blandas (General)</option>
                  <option value="Eco de Partes Blandas de Pared Abdominal">Eco de Partes Blandas de Pared Abdominal</option>
                  <option value="Eco de Partes Blandas de Región Inguinal">Eco de Partes Blandas de Región Inguinal</option>
                  <option value="Eco de Partes Blandas de Cuello">Eco de Partes Blandas de Cuello</option>
                  <option value="Eco de Partes Blandas para Rastreo de Biopolímeros">Eco de Partes Blandas para Rastreo de Biopolímeros</option>
                  <option value="Eco de Partes Blandas para Revisión de Lesiones de Piel">Eco de Partes Blandas para Revisión de Lesiones de Piel</option>
                  <option value="Eco Mamario Bilateral">Eco Mamario Bilateral</option>
                  <option value="Eco Mamario con Revisión de Prótesis">Eco Mamario con Revisión de Prótesis</option>
                  <option value="Eco Mamario en pacientes con Gigantomastia">Eco Mamario en pacientes con Gigantomastia</option>
                  <option value="Eco Doppler Tiroideo">Eco Doppler Tiroideo</option>
                  <option value="Eco Doppler Renal">Eco Doppler Renal</option>
                  <option value="Eco Doppler Hepático">Eco Doppler Hepático</option>
                  <option value="Eco Doppler Venoso de Miembros Inferiores">Eco Doppler Venoso de Miembros Inferiores</option>
                  <option value="Eco Doppler Arterial de Miembros Inferiores">Eco Doppler Arterial de Miembros Inferiores</option>
                  <option value="Eco Doppler Carotídeo Vertebrobasilar">Eco Doppler Carotídeo Vertebrobasilar</option>
                  <option value="Evaluación Neurovascular del Estrecho Torácico Superior">Evaluación Neurovascular del Estrecho Torácico Superior</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Error de autenticación -->
            <div v-if="googleUserStore.error" class="p-3 rounded-xl text-sm bg-red-50 text-red-700 border border-red-200">
              {{ googleUserStore.error }}
            </div>

            <button 
              type="submit"
              :disabled="!isFormValid || googleUserStore.loading"
              class="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="isFormValid ? 'bg-linear-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 transform hover:-translate-y-1 shadow-lg' : 'bg-gray-400'"
            >
              Siguiente
            </button>
          </form>
          
          <button 
            @click="handleGoogleLogout"
            class="w-full mt-3 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <!-- Paso 2: Seleccionar Día -->
      <div v-if="currentStep === 1" class="step-enter">
        <h3 class="text-2xl font-bold text-primary-800 mb-6 text-center">Seleccionar Día</h3>
        
        <!-- Navegación de meses -->
        <div class="week-nav flex items-center justify-center gap-4 mb-6">
          <button 
            @click="previousMonth" 
            :disabled="!canGoPreviousMonth"
            class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="text-lg font-semibold text-primary-700">{{ formatMonthYear(currentMonthDate) }}</span>
          <button 
            @click="nextMonth" 
            :disabled="!canGoNextMonth"
            class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <!-- Días de la semana -->
        <div class="grid grid-cols-7 gap-2 mb-2">
          <div v-for="day in weekDays" :key="day" class="text-center py-2 font-semibold text-gray-500 text-sm">
            {{ day }}
          </div>
        </div>
        
        <!-- Días del mes -->
        <div class="grid grid-cols-7 gap-2">
          <div v-for="i in monthStartDay" :key="'empty-' + i" class="p-3"></div>
          <button
            v-for="date in monthDays"
            :key="date.toISOString()"
            @click="selectDay(date)"
            :disabled="isWeekend(date) || isPastDate(date)"
            class="day-btn p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
            :class="selectedDate && isSameDay(date, selectedDate) ? 'bg-accent-500 text-white shadow-lg transform scale-105' : !isWeekend(date) && !isPastDate(date) ? 'bg-gray-50 hover:bg-accent-100' : 'bg-gray-100 opacity-50'"
          >
            <span class="block text-lg font-semibold">{{ formatDayNumber(date) }}</span>
          </button>
        </div>
        
        <button 
          @click="currentStep = 0"
          class="w-full mt-6 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
        >
          Atrás
        </button>
      </div>

      <!-- Paso 3: Seleccionar Hora -->
      <div v-if="currentStep === 2" class="step-enter flex flex-col min-h-100">
        <h3 class="text-2xl font-bold text-primary-800 mb-2 text-center">Seleccionar Hora</h3>
        <p class="text-gray-500 text-center mb-6">{{ formatFullDate(selectedDate) }}</p>
        
        <!-- Mostrar horarios disponibles -->
        <div v-if="loadingSlots" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
        
        <!-- Mostrar horarios disponibles (sin los ocupados) -->
        <div v-else-if="availableHours.length > 0" class="grid grid-cols-3 md:grid-cols-4 gap-3">
          <button
            v-for="horario in availableHours"
            :key="horario"
            @click="selectHour(horario)"
            class="time-btn py-4 px-4 rounded-xl text-center transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-accent-300"
            :class="selectedHour === horario ? 'border-accent-500 bg-accent-50 text-accent-700 shadow-md' : ''"
          >
            <span class="font-semibold text-lg">{{ horario }}</span>
          </button>
        </div>
        
        <div v-else class="text-center py-4">
          <p class="text-red-500 font-medium mb-2">No hay horarios disponibles</p>
          <p class="text-sm text-gray-500 mb-4">Todos los horarios para esta fecha ya están reservados</p>
        </div>
        
        <p v-if="availableSlots && availableSlots.length > 0" class="text-sm text-gray-500 mt-3">
          * Horarios disponibles para esta fecha
        </p>
        
        <div class="grow"></div>
        
        <button 
          @click="currentStep = 1"
          class="w-full mt-4 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
        >
          Atrás
        </button>
      </div>

      <!-- Paso 4: Confirmar Cita -->
      <div v-if="currentStep === 3" class="step-enter">
        <h3 class="text-2xl font-bold text-primary-800 mb-6 text-center">Confirmar Cita</h3>
        
        <!-- Resumen de la cita -->
        <div class="bg-linear-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-6 border border-accent-200">
          <h4 class="font-semibold text-primary-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Datos de la Cita
          </h4>
          <div class="space-y-3 text-sm">
            <div class="flex items-center">
              <span class="text-gray-500 w-20">Fecha:</span>
              <span class="font-medium">{{ formatFullDate(selectedDate) }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 w-20">Hora:</span>
              <span class="font-medium">{{ selectedHour }}</span>
            </div>
          </div>
        </div>

        <!-- Datos del paciente -->
        <div class="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          <h4 class="font-semibold text-primary-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Datos del Paciente
          </h4>
          <div class="space-y-3 text-sm">
            <div class="flex items-center">
              <span class="text-gray-500 w-20">Nombre:</span>
              <span class="font-medium">{{ formData.nombre }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 w-20">Teléfono:</span>
              <span class="font-medium">{{ fullPhoneNumber }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 w-20">Email:</span>
              <span class="font-medium">{{ googleUserStore.email }}</span>
            </div>
            <div class="flex items-start">
              <span class="text-gray-500 w-20">Motivo:</span>
              <span class="font-medium flex-1">{{ formData.motivo }}</span>
            </div>
          </div>
        </div>

        <!-- Error de confirmación -->
        <div v-if="confirmError" class="mb-4 p-3 rounded-xl text-sm bg-red-50 text-red-700 border border-red-200">
          {{ confirmError }}
        </div>

        <button 
          @click="confirmAppointment"
          :disabled="submitting"
          class="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 transform hover:-translate-y-1 shadow-lg"
        >
          <span v-if="submitting" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Confirmando...
          </span>
          <span v-else>Confirmar Cita</span>
        </button>

        <button 
          @click="previousStep"
          class="w-full mt-3 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
        >
          Atrás
        </button>
      </div>

      <!-- Confirmación (Paso 5) -->
      <div v-if="currentStep === 4" class="step-enter text-center">
        <div class="flex justify-center mb-6">
          <div class="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 class="text-3xl font-bold text-primary-800 mb-4">¡Cita Agendada!</h3>
        <p class="text-gray-600 mb-2">Tu cita ha sido programada exitosamente.</p>
        
        <div class="appointment-details bg-gray-50 rounded-xl p-6 mb-6 text-left">
          <h4 class="font-semibold text-primary-800 mb-4">Detalles de la cita:</h4>
          <div class="space-y-3">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatFullDate(selectedDate) }}</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ selectedHour }}</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ formData.nombre || googleUserStore.displayName }}</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{{ formData.motivo }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <a 
            :href="whatsappLink"
            target="_blank"
            class="block w-full py-4 rounded-xl font-semibold text-white bg-[#25D366] hover:bg-[#20bd5c] transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            <span class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Confirmar por WhatsApp
            </span>
          </a>
          <button 
            @click="resetWizard"
            class="block w-full py-4 rounded-xl font-semibold text-primary-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          >
            Agendar otra cita
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGoogleUserStore } from '../stores/useGoogleUser';

const emit = defineEmits(['cita-agendada']);

// Importar el store de Pinia
const googleUserStore = useGoogleUserStore();

// Pasos: Datos, Día, Hora, Confirmar, Listo
const steps = ['Datos', 'Día', 'Hora', 'Confirmar', 'Listo'];
const currentStep = ref(0);

const selectedDate = ref(null);
const selectedHour = ref(null);
const currentMonthIndex = ref(0);
const occupiedSlots = ref([]);
const loadingSlots = ref(false);
const allSlotsOccupied = ref(false);

const formData = ref({
  nombre: '',
  telefono: '',
  pais: 'VE',
  motivo: ''
});

const phoneError = ref('');
const submitting = ref(false);
const confirmError = ref(null);

// Inicializar autenticación
onMounted(async () => {
  // Inicializar el store de Google
  await googleUserStore.initAuth();
  
  // Forzar restauración desde localStorage si hay datos guardados
  const savedName = localStorage.getItem('google_user_name');
  const savedEmail = localStorage.getItem('google_user_email');
  if (savedName && !googleUserStore.displayName) {
    googleUserStore.displayName = savedName;
  }
  if (savedEmail && !googleUserStore.email) {
    googleUserStore.email = savedEmail;
  }
  
  // Restaurar datos del localStorage
  restoreFromLocalStorage();
  
  // Si ya está autenticado, ir al paso de datos (0)
  // Si no, mostrar el paso de Google Sign-In
});

// Función para restaurar datos desde localStorage
function restoreFromLocalStorage() {
  const savedNombre = localStorage.getItem('paciente_nombre');
  const savedPais = localStorage.getItem('paciente_pais');
  const savedTelefono = localStorage.getItem('paciente_telefono');
  const savedMotivo = localStorage.getItem('paciente_motivo');
  
  if (savedNombre) formData.value.nombre = savedNombre;
  if (savedPais) formData.value.pais = savedPais;
  if (savedTelefono) formData.value.telefono = savedTelefono;
  if (savedMotivo) formData.value.motivo = savedMotivo;
  
  // Restaurar fecha y hora
  const savedFecha = localStorage.getItem('paciente_fecha');
  const savedHora = localStorage.getItem('paciente_hora');
  
  if (savedFecha) {
    selectedDate.value = new Date(savedFecha);
  }
  if (savedHora) {
    selectedHour.value = savedHora;
  }
}

const countries = [
  { code: 'VE', name: 'Venezuela', emoji: '🇻🇪', phoneCode: '58', phoneLength: 10 },
  { code: 'CO', name: 'Colombia', emoji: '🇨🇴', phoneCode: '57', phoneLength: 10 },
  { code: 'MX', name: 'México', emoji: '🇲🇽', phoneCode: '52', phoneLength: 10 },
  { code: 'AR', name: 'Argentina', emoji: '🇦🇷', phoneCode: '54', phoneLength: 10 },
  { code: 'CL', name: 'Chile', emoji: '🇨🇱', phoneCode: '56', phoneLength: 9 },
  { code: 'PE', name: 'Perú', emoji: '🇵🇪', phoneCode: '51', phoneLength: 9 },
  { code: 'US', name: 'Estados Unidos', emoji: '🇺🇸', phoneCode: '1', phoneLength: 10 },
  { code: 'ES', name: 'España', emoji: '🇪🇸', phoneCode: '34', phoneLength: 9 },
  { code: 'EC', name: 'Ecuador', emoji: '🇪🇨', phoneCode: '593', phoneLength: 9 },
];

const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const currentMonthDate = computed(() => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + currentMonthIndex.value, 1);
});

const monthStartDay = computed(() => {
  return currentMonthDate.value.getDay();
});

const monthDays = computed(() => {
  const days = [];
  const year = currentMonthDate.value.getFullYear();
  const month = currentMonthDate.value.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  return days;
});

const canGoPreviousMonth = computed(() => {
  return currentMonthIndex.value > 0;
});

const canGoNextMonth = computed(() => {
  return currentMonthIndex.value < 5;
});

const availableSlots = ref([]);

const availableHours = computed(() => {
  if (availableSlots.value.length > 0) {
    return availableSlots.value;
  }
  
  if (!selectedDate.value) return [];
  
  const dayOfWeek = selectedDate.value.getDay();
  const isThursday = dayOfWeek === 4;
  
  if (isThursday) {
    return ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'];
  }
  
  return ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
});

const fullPhoneNumber = computed(() => {
  const country = countries.find(c => c.code === formData.value.pais);
  const countryCode = country ? country.code : 'VE';
  const codeMap = {
    'VE': '+58',
    'CO': '+57',
    'MX': '+52',
    'AR': '+54',
    'CL': '+56',
    'PE': '+51',
    'US': '+1',
    'ES': '+34',
    'EC': '+593'
  };
  return `${codeMap[countryCode]}${formData.value.telefono}`;
});

const isFormValid = computed(() => {
  const nombreValido = formData.value.nombre && formData.value.nombre.trim().length > 0;
  const telefonoValido = formData.value.telefono && formData.value.telefono.trim().length > 0;
  const motivoValido = formData.value.motivo && formData.value.motivo.trim().length > 0;
  
  return nombreValido && telefonoValido && motivoValido && phoneError.value === '';
});

const phonePlaceholder = computed(() => {
  const country = countries.find(c => c.code === formData.value.pais);
  return country ? `Número (${country.phoneLength} dígitos)` : 'Número de teléfono';
});

const whatsappLink = computed(() => {
  const pais = formData.value.pais || 'VE';
  const country = countries.find(c => c.code === pais);
  const countryCode = country ? country.phoneCode : '58';
  let telefono = formData.value.telefono || '';
  
  // Número de WhatsApp del consultorio
  const consultorioPhone = '584248351017';
  
  // Obtener nombre del formulario o de localStorage
  const nombre = formData.value.nombre || localStorage.getItem('paciente_nombre') || '';
  
  // Si no hay nombre, no mostrar la parte del nombre
  const nombreTexto = nombre ? `Hola, me llamo ${nombre}. ` : 'Hola. ';
  
  const mensaje = encodeURIComponent(
    nombreTexto +
    `Quisiera confirmar mi cita para el ${formatFullDate(selectedDate.value)} a las ${selectedHour.value}. ` +
    `Mi teléfono es: +${countryCode}${telefono}. ` +
    `Motivo: ${formData.value.motivo}`
  );
  
  return `https://wa.me/${consultorioPhone}?text=${mensaje}`;
});

// Funciones de autenticación con Google
async function handleGoogleSignIn() {
  try {
    await googleUserStore.signInWithGoogle();
  } catch (error) {
    console.error('Error en Google Sign-In:', error);
  }
}

async function handleGoogleLogout() {
  try {
    await googleUserStore.logout();
    resetWizard();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
}

function goToDateSelection() {
  if (!isFormValid.value) return;
  
  // Guardar datos en localStorage
  localStorage.setItem('paciente_nombre', formData.value.nombre);
  localStorage.setItem('paciente_pais', formData.value.pais);
  localStorage.setItem('paciente_telefono', formData.value.telefono);
  localStorage.setItem('paciente_motivo', formData.value.motivo);
  
  // Ir al paso de selección de fecha
  currentStep.value = 1;
}

function validatePhone() {
  // Filtrar solo números
  const cleaned = formData.value.telefono.replace(/\D/g, '');
  formData.value.telefono = cleaned;
  
  const country = countries.find(c => c.code === formData.value.pais);
  if (country) {
    const cleanPhone = formData.value.telefono.replace(/\D/g, '');
    if (cleanPhone.length !== country.phoneLength) {
      phoneError.value = `El número debe tener ${country.phoneLength} dígitos`;
    } else {
      phoneError.value = '';
    }
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

function previousMonth() {
  if (currentMonthIndex.value > 0) {
    currentMonthIndex.value--;
  }
}

function nextMonth() {
  if (currentMonthIndex.value < 5) {
    currentMonthIndex.value++;
  }
}

function selectDay(date) {
  selectedDate.value = date;
  selectedHour.value = null;
  localStorage.setItem('paciente_fecha', date.toISOString());
  
  // Guardar datos del formulario antes de cambiar de paso
  localStorage.setItem('paciente_nombre', formData.value.nombre);
  localStorage.setItem('paciente_pais', formData.value.pais);
  localStorage.setItem('paciente_telefono', formData.value.telefono);
  localStorage.setItem('paciente_motivo', formData.value.motivo);
  
  currentStep.value = 2;
  
  loadOccupiedSlots(date);
}

async function loadOccupiedSlots(date) {
  if (!date) return;
  
  loadingSlots.value = true;
  occupiedSlots.value = [];
  allSlotsOccupied.value = false;
  
  try {
    const fechaStr = formatDateForAPI(date);
    const response = await fetch(`/api/v1/citas/slots?fecha=${fechaStr}`);
    
    if (response.ok) {
      const data = await response.json();
      
      const availableFromBackend = data.slots ? data.slots.map(slot => {
        const dateObj = new Date(slot);
        dateObj.setHours(dateObj.getHours() + 4);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      }) : [];
      
      availableSlots.value = availableFromBackend;
      
      const dayOfWeek = date.getDay();
      const isThursday = dayOfWeek === 4;
      const allPossibleHours = isThursday 
        ? ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM']
        : ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
      
      occupiedSlots.value = allPossibleHours.filter(h => !availableFromBackend.includes(h));
      
      if (availableFromBackend.length === 0) {
        allSlotsOccupied.value = true;
      }
    }
  } catch (error) {
    console.log('Error cargando horarios ocupados:', error);
  } finally {
    loadingSlots.value = false;
  }
}

function isSlotOccupied(horario) {
  const normalizeTime = (h) => {
    const match = h.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return h;
    let hours = parseInt(match[1]);
    const minutes = match[2];
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return `${hours}:${minutes}`;
  };
  
  const normalizedHorario = normalizeTime(horario);
  
  return occupiedSlots.value.some(slot => {
    const normalizedSlot = normalizeTime(slot);
    return normalizedHorario === normalizedSlot;
  });
}

function selectHour(horario) {
  if (isSlotOccupied(horario)) {
    return;
  }
  selectedHour.value = horario;
  localStorage.setItem('paciente_hora', horario);
  
  // Guardar datos del formulario antes de cambiar de paso
  localStorage.setItem('paciente_nombre', formData.value.nombre);
  localStorage.setItem('paciente_pais', formData.value.pais);
  localStorage.setItem('paciente_telefono', formData.value.telefono);
  localStorage.setItem('paciente_motivo', formData.value.motivo);
  
  currentStep.value = 3;
}

async function confirmAppointment() {
  submitting.value = true;
  confirmError.value = null;
  
  try {
    // Obtener el ID token de Firebase
    let idToken = null;
    if (googleUserStore.user) {
      try {
        idToken = await googleUserStore.user.getIdToken();
      } catch (e) {
        console.log('No se pudo obtener token de Firebase');
      }
    }
    
    // Preparar headers
    const headers = {
      'Content-Type': 'application/json'
    };
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }
    
    // Obtener datos
    const nombre = formData.value.nombre || localStorage.getItem('paciente_nombre');
    const email = googleUserStore.email;
    const pais = formData.value.pais;
    let telefono = formData.value.telefono;
    
    if (telefono && !telefono.startsWith('+')) {
      const country = countries.find(c => c.code === pais);
      const countryCode = country ? country.phoneCode : '58';
      telefono = `+${countryCode}${telefono}`;
    }
    const motivo = formData.value.motivo;
    
    const fecha = formatDateForAPI(selectedDate.value);
    
    const citaData = {
      fecha: fecha,
      horario: selectedHour.value,
      nombre: nombre,
      telefono: telefono,
      email: email,
      motivo: motivo
    };
    
    console.log('Enviando cita al backend:', JSON.stringify(citaData, null, 2));
    
    const response = await fetch('/api/v1/citas', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(citaData)
    });
    
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorMessage = `Error ${response.status}: `;
      
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage += errorData.detail || errorData.message || JSON.stringify(errorData);
      } else {
        const errorText = await response.text();
        errorMessage += errorText || 'Error desconocido';
      }
      throw new Error(errorMessage);
    }
    
    const responseData = await response.json();
    console.log('Respuesta del backend:', responseData);
    
    // Limpiar localStorage
    localStorage.removeItem('paciente_pais');
    localStorage.removeItem('paciente_telefono');
    localStorage.removeItem('paciente_motivo');
    localStorage.removeItem('paciente_fecha');
    localStorage.removeItem('paciente_hora');
    
    currentStep.value = 4;
    emit('cita-agendada');
    
  } catch (error) {
    console.error('Error al confirmar cita:', error);
    
    let mensaje = 'Error al confirmar la cita.';
    if (error.message) {
      mensaje = error.message;
    } else if (error.detail) {
      mensaje = error.detail;
    }
    
    confirmError.value = mensaje;
  } finally {
    submitting.value = false;
  }
}

function resetWizard() {
  currentStep.value = 0;
  selectedDate.value = null;
  selectedHour.value = null;
  formData.value = {
    nombre: '',
    telefono: '',
    pais: 'VE',
    motivo: ''
  };
  occupiedSlots.value = [];
  availableSlots.value = [];
  
  localStorage.removeItem('paciente_nombre');
  localStorage.removeItem('paciente_pais');
  localStorage.removeItem('paciente_telefono');
  localStorage.removeItem('paciente_motivo');
  localStorage.removeItem('paciente_fecha');
  localStorage.removeItem('paciente_hora');
}

// Funciones de utilidad
function getStepClass(index) {
  if (index < currentStep.value) {
    return 'bg-accent-500 text-white';
  } else if (index === currentStep.value) {
    return 'bg-accent-500 text-white ring-4 ring-accent-200';
  } else {
    return 'bg-gray-200 text-gray-600';
  }
}

function formatMonthYear(date) {
  return date.toLocaleDateString('es-VE', { month: 'long', year: 'numeric' });
}

function formatDayNumber(date) {
  return date.getDate();
}

function formatFullDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('es-VE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatDateForAPI(date) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;
  return date1.toDateString() === date2.toDateString();
}
</script>

<style scoped>
.wizard-container {
  max-width: 600px;
  margin: 0 auto;
}

.min-h-100 {
  min-height: 400px;
}

.step-enter {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-indicator {
  width: 40px;
  height: 40px;
  z-index: 10;
}

.step-label {
  white-space: nowrap;
}

.country-select {
  min-width: 80px;
}
</style>
