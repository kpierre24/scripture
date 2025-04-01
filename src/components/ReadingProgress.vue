<template>
  <v-card class="reading-progress">
    <v-card-title class="d-flex justify-space-between align-center">
      Reading Progress
      <v-btn
        color="primary"
        variant="text"
        @click="resetProgress"
      >
        Reset
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-progress-linear
        :model-value="progress"
        color="primary"
        height="20"
        rounded
      >
        <template v-slot:default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>

      <v-list class="mt-4">
        <v-list-item v-for="book in recentlyRead" :key="book.id">
          <template v-slot:prepend>
            <v-icon :color="book.completed ? 'success' : 'primary'">
              {{ book.completed ? 'mdi-check-circle' : 'mdi-book-open' }}
            </v-icon>
          </template>
          <v-list-item-title>{{ book.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ book.progress }}% completed
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ReadingProgress',
  setup() {
    // Add your progress tracking logic here
  }
}
</script> 