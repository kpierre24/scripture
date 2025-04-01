<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card>
            <v-card-title class="text-h5">My Favorite Scriptures</v-card-title>
            <v-card-text>
              <div v-if="favorites.length === 0">
                <p>You haven't added any favorite scriptures yet.</p>
              </div>
              <v-list v-else>
                <template v-for="(favorite, index) in favorites" :key="index">
                  <v-list-item v-if="favorite.type === 'scripture'">
                    <template v-slot:prepend>
                      <v-list-item-action start>
                        <v-btn icon @click="removeFromFavorites(favorite)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </template>
                    <v-list-item-title class="text-body-1">{{ favorite.text }}</v-list-item-title>
                    <v-list-item-subtitle class="text-body-2">{{ favorite.reference }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item v-else-if="favorite.type === 'book'">
                    <template v-slot:prepend>
                      <v-list-item-action start>
                        <v-btn icon @click="removeFromFavorites(favorite)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </template>
                    <v-list-item-title class="text-body-1">Book: {{ favorite.book }}</v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "Favorites",
    data() {
      return {
        favorites: [],
      };
    },
    mounted() {
      this.loadFavorites();
    },
    methods: {
      loadFavorites() {
        this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      },
      removeFromFavorites(favorite) {
        this.favorites = this.favorites.filter((fav) => {
          if (fav.type === "scripture") {
            return fav.reference !== favorite.reference;
          } else if (fav.type === "book") {
            return fav.book !== favorite.book;
          }
          return true;
        });
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      },
    },
  };
  </script>
  