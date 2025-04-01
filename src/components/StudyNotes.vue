<template>
  <v-card class="study-notes">
    <v-card-title class="d-flex justify-space-between align-center">
      Study Notes
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="showAddDialog = true"
      >
        Add Note
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item
          v-for="note in notes"
          :key="note.id"
          class="mb-4"
        >
          <template v-slot:prepend>
            <v-icon :color="note.color || 'primary'">mdi-notebook</v-icon>
          </template>
          
          <v-list-item-title class="d-flex justify-space-between">
            {{ note.reference }}
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-dots-vertical"
                  variant="text"
                  v-bind="props"
                ></v-btn>
              </template>
              <v-list>
                <v-list-item @click="editNote(note)">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteNote(note.id)">
                  <v-list-item-title class="text-error">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-title>
          
          <v-list-item-subtitle class="mt-2">
            {{ note.content }}
          </v-list-item-subtitle>
          
          <div class="mt-2">
            <v-chip
              v-for="tag in note.tags"
              :key="tag"
              class="mr-2"
              size="small"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- Add/Edit Note Dialog -->
    <v-dialog v-model="showAddDialog" max-width="600px">
      <v-card>
        <v-card-title>{{ editingNote ? 'Edit Note' : 'Add New Note' }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveNote">
            <v-text-field
              v-model="currentNote.reference"
              label="Bible Reference"
              required
            ></v-text-field>
            
            <v-textarea
              v-model="currentNote.content"
              label="Note Content"
              required
              rows="4"
            ></v-textarea>
            
            <v-combobox
              v-model="currentNote.tags"
              label="Tags"
              multiple
              chips
              small-chips
            ></v-combobox>
            
            <v-select
              v-model="currentNote.color"
              :items="noteColors"
              label="Note Color"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="saveNote"
          >
            Save
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
  name: 'StudyNotes',
  setup() {
    const showAddDialog = ref(false)
    const notes = ref([])
    const editingNote = ref(null)
    
    const currentNote = ref({
      reference: '',
      content: '',
      tags: [],
      color: 'primary'
    })

    const noteColors = [
      { text: 'Blue', value: 'primary' },
      { text: 'Green', value: 'success' },
      { text: 'Red', value: 'error' },
      { text: 'Orange', value: 'warning' },
      { text: 'Purple', value: 'purple' }
    ]

    const editNote = (note) => {
      editingNote.value = note
      currentNote.value = { ...note }
      showAddDialog.value = true
    }

    const saveNote = () => {
      if (!currentNote.value.reference || !currentNote.value.content) return

      if (editingNote.value) {
        const index = notes.value.findIndex(n => n.id === editingNote.value.id)
        if (index !== -1) {
          notes.value[index] = { ...currentNote.value, id: editingNote.value.id }
        }
      } else {
        notes.value.push({
          ...currentNote.value,
          id: Date.now(),
          date: new Date().toLocaleDateString()
        })
      }

      // Save to localStorage
      localStorage.setItem('studyNotes', JSON.stringify(notes.value))
      
      // Reset form
      currentNote.value = { reference: '', content: '', tags: [], color: 'primary' }
      editingNote.value = null
      showAddDialog.value = false
    }

    const deleteNote = (noteId) => {
      notes.value = notes.value.filter(note => note.id !== noteId)
      localStorage.setItem('studyNotes', JSON.stringify(notes.value))
    }

    // Load saved notes on mount
    const loadNotes = () => {
      const saved = localStorage.getItem('studyNotes')
      if (saved) {
        notes.value = JSON.parse(saved)
      }
    }

    loadNotes()

    return {
      showAddDialog,
      notes,
      currentNote,
      editingNote,
      noteColors,
      editNote,
      saveNote,
      deleteNote
    }
  }
}
</script> 