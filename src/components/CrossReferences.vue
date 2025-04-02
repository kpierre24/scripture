<template>
  <v-card>
    <v-card-title>Cross References & Commentary</v-card-title>
    <v-card-text>
      <v-tabs v-model="activeTab">
        <v-tab value="cross-refs">Cross References</v-tab>
        <v-tab value="commentary">Commentary</v-tab>
      </v-tabs>
      
      <v-window v-model="activeTab">
        <v-window-item value="cross-refs">
          <div v-if="isLoading" class="d-flex justify-center pa-4">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>

          <v-alert
            v-else-if="error"
            type="error"
            text="Failed to load cross references"
            class="mt-4"
          ></v-alert>

          <v-list v-else-if="crossReferences.length > 0">
            <v-list-item
              v-for="ref in crossReferences"
              :key="ref.id"
              :subtitle="ref.text"
              class="mb-2"
              @click="navigateToReference(ref)"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-link-variant</v-icon>
              </template>
              <v-list-item-title>{{ ref.reference }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-alert
            v-else
            type="info"
            text="No cross references found for this verse"
            class="mt-4"
          ></v-alert>
        </v-window-item>
        
        <v-window-item value="commentary">
          <div class="commentary-content pa-4">
            <p class="text-body-1">
              Commentary feature coming soon. This will include historical context,
              interpretations, and study notes.
            </p>
          </div>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref, watch } from 'vue'
import { bibleService } from '@/services/bibleService'
import { useRouter } from 'vue-router'

export default {
  name: 'CrossReferences',
  props: {
    verseReference: {
      type: String,
      required: true
    },
    selectedBible: {
      type: String,
      required: true
    },
    verseId: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const router = useRouter()
    const activeTab = ref('cross-refs')
    const isLoading = ref(false)
    const error = ref(null)
    const crossReferences = ref([])

    const loadCrossReferences = async () => {
      try {
        isLoading.value = true
        const refs = await bibleService.getCrossReferences(
          props.selectedBible,
          props.verseId
        )
        crossReferences.value = refs.data || []
      } catch (err) {
        console.error('Failed to load cross references:', err)
        error.value = 'Unable to load cross references. Please try again later.'
      } finally {
        isLoading.value = false
      }
    }

    const navigateToReference = (reference) => {
      // Implement navigation to the referenced verse
      emit('navigate-to-reference', reference)
    }

    watch(
      () => [props.verseId, props.selectedBible],
      () => {
        loadCrossReferences()
      }
    )

    return {
      activeTab,
      isLoading,
      error,
      crossReferences,
      navigateToReference
    }
  }
}
</script>

<style scoped>
.commentary-content {
  min-height: 200px;
}

.v-list-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style>