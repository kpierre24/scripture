<template>
  <v-container
    fluid
    class="fill-height home-container"
    :style="cardStyle"
  >
    <v-overlay :model-value="true" class="bg-black-lighten-2" />
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="10" lg="8">
        <v-card class="mx-auto home-card">
          <v-card-title class="text-h3 text-center font-weight-bold mb-4 primary--text">
            Welcome to Our Sanctuary of Scripture
          </v-card-title>
          <v-card-text>
            <div class="mb-6" v-if="dailyScripture">
              <p class="text-h5 font-weight-bold mb-2 primary--text">Verse of the Day</p>
              <v-card class="pa-4 verse-of-the-day-card">
                <div class="text-body-1 font-italic">
                  <verse-highlight
                    :verse-text="dailyScripture.text"
                    :verse-id="dailyScripture.id"
                  />
                </div>
                <div class="text-subtitle-1 font-weight-bold">
                  {{ dailyScripture.reference }}
                </div>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="white"
                    variant="outlined"
                    class="text-white"
                    :prepend-icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
                    @click="addToFavorites"
                  >
                    {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
                  </v-btn>
                  <v-btn
                    color="white"
                    variant="outlined"
                    class="text-white ml-2"
                    prepend-icon="mdi-share"
                    @click="shareVerse"
                  >
                    Share
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
            <div v-else>
              <p>Loading verse of the day...</p>
            </div>
            <p class="text-body-1 mb-4">
              <span class="font-weight-bold primary--text">Find solace and inspiration</span> in
              the timeless wisdom of scripture. Our app is designed to be a
              peaceful retreat where you can connect with God's Word, reflect on
              its teachings, and grow in your faith.
            </p>
            <p class="text-body-1 mb-4">
              <span class="font-weight-bold primary--text">Begin Your Daily Reflection:</span>
              Each day, a new scripture awaits you, accompanied by a serene
              background image. Take a moment to meditate on the verse and
              discover its meaning for your life.
            </p>
            <p class="text-body-1 mb-4">
              <span class="font-weight-bold primary--text">Explore Our Community:</span>
            </p>
            <v-list class="transparent-list">
              <v-list-item to="/daily-scripture" class="list-item">
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">mdi-calendar</v-icon>
                </template>
                <v-list-item-title class="text-body-1 font-weight-bold"
                  >Daily Scripture</v-list-item-title
                >
                <v-list-item-subtitle class="text-body-2"
                  >Receive a new verse and serene background each
                  day.</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item to="/search" class="list-item">
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">mdi-magnify</v-icon>
                </template>
                <v-list-item-title class="text-body-1 font-weight-bold"
                  >Search</v-list-item-title
                >
                <v-list-item-subtitle class="text-body-2"
                  >Find specific scriptures by keyword or
                  reference.</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item to="/favorites" class="list-item">
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">mdi-heart</v-icon>
                </template>
                <v-list-item-title class="text-body-1 font-weight-bold"
                  >Favorites</v-list-item-title
                >
                <v-list-item-subtitle class="text-body-2"
                  >Save your most cherished verses for quick
                  access.</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item to="/topics" class="list-item">
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">mdi-book-open-variant</v-icon>
                </template>
                <v-list-item-title class="text-body-1 font-weight-bold"
                  >Topics</v-list-item-title
                >
                <v-list-item-subtitle class="text-body-2"
                  >Explore scriptures organized by various
                  themes.</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item to="/reading-plans" class="list-item">
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">mdi-book-clock</v-icon>
                </template>
                <v-list-item-title class="text-body-1 font-weight-bold">Reading Plans</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">Follow structured Bible reading plans.</v-list-item-subtitle>
              </v-list-item>
              <v-list-item to="/prayer-journal" class="list-item">
                <template v-slot:prepend>
                  <v-icon color="primary" size="large">mdi-notebook</v-icon>
                </template>
                <v-list-item-title class="text-body-1 font-weight-bold">Prayer Journal</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">Track your prayers and answered prayers.</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Share Dialog -->
    <v-dialog v-model="shareDialog" max-width="500px">
      <v-card>
        <v-card-title>Share Verse</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="option in shareOptions"
              :key="option.id"
              @click="handleShare(option.id)"
            >
              <template v-slot:prepend>
                <v-icon :color="option.color">{{ option.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ option.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="shareDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          color="white"
          text
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { backgrounds, getDailyIndex } from "@/utils/helpers";
import { useScriptures } from "@/composables/useScriptures";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { ref, onMounted, computed } from "vue";
import axios from 'axios'
import VerseHighlight from '@/components/VerseHighlight.vue'
import { useFavoritesStore } from '@/stores/favorites'

export default {
  name: "Home",
  components: {
    VerseHighlight
  },
  setup() {
    const { allScriptures, loadScriptures } = useScriptures();
    const { toggleFavorite, isFavorite } = useLocalStorage();
    const backgroundImage = ref('')
    const dailyScripture = ref(null)
    const isLoading = ref(true)
    const errorMessage = ref(null)
    const favoritesStore = useFavoritesStore()
    const shareDialog = ref(false)
    const snackbar = ref({
      show: false,
      text: '',
      color: 'success'
    })

    // Replace with your Unsplash API key
    const UNSPLASH_API_KEY = 'rgeiGspK0-hVMUmZmQUc3l0g8wwuNPONoZdvX529ALQ'
    
    const fetchBackgroundImage = async () => {
      try {
        isLoading.value = true
        const response = await axios.get(
          'https://api.unsplash.com/photos/random', {
          params: {
            query: 'nature,landscape,spiritual',
            orientation: 'landscape',
            content_filter: 'high',
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`
          }
        })
        
        backgroundImage.value = response.data.urls.regular
        // Cache the image URL for today
        localStorage.setItem('dailyBackground', backgroundImage.value)
        localStorage.setItem('backgroundDate', new Date().toDateString())
      } catch (error) {
        console.error('Failed to fetch background:', error)
        // Fallback to a default image
        backgroundImage.value = 'https://images.unsplash.com/photo-1501820488136-72669149e0d4'
        errorMessage.value = 'Failed to load background image'
      } finally {
        isLoading.value = false
      }
    }

    const loadDailyBackground = async () => {
      const cachedDate = localStorage.getItem('backgroundDate')
      const today = new Date().toDateString()
      
      // Check if we already have today's background
      if (cachedDate === today) {
        const cachedBackground = localStorage.getItem('dailyBackground')
        if (cachedBackground) {
          backgroundImage.value = cachedBackground
          return
        }
      }
      
      // If not, fetch new background
      await fetchBackgroundImage()
    }

    const cardStyle = computed(() => ({
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage.value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '400px',
      opacity: isLoading.value ? 0.7 : 1,
      transition: 'opacity 0.3s ease'
    }))

    const updateDailyScripture = () => {
      const scriptureIndex = getDailyIndex(allScriptures.value);
      dailyScripture.value = allScriptures.value[scriptureIndex];
    };

    const shareOptions = [
      { id: 'copy', title: 'Copy to Clipboard', icon: 'mdi-content-copy', color: 'grey' },
      { id: 'whatsapp', title: 'Share on WhatsApp', icon: 'mdi-whatsapp', color: 'green' },
      { id: 'twitter', title: 'Share on Twitter', icon: 'mdi-twitter', color: 'blue' },
      { id: 'email', title: 'Share via Email', icon: 'mdi-email', color: 'red' }
    ]

    const showSnackbar = (text, color = 'success') => {
      snackbar.value = {
        show: true,
        text,
        color
      }
    }

    const addToFavorites = () => {
      if (isFavorite(dailyScripture.value)) {
        favoritesStore.removeFavorite(dailyScripture.value)
        showSnackbar('Removed from favorites')
      } else {
        favoritesStore.addFavorite(dailyScripture.value)
        showSnackbar('Added to favorites')
      }
    }

    const shareVerse = () => {
      shareDialog.value = true
    }

    const handleShare = async (method) => {
      const verseText = `${dailyScripture.value.text} - ${dailyScripture.value.reference}`
      
      switch (method) {
        case 'copy':
          try {
            await navigator.clipboard.writeText(verseText)
            showSnackbar('Verse copied to clipboard')
          } catch (error) {
            showSnackbar('Failed to copy verse', 'error')
          }
          break

        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(verseText)}`)
          break

        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(verseText)}`)
          break

        case 'email':
          window.location.href = `mailto:?subject=Daily Bible Verse&body=${encodeURIComponent(verseText)}`
          break
      }

      shareDialog.value = false
    }

    const loadDailyScripture = async () => {
      try {
        await loadScriptures();
        updateDailyScripture();
      } catch (error) {
        console.error('Failed to load scripture:', error);
        // Add user-friendly error message
      }
    };

    onMounted(async () => {
      await loadDailyBackground()
    })

    return {
      dailyScripture,
      cardStyle,
      isLoading,
      errorMessage,
      toggleFavorite,
      isFavorite,
      shareOptions,
      snackbar,
      shareDialog,
      addToFavorites,
      shareVerse,
      handleShare,
      loadDailyScripture,
    };
  },
};
</script>

<style scoped>
/* General Styling */
.home-container {
  background-color: #f5f5f5; /* Light gray background */
  position: relative; /* For positioning overlay */
  overflow: hidden; /* Prevent content from overflowing */
}

.home-card {
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent white card */
  color: #333;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-radius: 10px;
  padding: 20px; /* Add some padding */
  margin-bottom: 20px; /* Add some spacing */
}

.text-h3 {
  font-size: 2.5rem; /* Larger heading */
  margin-bottom: 1rem;
}

.text-h5 {
  font-size: 1.5rem; /* Larger subheading */
  margin-bottom: 0.5rem;
}

.text-body-1 {
  line-height: 1.6;
  font-size: 1.1rem; /* Slightly larger body text */
  color: #555; /* Darker gray text */
}

.verse-of-the-day-card {
  background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent white card */
  border-radius: 8px;
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 15px;
}

.verse-of-the-day-card .text-body-1 {
  font-style: italic; /* Italicize the verse text */
  font-size: 1.2rem; /* Slightly larger verse text */
  margin-bottom: 0.5rem;
}

.verse-of-the-day-card .text-subtitle-1 {
  font-style: normal; /* Normal font style for reference */
  font-weight: bold;
}

.v-card-actions {
  justify-content: flex-end; /* Align buttons to the right */
}

.v-btn {
  margin-left: 10px; /* Add spacing between buttons */
}

.transparent-list .v-list-item {
  background-color: transparent;
  padding: 10px 0; /* Add some padding */
  border-bottom: 1px solid #eee; /* Add a subtle bottom border */
}

.transparent-list .v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.transparent-list .v-list-item .v-icon {
  margin-right: 10px; /* Add spacing between icon and text */
}

/* Responsive Design */
@media (max-width: 600px) {
  .text-h3 {
    font-size: 2rem;
  }
  .text-h5 {
    font-size: 1.2rem;
  }
  .text-body-1 {
    font-size: 1rem;
  }
}
.verse-of-the-day-card {
  /* ... other styles ... */
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Add transitions */
}

.verse-of-the-day-card:hover {
  background-color: rgba(255, 255, 255, 0.9); /* Slightly brighter on hover */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2); /* More prominent shadow on hover */
}

.transparent-list .v-list-item {
  /* ... other styles ... */
  transition: background-color 0.2s ease-in-out; /* Add transition */
}

.transparent-list .v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Darker gray on hover */
  /* ... other styles ... */
}

/* Add more transitions as needed */
.home-card {
  transition: transform 0.2s ease-in-out; /* Add transition for transform */
}

.home-card:hover {
  transform: scale(1.02); /* Slightly larger on hover */
  /* ... other styles ... */
}

/* Add dark mode support */
.home-container.theme--dark {
  background-color: #121212;
}

/* Add loading skeleton */
.verse-skeleton {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
}

/* Add to existing styles */
.daily-scripture-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

/* Add smooth transition for background changes */
.daily-scripture-card {
  background-transition: background-image 0.5s ease-in-out;
}
</style>
