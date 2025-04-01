<template>
  <v-card>
    <v-card-title>Audio Bible</v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="12">
          <div class="text-center mb-4">
            {{ currentPassage }}
          </div>
          <v-slider
            v-model="progress"
            :max="duration"
            @change="seekTo"
          ></v-slider>
          <div class="d-flex justify-space-between">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </v-col>
      </v-row>
      
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn-group>
            <v-btn icon="mdi-rewind-10" @click="rewind"></v-btn>
            <v-btn
              :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"
              @click="togglePlay"
              color="primary"
            ></v-btn>
            <v-btn icon="mdi-fast-forward-10" @click="forward"></v-btn>
          </v-btn-group>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template> 