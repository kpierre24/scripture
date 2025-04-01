<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-card-title class="text-h5">
            {{ book }} Chapter {{ chapter }}
          </v-card-title>
          <v-card-text>
            <div v-if="chapterVerses.length">
              <div v-for="(verse, index) in chapterVerses" :key="index">
                <p class="text-body-1">
                  <span class="font-weight-bold">{{ verse.verse }}.</span> {{ verse.text }}
                </p>
              </div>
            </div>
            <div v-else>
              <p>No verses found for this chapter.</p>
            </div>
            <v-textarea
              v-model="currentNote"
              label="Add a note"
              outlined
              auto-grow
              rows="1"
              class="mb-4"
            ></v-textarea>
            <div v-if="note" class="mb-4">
      <p class="text-body-1 font-weight-bold">My Note:</p>
      <p class="text-body-1">{{ note }}</p>
    </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="saveNote(chapterReference, currentNote)">Save Note</v-btn>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">Add to Topic</v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(topic, topicIndex) in topics" :key="topicIndex" @click="addToTopic(chapterVerses, topic)">
                  <v-list-item-title>{{ topic }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openNewTopicDialog(chapterVerses)">
                  <v-list-item-title>New Topic</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="newTopicDialog" max-width="500">
      <v-card>
        <v-card-title>Create New Topic</v-card-title>
        <v-card-text>
          <v-text-field v-model="newTopicName" label="Topic Name" outlined></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="newTopicDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createNewTopic(newTopicName, currentScriptureForTopic)">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useScriptures } from "@/composables/useScriptures";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { ref, onMounted, computed } from "vue";

export default {
  name: "ChapterView",
  props: {
    book: {
      type: String,
      required: true,
    },
    chapter: {
      type: [Number, String], // Allow both Number and String
      required: true,
    },
  },
  setup(props) {
    const { allScriptures, loadScriptures } = useScriptures();
    const { notes, topics, addToTopic, createNewTopic, saveNote } = useLocalStorage();
    const currentNote = ref("");
    const newTopicDialog = ref(false);
    const newTopicName = ref("");
    const currentScriptureForTopic = ref(null);
    const note = computed(() => notes.value[chapterReference.value] || '');

    // Convert chapter to a number
    const chapterNumber = computed(() => Number(props.chapter));

    const chapterVerses = computed(() => {
      return allScriptures.value.filter(
        (scripture) =>
          scripture.book.toLowerCase() === props.book.toLowerCase() &&
          scripture.chapter === chapterNumber.value
      );
    });

    const chapterReference = computed(() => `${props.book} ${chapterNumber.value}`);

    const openNewTopicDialog = (scripture) => {
      newTopicDialog.value = true;
      currentScriptureForTopic.value = scripture;
    };

    onMounted(() => {
      loadScriptures();
    });

    return {
      chapterVerses,
      notes,
      currentNote,
      saveNote,
      topics,
      addToTopic,
      openNewTopicDialog,
      createNewTopic,
      newTopicDialog,
      newTopicName,
      currentScriptureForTopic,
      chapterReference,
      note,
      chapter: chapterNumber, // Expose the number version
    };
  },
};
</script>
