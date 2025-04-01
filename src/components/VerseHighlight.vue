<template>
  <div class="verse-container">
    <div class="verse-text" @mouseup="handleTextSelection">
      {{ verseText }}
      <div
        v-for="highlight in highlights"
        :key="highlight.id"
        class="highlight"
        :class="highlight.color"
        :style="{
          left: highlight.position.left + 'px',
          top: highlight.position.top + 'px',
          width: highlight.position.width + 'px',
          height: highlight.position.height + 'px'
        }"
      ></div>
    </div>
    
    <!-- Color Selection Popup -->
    <v-menu
      v-model="showColorMenu"
      :position-x="menuPosition.x"
      :position-y="menuPosition.y"
      absolute
      offset-y
    >
      <v-card>
        <v-card-text>
          <div class="d-flex flex-wrap">
            <v-btn
              v-for="color in highlightColors"
              :key="color.name"
              :color="color.value"
              class="ma-1"
              icon="mdi-marker"
              size="small"
              @click="applyHighlight(color.name)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              color="error"
              size="small"
              class="ma-1"
              @click="removeHighlight"
            ></v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'VerseHighlight',
  props: {
    verseText: {
      type: String,
      required: true
    },
    verseId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const highlights = ref([])
    const showColorMenu = ref(false)
    const menuPosition = ref({ x: 0, y: 0 })
    const currentSelection = ref(null)

    const highlightColors = [
      { name: 'yellow', value: '#FFEB3B' },
      { name: 'green', value: '#4CAF50' },
      { name: 'blue', value: '#2196F3' },
      { name: 'pink', value: '#E91E63' },
      { name: 'purple', value: '#9C27B0' }
    ]

    const handleTextSelection = (event) => {
      const selection = window.getSelection()
      if (!selection.toString()) {
        showColorMenu.value = false
        return
      }

      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      
      menuPosition.value = {
        x: event.clientX,
        y: event.clientY
      }

      currentSelection.value = {
        text: selection.toString(),
        position: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        },
        range: range.cloneRange()
      }

      showColorMenu.value = true
    }

    const applyHighlight = (color) => {
      if (!currentSelection.value) return

      const highlight = {
        id: uuidv4(),
        color,
        text: currentSelection.value.text,
        position: currentSelection.value.position
      }

      highlights.value.push(highlight)
      saveHighlights()
      showColorMenu.value = false
      window.getSelection().removeAllRanges()
    }

    const removeHighlight = () => {
      // Remove highlight at current position
      const { x, y } = menuPosition.value
      const highlightToRemove = highlights.value.find(h => 
        x >= h.position.left &&
        x <= h.position.left + h.position.width &&
        y >= h.position.top &&
        y <= h.position.top + h.position.height
      )

      if (highlightToRemove) {
        highlights.value = highlights.value.filter(h => h.id !== highlightToRemove.id)
        saveHighlights()
      }

      showColorMenu.value = false
    }

    const saveHighlights = () => {
      const stored = JSON.parse(localStorage.getItem('verseHighlights') || '{}')
      stored[props.verseId] = highlights.value
      localStorage.setItem('verseHighlights', JSON.stringify(stored))
    }

    const loadHighlights = () => {
      const stored = JSON.parse(localStorage.getItem('verseHighlights') || '{}')
      highlights.value = stored[props.verseId] || []
    }

    onMounted(() => {
      loadHighlights()
    })

    return {
      highlights,
      showColorMenu,
      menuPosition,
      highlightColors,
      handleTextSelection,
      applyHighlight,
      removeHighlight
    }
  }
}
</script>

<style scoped>
.verse-container {
  position: relative;
  padding: 1rem;
}

.verse-text {
  position: relative;
  z-index: 1;
  line-height: 1.6;
}

.highlight {
  position: absolute;
  pointer-events: none;
  opacity: 0.3;
  z-index: -1;
}

.highlight.yellow { background-color: #FFEB3B; }
.highlight.green { background-color: #4CAF50; }
.highlight.blue { background-color: #2196F3; }
.highlight.pink { background-color: #E91E63; }
.highlight.purple { background-color: #9C27B0; }
</style>
