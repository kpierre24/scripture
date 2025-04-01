<template>
  <v-card class="search-scripture">
    <v-card-title>Search Scriptures</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="performSearch">
        <v-row>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedBible"
              :items="availableBibles"
              item-title="name"
              item-value="id"
              label="Select Translation"
              @update:model-value="loadBibleData"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="searchQuery"
              label="Search the Bible"
              prepend-inner-icon="mdi-magnify"
              clearable
              :loading="isLoading"
              @keyup.enter="performSearch"
            >
              <template v-slot:append>
                <v-btn
                  color="primary"
                  :loading="isLoading"
                  @click="performSearch"
                >
                  Search
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>

      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        class="mt-4"
      >
        {{ error }}
      </v-alert>

      <div v-if="searchResults.length > 0" class="search-results mt-4">
        <v-list>
          <v-list-item
            v-for="result in searchResults"
            :key="result.id"
            class="mb-4"
          >
            <template v-slot:prepend>
              <v-icon color="primary">mdi-book-open-page-variant</v-icon>
            </template>
            <v-list-item-title class="mb-2">{{ result.reference }}</v-list-item-title>
            <v-list-item-subtitle>{{ result.text }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </div>

      <div v-else-if="!isLoading && searchQuery && !error" class="text-center pa-4">
        <v-icon size="64" color="grey">mdi-file-search</v-icon>
        <p class="text-h6 mt-4">No results found</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref, onMounted } from 'vue'
import { bibleService } from '@/services/bibleService'

export default {
  name: 'SearchScripture',
  setup() {
    const searchQuery = ref('')
    const searchResults = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const selectedBible = ref(null)
    const availableBibles = ref([])

    const loadBibleData = async () => {
      try {
        isLoading.value = true
        error.value = null
        const bibles = await bibleService.getBibles()
        availableBibles.value = bibles
        if (bibles.length > 0 && !selectedBible.value) {
          selectedBible.value = bibles[0].id // Default to first Bible
        }
      } catch (err) {
        error.value = 'Failed to load Bible translations'
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }

    const performSearch = async () => {
      if (!searchQuery.value.trim() || !selectedBible.value) return

      try {
        isLoading.value = true
        error.value = null
        const results = await bibleService.searchVerses(
          searchQuery.value,
          selectedBible.value
        )
        searchResults.value = results || []
      } catch (err) {
        error.value = 'Search failed. Please try again.'
        console.error(err)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      loadBibleData()
    })

    return {
      searchQuery,
      searchResults,
      isLoading,
      error,
      selectedBible,
      availableBibles,
      performSearch,
      loadBibleData
    }
  }
}
</script>

<style scoped>
.search-results {
  max-height: 600px;
  overflow-y: auto;
}

:deep(.v-list-item-subtitle) {
  white-space: normal !important;
  margin-top: 0.5rem;
}

.search-scripture {
  min-height: 200px;
}
</style> 