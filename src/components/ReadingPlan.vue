<template>
  <v-card class="reading-plan">
    <v-card-title class="d-flex justify-space-between">
      Reading Plans
      <v-btn
        v-if="selectedPlan"
        color="primary"
        variant="text"
        @click="selectedPlan = null"
      >
        Back to Plans
      </v-btn>
    </v-card-title>

    <v-card-text>
      <div v-if="!selectedPlan" class="plans-grid">
        <v-card
          v-for="plan in readingPlans"
          :key="plan.id"
          class="plan-card"
          @click="selectPlan(plan)"
        >
          <v-card-title>{{ plan.title }}</v-card-title>
          <v-card-text>
            <p>{{ plan.description }}</p>
            <p class="text-caption">Duration: {{ plan.duration }} days</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="tonal"
              block
            >
              Start Plan
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <div v-else class="plan-details">
        <h2 class="text-h5 mb-4">{{ selectedPlan.title }}</h2>
        <v-timeline density="comfortable">
          <v-timeline-item
            v-for="(day, index) in selectedPlan.readings"
            :key="index"
            :dot-color="day.completed ? 'success' : 'primary'"
            size="small"
          >
            <template v-slot:opposite>
              Day {{ index + 1 }}
            </template>
            <div class="d-flex justify-space-between align-center">
              <span>{{ day.reference }}</span>
              <v-checkbox
                v-model="day.completed"
                hide-details
                @change="updateProgress(index)"
              ></v-checkbox>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ReadingPlan',
  setup() {
    const selectedPlan = ref(null)
    const readingPlans = ref([
      {
        id: 1,
        title: 'New Testament in 90 Days',
        description: 'Read through the entire New Testament in 90 days.',
        duration: 90,
        readings: Array.from({ length: 90 }, (_, i) => ({
          reference: `Day ${i + 1} Reading`,
          completed: false
        }))
      },
      {
        id: 2,
        title: '30 Days with Jesus',
        description: 'Focus on the life and teachings of Jesus for 30 days.',
        duration: 30,
        readings: Array.from({ length: 30 }, (_, i) => ({
          reference: `Day ${i + 1} Reading`,
          completed: false
        }))
      },
      // Add more reading plans
    ])

    const selectPlan = (plan) => {
      selectedPlan.value = plan
    }

    const updateProgress = (dayIndex) => {
      // Save progress to localStorage or your backend
      const progress = JSON.parse(localStorage.getItem('readingProgress') || '{}')
      progress[selectedPlan.value.id] = selectedPlan.value.readings
      localStorage.setItem('readingProgress', JSON.stringify(progress))
    }

    return {
      selectedPlan,
      readingPlans,
      selectPlan,
      updateProgress
    }
  }
}
</script>

<style scoped>
.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.plan-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.plan-card:hover {
  transform: translateY(-4px);
}
</style> 