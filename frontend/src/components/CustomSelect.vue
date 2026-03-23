<template>
  <div 
    class="relative"
    :class="[sizeClasses, customClass]"
  >
    <!-- Botón que muestra el valor seleccionado -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full cursor-pointer bg-white border-2 border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all rounded-xl pr-6 md:pr-8 flex items-center justify-between"
      :class="paddingClasses"
    >
      <span :class="selectedOption ? 'text-gray-700' : 'text-gray-400'">
        {{ selectedOption?.label || placeholder }}
      </span>
      
      <!-- Flecha personalizada -->
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5 text-gray-400 transition-transform duration-200 ml-1 md:ml-2"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fill-rule="evenodd" 
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
          clip-rule="evenodd" 
        />
      </svg>
    </button>
    
    <!-- Dropdown con scroll interno -->
    <div 
      v-if="isOpen"
      class="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden"
      :class="dropdownMaxHeight"
    >
      <div class="overflow-y-auto h-full max-h-60">
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          @click="selectOption(option)"
          class="w-full px-4 py-3 text-left hover:bg-accent-50 flex items-center gap-3 transition-colors duration-150"
          :class="[
            option.value === modelValue 
              ? 'bg-accent-50 text-accent-700' 
              : 'text-gray-700'
          ]"
        >
          <!-- Radiobutton personalizado -->
          <span 
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            :class="option.value === modelValue ? 'border-accent-500 bg-accent-500' : 'border-gray-300'"
          >
            <svg 
              v-if="option.value === modelValue"
              xmlns="http://www.w3.org/2000/svg" 
              class="h-3 w-3 text-white" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fill-rule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clip-rule="evenodd" 
              />
            </svg>
          </span>
          
          <span class="text-sm">{{ option.label }}</span>
        </button>
      </div>
    </div>
    
    <!-- Overlay para cerrar al hacer click fuera -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-40"
      @click="isOpen = false"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'large'
  },
  customClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === props.modelValue)
})

const dropdownMaxHeight = computed(() => {
  switch (props.size) {
    case 'small':
      return 'max-h-64'
    case 'medium':
      return 'max-h-48'
    case 'large':
    default:
      return 'max-h-80'
  }
})

function selectOption(option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

// Cerrar dropdown al presionar Escape
function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-20 md:w-28'
    case 'medium':
      return 'w-full md:w-40 lg:w-48'
    case 'large':
    default:
      return 'w-full'
  }
})

const paddingClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'px-1 md:px-3 py-3 text-xs md:text-sm'
    case 'medium':
      return 'px-2 md:px-4 py-1.5 md:py-2 text-xs md:text-sm'
    case 'large':
    default:
      return 'px-4 py-3 text-sm md:text-base'
  }
})
</script>
