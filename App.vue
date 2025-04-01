<template>
  <v-app :class="themeClass">
    <NavBar @toggleTheme="toggleTheme" />
    <v-main>
      <v-container fluid class="pa-4">
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { useTheme } from '@/composables/useTheme';

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
  setup() {
    const { themeClass, toggleTheme } = useTheme();
    return { themeClass, toggleTheme };
  },
};
</script>

<style>
body.dark-theme {
  background-color: #333;
  color: #fff;
}
</style>
