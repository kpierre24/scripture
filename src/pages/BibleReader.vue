<template>
  <v-container>
    <!-- Bible Navigation -->
    <v-row>
      <v-col cols="12" sm="4">
        <v-select
          v-model="selectedBible"
          :items="availableBibles"
          item-title="name"
          item-value="id"
          label="Translation"
          @update:model-value="handleBibleChange"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="selectedBook"
          :items="books"
          item-title="name"
          item-value="id"
          label="Select Book"
          @update:model-value="loadChapters"
          :disabled="!selectedBible"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="selectedChapter"
          :items="chapters"
          label="Select Chapter"
          :disabled="!selectedBook"
          @update:model-value="loadVerses"
        />
      </v-col>
    </v-row>

    <!-- Scripture Content -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5 d-flex justify-space-between">
            {{ currentReference }}
            <v-btn-group v-if="selectedBook && selectedChapter">
              <v-btn
                icon="mdi-chevron-left"
                @click="previousChapter"
                :disabled="!canGoPrevious"
              />
              <v-btn
                icon="mdi-chevron-right"
                @click="nextChapter"
                :disabled="!canGoNext"
              />
            </v-btn-group>
          </v-card-title>

          <v-card-text>
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
              class="ma-4"
            />
            
            <div v-else-if="currentContent" class="scripture-content" v-html="currentContent"></div>

            <v-alert
              v-if="error"
              type="error"
              :text="error"
              class="mt-4"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { bibleService } from '@/services/bibleService'

export default {
  name: 'BibleReader',
  setup() {
    const selectedBible = ref(null)
    const selectedBook = ref(null)
    const selectedChapter = ref(null)
    const availableBibles = ref([])
    const books = ref([])
    const chapters = ref([])
    const currentContent = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    const currentReference = computed(() => {
      if (!selectedBook.value || !selectedChapter.value) return ''
      const book = books.value.find(b => b.id === selectedBook.value)
      return `${book?.name} ${selectedChapter.value}`
    })

    const canGoPrevious = computed(() => {
      return selectedChapter.value > 1
    })

    const canGoNext = computed(() => {
      if (!selectedBook.value) return false
      const book = books.value.find(b => b.id === selectedBook.value)
      return selectedChapter.value < book?.chapters
    })

    const loadBibles = async () => {
      try {
        isLoading.value = true
        error.value = null
        const bibles = await bibleService.getBibles()
        availableBibles.value = bibles
        // Set default Bible (e.g., KJV or first available)
        if (bibles.length > 0) {
          selectedBible.value = bibles[0].id
          await loadBooks()
        }
      } catch (err) {
        error.value = 'Failed to load Bible translations'
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }

    const loadBooks = async () => {
      if (!selectedBible.value) return
      try {
        isLoading.value = true
        error.value = null
        const booksList = await bibleService.getBooks(selectedBible.value)
        books.value = booksList
      } catch (err) {
        error.value = 'Failed to load books'
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }

    const loadChapters = async () => {
      if (!selectedBook.value || !selectedBible.value) return
      try {
        isLoading.value = true
        error.value = null
        const chaptersData = await bibleService.getChapters(selectedBible.value, selectedBook.value)
        // Create an array of chapter numbers based on the length of returned chapters
        chapters.value = Array.from({ length: chaptersData.length }, (_, i) => i + 1)
        selectedChapter.value = 1
        await loadVerses()
      } catch (err) {
        error.value = 'Failed to load chapters'
        console.error('Failed to load chapters:', err)
      } finally {
        isLoading.value = false
      }
    }

    const loadVerses = async () => {
      if (!selectedBook.value || !selectedChapter.value || !selectedBible.value) return
      try {
        isLoading.value = true
        error.value = null
        const chapterId = `${selectedBook.value}.${selectedChapter.value}`
        const chapterData = await bibleService.getChapter(selectedBible.value, chapterId)
        currentContent.value = chapterData.content
      } catch (err) {
        error.value = 'Failed to load verses'
        console.error('Failed to load verses:', err)
      } finally {
        isLoading.value = false
      }
    }

    const handleBibleChange = async () => {
      selectedBook.value = null
      selectedChapter.value = null
      currentContent.value = null
      await loadBooks()
    }

    const previousChapter = async () => {
      if (canGoPrevious.value) {
        selectedChapter.value--
        await loadVerses()
      }
    }

    const nextChapter = async () => {
      if (canGoNext.value) {
        selectedChapter.value++
        await loadVerses()
      }
    }

    onMounted(async () => {
      await loadBibles()
    })

    return {
      selectedBible,
      selectedBook,
      selectedChapter,
      availableBibles,
      books,
      chapters,
      currentContent,
      currentReference,
      isLoading,
      error,
      canGoPrevious,
      canGoNext,
      handleBibleChange,
      loadChapters,
      loadVerses,
      previousChapter,
      nextChapter
    }
  }
}
</script>

<style scoped>
.scripture-content {
  font-size: 1.1rem;
  line-height: 1.8;
  padding: 1rem;
}

.scripture-content :deep(p) {
  margin-bottom: 1rem;
}

.scripture-content :deep(.verse-number) {
  font-weight: bold;
  margin-right: 0.5rem;
  color: var(--v-primary-base);
}
</style> 