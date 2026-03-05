// Utilidad para mostrar alerts personalizados
import { ref, h } from 'vue';

// Estado global del alert
const showAlert = ref(false);
const alertProps = ref({
  title: '',
  message: '',
  type: 'confirm'
});

// Resolver de la promesa
let alertResolve = null;

export function useAlert() {
  const show = (options) => {
    alertProps.value = {
      title: options.title || 'Confirmar',
      message: options.message || '¿Está seguro?',
      type: options.type || 'confirm'
    };
    showAlert.value = true;
    
    return new Promise((resolve) => {
      alertResolve = resolve;
    });
  };
  
  const confirm = (message, title = 'Confirmar') => {
    return show({ title, message, type: 'confirm' });
  };
  
  const success = (message, title = 'Éxito') => {
    return show({ title, message, type: 'success' });
  };
  
  const handleConfirm = () => {
    showAlert.value = false;
    if (alertResolve) {
      alertResolve(true);
      alertResolve = null;
    }
  };
  
  const handleCancel = () => {
    showAlert.value = false;
    if (alertResolve) {
      alertResolve(false);
      alertResolve = null;
    }
  };
  
  return {
    showAlert,
    alertProps,
    confirm,
    success,
    handleConfirm,
    handleCancel
  };
}

// Exportar funciones globales
export const alertService = {
  confirm: async (message, title = 'Confirmar') => {
    alertProps.value = { title, message, type: 'confirm' };
    showAlert.value = true;
    
    return new Promise((resolve) => {
      alertResolve = resolve;
    });
  },
  
  success: async (message, title = 'Éxito') => {
    alertProps.value = { title, message, type: 'success' };
    showAlert.value = true;
    
    return new Promise((resolve) => {
      alertResolve = resolve;
    });
  }
};

export function resolveAlert(accepted) {
  showAlert.value = false;
  if (alertResolve) {
    alertResolve(accepted);
    alertResolve = null;
  }
}

export { showAlert, alertProps };
