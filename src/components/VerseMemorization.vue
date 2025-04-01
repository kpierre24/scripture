<template>
  <v-card>
    <v-card-title>Verse Memorization</v-card-title>
    <v-card-text>
      <div v-if="currentVerse" class="memory-verse">
        <div class="verse-text mb-4">
          <span 
            v-for="(word, index) in verseWords" 
            :key="index"
            :class="{ 'hidden': hiddenWords.includes(index) }"
            class="verse-word"
          >
            {{ word }}
          </span>
        </div>
        
        <v-btn-group>
          <v-btn
            color="primary"
            @click="hideRandomWords"
          >
            Hide More Words
          </v-btn>
          <v-btn
            color="secondary"
            @click="revealWords"
          >
            Reveal All
          </v-btn>
          <v-btn
            color="success"
            @click="nextVerse"
          >
            Next Verse
          </v-btn>
        </v-btn-group>
      </div>
    </v-card-text>
  </v-card>
</template> 