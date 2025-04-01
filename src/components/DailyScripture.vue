<template>
  <v-card class="daily-scripture" :style="cardStyle">
    <div class="overlay">
      <v-card-title class="text-h4 text-white text-center mb-4">
        Daily Scripture
      </v-card-title>

      <v-card-text class="text-center">
        <div v-if="isLoading" class="d-flex justify-center align-center" style="min-height: 200px">
          <v-progress-circular indeterminate color="white"></v-progress-circular>
        </div>

        <template v-else-if="dailyVerse">
          <p class="text-h5 text-white font-weight-medium mb-4" v-html="dailyVerse.text">
          </p>
          <p class="text-h6 text-white font-weight-regular">
            - {{ dailyVerse.reference }}
          </p>

          <v-row class="mt-6" justify="center">
            <v-col cols="auto">
              <v-btn
                :color="isFavorite ? 'error' : 'white'"
                variant="outlined"
                class="text-white"
                :prepend-icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="toggleFavorite"
              >
                {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                color="white"
                variant="outlined"
                class="text-white"
                prepend-icon="mdi-share"
                @click="showShareDialog = true"
              >
                Share
              </v-btn>
            </v-col>
          </v-row>
        </template>

        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          class="mt-4"
        >
          {{ error }}
        </v-alert>
      </v-card-text>
    </div>

    <!-- Share Dialog -->
    <v-dialog v-model="showShareDialog" max-width="400">
      <v-card>
        <v-card-title>Share Daily Verse</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="option in shareOptions"
              :key="option.id"
              @click="handleShare(option.id)"
              :prepend-icon="option.icon"
              :title="option.title"
              :subtitle="option.subtitle"
            >
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="showShareDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { bibleService } from '@/services/bibleService'
import { useFavoritesStore } from '@/stores/favorites'

export default {
  name: 'DailyScripture',
  setup() {
    const dailyVerse = ref(null)
    const isLoading = ref(true)
    const error = ref(null)
    const showShareDialog = ref(false)
    const favoritesStore = useFavoritesStore()
    const backgroundImage = ref('')

    const snackbar = ref({
      show: false,
      text: '',
      color: 'success'
    })

    const shareOptions = [
      {
        id: 'copy',
        title: 'Copy to Clipboard',
        subtitle: 'Copy verse text and reference',
        icon: 'mdi-content-copy'
      },
      {
        id: 'whatsapp',
        title: 'Share on WhatsApp',
        subtitle: 'Send via WhatsApp',
        icon: 'mdi-whatsapp'
      },
      {
        id: 'twitter',
        title: 'Share on Twitter',
        subtitle: 'Post to Twitter',
        icon: 'mdi-twitter'
      },
      {
        id: 'email',
        title: 'Share via Email',
        subtitle: 'Send in an email',
        icon: 'mdi-email'
      }
    ]

    const cardStyle = computed(() => ({
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage.value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '400px'
    }))

    const isFavorite = computed(() => {
      if (!dailyVerse.value) return false
      return favoritesStore.isFavorite(dailyVerse.value)
    })

    const showNotification = (text, color = 'success') => {
      snackbar.value = {
        show: true,
        text,
        color
      }
    }

    const loadDailyVerse = async () => {
      try {
        isLoading.value = true
        error.value = null

        // Check if we already have today's verse
        const storedVerse = localStorage.getItem('dailyVerse')
        const storedDate = localStorage.getItem('dailyVerseDate')
        const today = new Date().toDateString()

        if (storedDate === today && storedVerse) {
          dailyVerse.value = JSON.parse(storedVerse)
        } else {
          // Initialize Bible service and get available Bibles
          const bibles = await bibleService.getBibles()
          if (bibles && bibles.length > 0) {
            // Use the first available Bible (usually KJV)
            const bibleId = bibles[0].id
            // Get random verse
            const verse = await bibleService.getRandomVerse(bibleId)
            dailyVerse.value = verse
            // Store for today
            localStorage.setItem('dailyVerse', JSON.stringify(verse))
            localStorage.setItem('dailyVerseDate', today)
          } else {
            throw new Error('No Bible translations available')
          }
        }

        // Load a random background image
        backgroundImage.value = `https://source.unsplash.com/1600x900/?nature,landscape`
      } catch (err) {
        error.value = 'Failed to load daily verse: ' + (err.message || 'Unknown error')
        console.error('Failed to load daily verse:', err)
      } finally {
        isLoading.value = false
      }
    }

    const toggleFavorite = () => {
      if (!dailyVerse.value) return

      if (isFavorite.value) {
        favoritesStore.removeFavorite(dailyVerse.value)
        showNotification('Removed from favorites')
      } else {
        favoritesStore.addFavorite(dailyVerse.value)
        showNotification('Added to favorites')
      }
    }

    const handleShare = async (method) => {
      if (!dailyVerse.value) return

      const shareText = `${dailyVerse.value.text} - ${dailyVerse.value.reference}`

      switch (method) {
        case 'copy':
          try {
            await navigator.clipboard.writeText(shareText)
            showNotification('Verse copied to clipboard')
          } catch (err) {
            showNotification('Failed to copy verse', 'error')
          }
          break

        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`)
          break

        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`)
          break

        case 'email':
          window.location.href = `mailto:?subject=Daily Bible Verse&body=${encodeURIComponent(shareText)}`
          break
      }

      showShareDialog.value = false
    }

    onMounted(() => {
      loadDailyVerse()
    })

    return {
      dailyVerse,
      isLoading,
      error,
      showShareDialog,
      snackbar,
      shareOptions,
      cardStyle,
      isFavorite,
      toggleFavorite,
      handleShare
    }
  }
}
</script>

<style scoped>
.daily-scripture {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.daily-scripture:hover {
  transform: translateY(-4px);
}

.overlay {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-white {
  color: white !important;
}
</style> 