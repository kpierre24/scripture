import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
  }),

  actions: {
    addFavorite(verse) {
      // Check if verse is already in favorites
      const exists = this.favorites.some(fav => 
        fav.reference === verse.reference && fav.text === verse.text
      )

      if (!exists) {
        this.favorites.push({
          ...verse,
          dateAdded: new Date().toISOString()
        })
        this.saveFavorites()
      }
    },

    removeFavorite(verse) {
      this.favorites = this.favorites.filter(fav => 
        !(fav.reference === verse.reference && fav.text === verse.text)
      )
      this.saveFavorites()
    },

    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    isFavorite(verse) {
      return this.favorites.some(fav => 
        fav.reference === verse.reference && fav.text === verse.text
      )
    }
  }
})
