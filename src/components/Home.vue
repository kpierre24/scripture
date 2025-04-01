<template>
    <v-container fluid class="home-container pa-4">
      <!-- Welcome Section -->
      <v-row class="mb-6">
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold text-center mb-2">
            Welcome to Bible App
          </h1>
          <p class="text-subtitle-1 text-center">
            Discover, study, and share God's Word daily
          </p>
        </v-col>
      </v-row>
  
      <!-- Daily Scripture and Study Tools Row -->
      <v-row class="mb-8">
        <v-col cols="12" md="6">
          <daily-scripture />
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <study-timer />
            </v-col>
            <v-col cols="12">
              <reading-progress />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  
      <!-- Navigation Grid -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/read"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-book-open-page-variant
              </v-icon>
              <v-card-title class="text-h6">Bible Reader</v-card-title>
              <v-card-subtitle>
                Read and study the Bible in multiple translations
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/search"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-magnify
              </v-icon>
              <v-card-title class="text-h6">Search Scripture</v-card-title>
              <v-card-subtitle>
                Search through the Bible by keywords or phrases
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/topics"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-bookmark-multiple
              </v-icon>
              <v-card-title class="text-h6">Topics</v-card-title>
              <v-card-subtitle>
                Organize verses by themes and topics
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/reading-plans"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-book-clock
              </v-icon>
              <v-card-title class="text-h6">Reading Plans</v-card-title>
              <v-card-subtitle>
                Follow structured Bible reading plans
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/prayer-journal"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-notebook
              </v-icon>
              <v-card-title class="text-h6">Prayer Journal</v-card-title>
              <v-card-subtitle>
                Keep track of your prayers and answered prayers
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/notes"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-pencil-box
              </v-icon>
              <v-card-title class="text-h6">Study Notes</v-card-title>
              <v-card-subtitle>
                Create and organize your Bible study notes
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/favorites"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-heart
              </v-icon>
              <v-card-title class="text-h6">Favorites</v-card-title>
              <v-card-subtitle>
                Access your favorite verses and passages
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/verse-memorization"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-brain
              </v-icon>
              <v-card-title class="text-h6">Verse Memorization</v-card-title>
              <v-card-subtitle>
                Memorize and practice Bible verses
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            to="/audio-bible"
            class="nav-card"
            elevation="2"
            height="200"
          >
            <v-card-item>
              <v-icon
                class="mb-4"
                color="primary"
                size="48"
              >
                mdi-headphones
              </v-icon>
              <v-card-title class="text-h6">Audio Bible</v-card-title>
              <v-card-subtitle>
                Listen to the Bible being read
              </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import DailyScripture from '@/components/DailyScripture.vue'
  import StudyTimer from '@/components/StudyTimer.vue'
  import ReadingProgress from '@/components/ReadingProgress.vue'
  
  export default defineComponent({
    name: 'Home',
    components: {
      DailyScripture,
      StudyTimer,
      ReadingProgress
    }
  })
  </script>
  
  <style scoped>
  .home-container {
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .nav-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  
  .nav-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }
  
  .v-card-title {
    font-size: 1.25rem !important;
    font-weight: 600 !important;
  }
  
  .v-card-subtitle {
    opacity: 0.8;
    line-height: 1.4;
  }
  
  .v-icon {
    opacity: 0.9;
  }
  </style>