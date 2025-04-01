import { ref, computed } from 'vue';

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'light'); // Default to light

  const themeClass = computed(() => theme.value === 'dark' ? 'dark-theme' : '');

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme.value);
  };

  return { theme, themeClass, toggleTheme };
}
