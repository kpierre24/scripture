<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <!-- Topics List -->
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            My Topics
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="showAddTopicDialog = true"
            >
              New Topic
            </v-btn>
          </v-card-title>

          <v-list>
            <v-list-item
              v-for="topic in topics"
              :key="topic.id"
              :title="topic.name"
              :subtitle="`${topic.scriptures.length} scriptures`"
              :active="selectedTopic?.id === topic.id"
              @click="selectTopic(topic)"
            >
              <template v-slot:append>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      variant="text"
                      v-bind="props"
                    ></v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="editTopic(topic)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteTopic(topic.id)">
                      <v-list-item-title class="text-error">Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <!-- Selected Topic Details -->
        <v-card v-if="selectedTopic">
          <v-card-title class="d-flex justify-space-between align-center">
            {{ selectedTopic.name }}
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="showAddScriptureDialog = true"
            >
              Add Scripture
            </v-btn>
          </v-card-title>

          <v-card-text>
            <p class="text-subtitle-1 mb-4">{{ selectedTopic.description }}</p>

            <v-list>
              <v-list-item
                v-for="scripture in selectedTopic.scriptures"
                :key="scripture.id"
                class="mb-2"
              >
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-book-open-variant</v-icon>
                </template>
                <v-list-item-title>{{ scripture.reference }}</v-list-item-title>
                <v-list-item-subtitle class="mt-1">{{ scripture.text }}</v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    color="error"
                    @click="removeScripture(scripture.id)"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card v-else class="text-center pa-6">
          <v-icon size="64" color="grey">mdi-bookmark-multiple</v-icon>
          <p class="text-h6 mt-4">Select a topic to view its scriptures</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Topic Dialog -->
    <v-dialog v-model="showAddTopicDialog" max-width="500px">
      <v-card>
        <v-card-title>{{ editingTopic ? 'Edit Topic' : 'New Topic' }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveTopic">
            <v-text-field
              v-model="currentTopic.name"
              label="Topic Name"
              required
            ></v-text-field>
            <v-textarea
              v-model="currentTopic.description"
              label="Description"
              rows="3"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="saveTopic"
          >
            Save
          </v-btn>
          <v-btn
            color="grey"
            variant="text"
            @click="showAddTopicDialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Scripture Dialog -->
    <v-dialog v-model="showAddScriptureDialog" max-width="600px">
      <v-card>
        <v-card-title>Add Scripture to Topic</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addScripture">
            <v-select
              v-model="selectedBible"
              :items="availableBibles"
              item-title="name"
              item-value="id"
              label="Select Translation"
            ></v-select>
            
            <v-select
              v-model="selectedBook"
              :items="books"
              item-title="name"
              item-value="id"
              label="Select Book"
              @update:model-value="loadChapters"
            ></v-select>

            <v-select
              v-model="selectedChapter"
              :items="chapters"
              label="Select Chapter"
              @update:model-value="loadVerses"
            ></v-select>

            <v-select
              v-model="selectedVerse"
              :items="verses"
              label="Select Verse"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="addScripture"
          >
            Add
          </v-btn>
          <v-btn
            color="grey"
            variant="text"
            @click="showAddScriptureDialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { bibleService } from '@/services/bibleService'

export default {
  name: 'Topics',
  setup() {
    const topics = ref([])
    const selectedTopic = ref(null)
    const showAddTopicDialog = ref(false)
    const showAddScriptureDialog = ref(false)
    const editingTopic = ref(null)
    
    // Bible selection refs
    const selectedBible = ref(null)
    const selectedBook = ref(null)
    const selectedChapter = ref(null)
    const selectedVerse = ref(null)
    const availableBibles = ref([])
    const books = ref([])
    const chapters = ref([])
    const verses = ref([])

    const currentTopic = ref({
      name: '',
      description: '',
      scriptures: []
    })

    // Load topics from localStorage
    const loadTopics = () => {
      const saved = localStorage.getItem('topics')
      if (saved) {
        topics.value = JSON.parse(saved)
      }
    }

    // Save topics to localStorage
    const saveTopics = () => {
      localStorage.setItem('topics', JSON.stringify(topics.value))
    }

    const selectTopic = (topic) => {
      selectedTopic.value = topic
    }

    const editTopic = (topic) => {
      editingTopic.value = topic
      currentTopic.value = { ...topic }
      showAddTopicDialog.value = true
    }

    const saveTopic = () => {
      if (!currentTopic.value.name) return

      if (editingTopic.value) {
        const index = topics.value.findIndex(t => t.id === editingTopic.value.id)
        if (index !== -1) {
          topics.value[index] = {
            ...currentTopic.value,
            id: editingTopic.value.id
          }
        }
      } else {
        topics.value.push({
          ...currentTopic.value,
          id: Date.now(),
          scriptures: []
        })
      }

      saveTopics()
      showAddTopicDialog.value = false
      currentTopic.value = { name: '', description: '', scriptures: [] }
      editingTopic.value = null
    }

    const deleteTopic = (topicId) => {
      topics.value = topics.value.filter(t => t.id !== topicId)
      if (selectedTopic.value?.id === topicId) {
        selectedTopic.value = null
      }
      saveTopics()
    }

    const addScripture = async () => {
      if (!selectedTopic.value || !selectedVerse.value) return

      try {
        const book = books.value.find(b => b.id === selectedBook.value)
        const verse = await bibleService.getVerse(
          selectedBible.value,
          selectedBook.value,
          selectedChapter.value,
          selectedVerse.value
        )

        const scripture = {
          id: Date.now(),
          reference: `${book.name} ${selectedChapter.value}:${selectedVerse.value}`,
          text: verse.text
        }

        const topicIndex = topics.value.findIndex(t => t.id === selectedTopic.value.id)
        if (topicIndex !== -1) {
          topics.value[topicIndex].scriptures.push(scripture)
          saveTopics()
        }

        showAddScriptureDialog.value = false
        // Reset selection
        selectedVerse.value = null
      } catch (error) {
        console.error('Failed to add scripture:', error)
      }
    }

    const removeScripture = (scriptureId) => {
      const topicIndex = topics.value.findIndex(t => t.id === selectedTopic.value.id)
      if (topicIndex !== -1) {
        topics.value[topicIndex].scriptures = topics.value[topicIndex].scriptures
          .filter(s => s.id !== scriptureId)
        saveTopics()
      }
    }

    // Add these methods
    const loadBibles = async () => {
      try {
        const bibles = await bibleService.getBibles()
        availableBibles.value = bibles
        if (bibles.length > 0) {
          selectedBible.value = bibles[0].id
          await loadBooks()
        }
      } catch (error) {
        console.error('Failed to load bibles:', error)
      }
    }

    const loadBooks = async () => {
      if (!selectedBible.value) return
      try {
        const booksList = await bibleService.getBooks(selectedBible.value)
        books.value = booksList
      } catch (error) {
        console.error('Failed to load books:', error)
      }
    }

    const loadChapters = async () => {
      if (!selectedBook.value || !selectedBible.value) return
      try {
        const chaptersData = await bibleService.getChapters(selectedBible.value, selectedBook.value)
        chapters.value = Array.from({ length: chaptersData.length }, (_, i) => i + 1)
        selectedChapter.value = 1
      } catch (error) {
        console.error('Failed to load chapters:', error)
      }
    }

    const loadVerses = async () => {
      if (!selectedBook.value || !selectedChapter.value || !selectedBible.value) return
      try {
        const chapterId = `${selectedBook.value}.${selectedChapter.value}`
        const chapterData = await bibleService.getChapter(selectedBible.value, chapterId)
        // Extract verse numbers from the chapter content
        verses.value = Array.from({ length: 30 }, (_, i) => i + 1) // Temporary solution, adjust based on your API
      } catch (error) {
        console.error('Failed to load verses:', error)
      }
    }

    // Load initial data
    loadTopics()
    onMounted(() => {
      loadTopics()
      loadBibles()
    })

    return {
      topics,
      selectedTopic,
      showAddTopicDialog,
      showAddScriptureDialog,
      currentTopic,
      editingTopic,
      selectedBible,
      selectedBook,
      selectedChapter,
      selectedVerse,
      availableBibles,
      books,
      chapters,
      verses,
      selectTopic,
      editTopic,
      saveTopic,
      deleteTopic,
      addScripture,
      removeScripture,
      loadChapters,
      loadVerses,
      loadBooks,
      loadBibles
    }
  }
}
</script> 