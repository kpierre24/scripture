<template>
  <v-card class="study-timer">
    <v-card-title class="d-flex justify-space-between align-center">
      Study Timer
      <v-btn
        :color="isRunning ? 'error' : 'primary'"
        @click="toggleTimer"
      >
        {{ isRunning ? 'Stop' : 'Start' }}
      </v-btn>
    </v-card-title>
    <v-card-text class="text-center">
      <div class="text-h2 mb-4">{{ formattedTime }}</div>
      <v-chip-group>
        <v-chip
          v-for="preset in timePresets"
          :key="preset"
          @click="setTimer(preset)"
        >
          {{ preset }} min
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template> 