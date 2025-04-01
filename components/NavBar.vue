<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title>Scripture App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { useTheme } from '@/composables/useTheme';
import { ref } from 'vue';

export default {
  name: 'NavBar',
  setup(props, { emit }) {
    const { theme, themeClass, toggleTheme } = useTheme();
    return { theme, themeClass, toggleTheme };
  },
};
</script>
