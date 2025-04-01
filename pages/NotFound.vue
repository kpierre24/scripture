<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" md="10" lg="8" class="text-center">
        <v-card>
          <v-card-title class="text-h3">404 - Page Not Found</v-card-title>
          <v-card-text>
            <p class="text-body-1">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p class="text-body-1">
              It might have been moved or deleted.
            </p>
            <v-btn color="primary" to="/">Go to Home</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
