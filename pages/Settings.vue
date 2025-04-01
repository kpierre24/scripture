<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Settings</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>Dark Mode</v-list-item-title>
                <v-list-item-action>
                  <v-switch v-model="darkMode" @change="toggleDarkMode"></v-switch>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Notifications</v-list-item-title>
                <v-list-item-action>
                  <v-switch v-model="notificationsEnabled"></v-switch>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Font Size</v-list-item-title>
                <v-list-item-action>
                  <v-select
                    v-model="fontSize"
                    :items="fontSizes"
                    variant="outlined"
                    density="compact"
                  ></v-select>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      darkMode: false, // Default to light mode
      notificationsEnabled: true, // Default to notifications on
      fontSize: "Medium", // Default font size
      fontSizes: ["Small", "Medium", "Large"],
    };
  },
  methods: {
    toggleDarkMode() {
      // Implement dark mode logic here (e.g., change CSS classes)
      console.log("Dark mode toggled:", this.darkMode);
      // You might want to use a global state management solution (like Vuex or Pinia)
      // to share the dark mode state across your app.
      if (this.darkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
  },
};
</script>

<style scoped>
.dark-mode {
  background-color: #333;
  color: #eee;
}
</style>
