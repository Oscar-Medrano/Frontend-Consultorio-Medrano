<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <div class="text-center mb-8">
        <div class="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800">Panel de Administración</h1>
        <p class="text-gray-600 mt-2">Ingrese la contraseña para continuar</p>
      </div>
      
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Ingrese la contraseña"
            class="input-field"
          />
        </div>
        
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="btn-primary w-full flex justify-center items-center"
        >
          <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <router-link to="/" class="text-primary-500 hover:text-primary-600 text-sm">
          ← Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/api';

const router = useRouter();
const password = ref('');
const loading = ref(false);
const error = ref('');

const login = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await authService.login(password.value);
    const token = response.data.token;
    
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', 'true');
    
    router.push('/admin/dashboard');
  } catch (e) {
    if (e.response?.status === 429) {
      error.value = 'Demasiados intentos. Por favor espere 15 minutos.';
    } else if (e.response?.status === 401) {
      error.value = 'Contraseña incorrecta';
    } else {
      error.value = e.response?.data?.error || 'Error al iniciar sesión';
    }
  } finally {
    loading.value = false;
  }
};
</script>
