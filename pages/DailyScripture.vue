<template>
  <v-container
    fluid
    class="fill-height"
    :style="{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="10" lg="8">
        <v-progress-circular v-if="isLoading" indeterminate color="primary" class="mb-4"></v-progress-circular>
        <v-card v-else ref="card" class="pa-4 pa-md-6 text-center scripture-card">
          <v-card-text>
            <div class="text-h5 text-md-h4 font-weight-bold mb-4">{{ scripture.text }}</div>
            <div class="text-subtitle-1 font-italic mb-4">{{ scripture.reference }}</div>
            <v-textarea v-model="currentNote" label="Add a note" outlined auto-grow rows="1" class="mb-4"></v-textarea>
            <div v-if="note" class="mb-4">
              <p class="text-body-1 font-weight-bold">My Note:</p>
              <p class="text-body-1">{{ note }}</p>
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="saveNote(scripture.reference, currentNote)">Save Note</v-btn>
            <v-btn icon :color="isFavorite(scripture) ? 'red' : 'grey'" @click="toggleFavorite(scripture)">
              <v-icon>{{ isFavorite(scripture) ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { backgrounds } from "@/utils/helpers";
import { useScriptures } from "@/composables/useScriptures";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { defineComponent, onMounted, ref, computed, nextTick } from "vue";
import { gsap, CSSPlugin } from "gsap"; // Import CSSPlugin

gsap.registerPlugin(CSSPlugin); // Register the plugin

export default defineComponent({
  name: "DailyScripture",
  setup() {
    const { allScriptures, loadScriptures, getRandomScripture } = useScriptures();
    const { notes, saveNote, toggleFavorite, isFavorite } = useLocalStorage();

    const scripture = ref({});
    const backgroundImage = ref("");
    const isLoading = ref(true);
    const currentNote = ref("");
    const card = ref(null);
    const note = computed(() => notes.value[scripture.value.reference] || '');

    const updateScripture = async () => {
      isLoading.value = true;
      scripture.value = await getRandomScripture();
      const backgroundIndex = Math.floor(Math.random() * backgrounds.length);
      backgroundImage.value = backgrounds[backgroundIndex];
      currentNote.value = notes.value[scripture.value.reference] || "";
      isLoading.value = false;
    };

    onMounted(async () => {
      await loadScriptures();
      updateScripture();
      await nextTick(); // Ensure the DOM is updated before animating
      if (card.value) { // Check if card.value is defined before animating
        gsap.fromTo(
          card.value,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    });

    return {
      scripture,
      backgroundImage,
      currentNote,
      isLoading,
      card,
      notes,
      saveNote,
      toggleFavorite,
      isFavorite,
      note,
    };
  },
});
</script>

<style scoped>
.scripture-card {
  background-color: rgba(255, 255, 255, 0.7);
  color: #333;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
</style>
