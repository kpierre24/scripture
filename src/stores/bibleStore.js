import { defineStore } from 'pinia'
import { bibleService } from '@/services/bibleService'

export const useBibleStore = defineStore('bible', {
  state: () => ({
    currentBible: null,
    availableBibles: [],
    books: [],
    currentBook: null,
    currentChapter: null,
    isLoading: false,
    error: null
  }),

  actions: {
    async initializeBibles() {
      try {
        this.isLoading = true
        this.availableBibles = await bibleService.getBibles()
        // Set default Bible (e.g., KJV)
        this.currentBible = this.availableBibles.find(bible => 
          bible.abbreviation === 'KJV'
        ) || this.availableBibles[0]
        
        await this.loadBooks()
      } catch (error) {
        this.error = 'Failed to load Bibles'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async loadBooks() {
      try {
        this.isLoading = true
        this.books = await bibleService.getBooks(this.currentBible.id)
      } catch (error) {
        this.error = 'Failed to load books'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async loadChapter(bookId, chapterId) {
      try {
        this.isLoading = true
        this.currentChapter = await bibleService.getChapter(
          this.currentBible.id,
          chapterId
        )
        this.currentBook = this.books.find(book => book.id === bookId)
      } catch (error) {
        this.error = 'Failed to load chapter'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async searchBible(query) {
      try {
        this.isLoading = true
        return await bibleService.searchVerses(this.currentBible.id, query)
      } catch (error) {
        this.error = 'Search failed'
        console.error(error)
        return []
      } finally {
        this.isLoading = false
      }
    },

    async getRandomVerse() {
      try {
        this.isLoading = true
        return await bibleService.getRandomVerse(this.currentBible.id)
      } catch (error) {
        this.error = 'Failed to get random verse'
        console.error(error)
        return null
      } finally {
        this.isLoading = false
      }
    }
  }
}) 