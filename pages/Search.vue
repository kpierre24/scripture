<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-card-title class="text-h5">Search Scriptures</v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedBook"
              :items="allBooks"
              label="Select Book"
              outlined
              class="mb-4"
            ></v-select>
            <v-select
              v-model="selectedChapter"
              :items="getChaptersForBook(selectedBook)"
              label="Select Chapter"
              outlined
              class="mb-4"
              v-if="selectedBook"
            ></v-select>
            <v-select
              v-model="selectedVerse"
              :items="getVersesForChapter(selectedBook, selectedChapter)"
              label="Select Verse"
              outlined
              class="mb-4"
              v-if="selectedChapter"
            ></v-select>
            <v-btn
              color="primary"
              class="mr-4"
              :to="`/chapter/${selectedBook}/${selectedChapter}`"
              v-if="selectedBook && selectedChapter"
            >
              Read Chapter
            </v-btn>
            <v-btn
              color="primary"
              :to="`/book/${selectedBook}`"
              v-if="selectedBook"
            >
              Read Book
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useScriptures } from "@/composables/useScriptures";
import { ref, computed, onMounted } from "vue";

export default {
  name: "Search",
  setup() {
    const { allScriptures, loadScriptures } = useScriptures();
    const selectedBook = ref(null);
    const selectedChapter = ref(null);
    const selectedVerse = ref(null);

    const allBooks = [
      "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
    ];

    const getChaptersForBook = (book) => {
      if (!book) return [];
      const chapters = new Set();
      allScriptures.value.forEach((scripture) => {
        if (scripture.book === book) {
          chapters.add(scripture.chapter);
        }
      });
      return Array.from(chapters).sort((a, b) => a - b);
    };

    const getVersesForChapter = (book, chapter) => {
      if (!book || !chapter) return [];
      const verses = new Set();
      allScriptures.value.forEach((scripture) => {
        if (scripture.book === book && scripture.chapter === chapter) {
          verses.add(scripture.verse);
        }
      });
      return Array.from(verses).sort((a, b) => a - b);
    };

    onMounted(() => {
      loadScriptures();
    });

    return {
      allBooks,
      selectedBook,
      selectedChapter,
      selectedVerse,
      getChaptersForBook,
      getVersesForChapter,
    };
  },
};
</script>
