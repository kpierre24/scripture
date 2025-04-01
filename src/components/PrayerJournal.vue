<template>
  <v-card class="prayer-journal">
    <v-card-title class="d-flex justify-space-between align-center">
      Prayer Journal
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="showAddDialog = true"
      >
        Add Prayer
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-tabs v-model="activeTab">
        <v-tab value="active">Active Prayers</v-tab>
        <v-tab value="answered">Answered Prayers</v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <v-window-item value="active">
          <v-list>
            <v-list-item
              v-for="prayer in activePrayers"
              :key="prayer.id"
              :title="prayer.title"
              :subtitle="prayer.date"
            >
              <template v-slot:append>
                <v-btn
                  icon="mdi-check"
                  color="success"
                  variant="text"
                  @click="markAsAnswered(prayer)"
                />
              </template>
              <v-list-item-text>
                <p class="text-body-2 mt-2">{{ prayer.request }}</p>
              </v-list-item-text>
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="answered">
          <v-list>
            <v-list-item
              v-for="prayer in answeredPrayers"
              :key="prayer.id"
              :title="prayer.title"
              :subtitle="prayer.date"
            >
              <v-list-item-text>
                <p class="text-body-2 mt-2">{{ prayer.request }}</p>
                <p class="text-caption success--text mt-2">
                  Answered: {{ prayer.answeredDate }}
                </p>
              </v-list-item-text>
            </v-list-item>
          </v-list>
        </v-window-item>
      </v-window>
    </v-card-text>

    <!-- Add Prayer Dialog -->
    <v-dialog v-model="showAddDialog" max-width="500px">
      <v-card>
        <v-card-title>Add Prayer Request</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addPrayer">
            <v-text-field
              v-model="newPrayer.title"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="newPrayer.request"
              label="Prayer Request"
              required
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="addPrayer"
          >
            Add
          </v-btn>
          <v-btn
            color="grey"
            variant="text"
            @click="showAddDialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'PrayerJournal',
  setup() {
    const activeTab = ref('active')
    const showAddDialog = ref(false)
    const prayers = ref([])
    const newPrayer = ref({
      title: '',
      request: ''
    })

    const activePrayers = computed(() => 
      prayers.value.filter(prayer => !prayer.answered)
    )

    const answeredPrayers = computed(() => 
      prayers.value.filter(prayer => prayer.answered)
    )

    const addPrayer = () => {
      if (!newPrayer.value.title || !newPrayer.value.request) return

      prayers.value.push({
        id: Date.now(),
        title: newPrayer.value.title,
        request: newPrayer.value.request,
        date: new Date().toLocaleDateString(),
        answered: false
      })

      // Save to localStorage
      savePrayers()

      // Reset form
      newPrayer.value = { title: '', request: '' }
      showAddDialog.value = false
    }

    const markAsAnswered = (prayer) => {
      const index = prayers.value.findIndex(p => p.id === prayer.id)
      if (index !== -1) {
        prayers.value[index] = {
          ...prayer,
          answered: true,
          answeredDate: new Date().toLocaleDateString()
        }
        savePrayers()
      }
    }

    const savePrayers = () => {
      localStorage.setItem('prayers', JSON.stringify(prayers.value))
    }

    // Load saved prayers on mount
    const loadPrayers = () => {
      const saved = localStorage.getItem('prayers')
      if (saved) {
        prayers.value = JSON.parse(saved)
      }
    }

    loadPrayers()

    return {
      activeTab,
      showAddDialog,
      prayers,
      newPrayer,
      activePrayers,
      answeredPrayers,
      addPrayer,
      markAsAnswered
    }
  }
}
</script> 