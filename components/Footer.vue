<template>
    <v-footer app>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p class="footer-text">&copy; {{ new Date().getFullYear() }} My Scripture App</p>
            <v-btn text to="/about" class="footer-btn">About</v-btn>
            <v-btn text to="/settings" class="footer-btn">Settings</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer-text {
    font-size: 0.8rem;
  }
  
  .footer-btn {
    font-size: 0.8rem;
    padding: 0 8px;
  }
  </style>
  