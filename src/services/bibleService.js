import axios from 'axios'

// API.Bible configuration
const API_KEY = '66cc69b3c22874b65c73b9fd5301febf' // Replace with your actual API key
const BASE_URL = 'https://api.scripture.api.bible/v1'

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'api-key': API_KEY
  }
})

export const bibleService = {
  // Get list of available Bibles
  async getBibles() {
    try {
      const response = await api.get('/bibles')
      // Filter only English translations
      return response.data.data.filter(bible => 
        bible.language.id === 'eng' || 
        bible.language.name.toLowerCase().includes('english')
      )
    } catch (error) {
      console.error('Error fetching bibles:', error)
      throw error
    }
  },

  // Get specific Bible details
  async getBible(bibleId) {
    try {
      const response = await api.get(`/bibles/${bibleId}`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching Bible details:', error)
      throw error
    }
  },

  // Get all books for a specific Bible
  async getBooks(bibleId) {
    try {
      const response = await api.get(`/bibles/${bibleId}/books`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching books:', error)
      throw error
    }
  },

  // Get chapters for a specific book
  async getChapters(bibleId, bookId) {
    try {
      const response = await api.get(`/bibles/${bibleId}/books/${bookId}/chapters`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching chapters:', error)
      throw error
    }
  },

  // Get verses for a specific chapter
  async getChapter(bibleId, chapterId) {
    try {
      const response = await api.get(`/bibles/${bibleId}/chapters/${chapterId}`, {
        params: {
          'content-type': 'text',
          'include-notes': false,
          'include-titles': true,
          'include-chapter-numbers': true,
          'include-verse-numbers': true,
          'include-verse-spans': true
        }
      })
      return response.data.data
    } catch (error) {
      console.error('Error fetching chapter:', error)
      throw error
    }
  },

  // Search verses
  async searchVerses(query, bibleId = 'de4e12af7f28f599-02') { // Using KJV as default
    try {
      const response = await api.get(`/bibles/${bibleId}/search`, {
        params: {
          query,
          limit: 20,
          sort: 'relevance',
          fuzziness: 'AUTO'
        }
      })
      return response.data.data.verses
    } catch (error) {
      console.error('Error searching verses:', error)
      throw error
    }
  },

  // Get random verse
  async getRandomVerse(bibleId = 'de4e12af7f28f599-02') { // Using KJV as default
    try {
      // Get a random book
      const books = await this.getBooks(bibleId)
      const randomBook = books[Math.floor(Math.random() * books.length)]
      
      // Get chapters for the random book
      const chapters = await this.getChapters(bibleId, randomBook.id)
      const randomChapter = chapters[Math.floor(Math.random() * chapters.length)]
      
      // Get the chapter content
      const chapter = await this.getChapter(bibleId, randomChapter.id)
      
      // Extract verses and pick a random one
      const verses = chapter.content.split(/\[(\d+)\]/g)
        .filter((_, i) => i % 2 === 0) // Get only the verse content
        .filter(verse => verse.trim()) // Remove empty verses

      const randomVerse = verses[Math.floor(Math.random() * verses.length)]

      return {
        text: randomVerse.trim(),
        reference: `${randomBook.name} ${randomChapter.number}`,
        id: randomChapter.id
      }
    } catch (error) {
      console.error('Error getting random verse:', error)
      throw error
    }
  },

  async getCrossReferences(bibleId, verseId) {
    try {
      // This endpoint might vary based on your Bible API
      const response = await api.get(`/bibles/${bibleId}/verses/${verseId}/references`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching cross references:', error)
      throw error
    }
  },

  async getVerse(bibleId, bookId, chapter, verse) {
    try {
      const verseId = `${bookId}.${chapter}.${verse}`
      const response = await api.get(`/bibles/${bibleId}/verses/${verseId}`)
      return {
        id: response.data.data.id,
        reference: `${response.data.data.reference}`,
        text: response.data.data.content
      }
    } catch (error) {
      console.error('Error fetching verse:', error)
      throw error
    }
  }
} 