<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      class="d-md-none"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>
      <router-link to="/" class="text-white text-decoration-none">
        Bible App
      </router-link>
    </v-app-bar-title>

    <!-- Desktop Navigation -->
    <v-tabs
      v-model="activeTab"
      class="d-none d-md-flex"
    >
      <v-tab to="/read" value="read">
        <v-icon start>mdi-book-open-page-variant</v-icon>
        Read
      </v-tab>
      <v-tab to="/search" value="search">
        <v-icon start>mdi-magnify</v-icon>
        Search
      </v-tab>
      <v-tab to="/topics" value="topics">
        <v-icon start>mdi-bookmark-multiple</v-icon>
        Topics
      </v-tab>
      <v-tab to="/reading-plans" value="plans">
        <v-icon start>mdi-book-clock</v-icon>
        Plans
      </v-tab>
      <v-tab to="/prayer-journal" value="prayers">
        <v-icon start>mdi-notebook</v-icon>
        Prayers
      </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <!-- User Menu -->
    <v-btn
      icon
      class="mr-2"
      to="/favorites"
    >
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/profile">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/notes">
          <template v-slot:prepend>
            <v-icon>mdi-pencil-box</v-icon>
          </template>
          <v-list-item-title>Study Notes</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="handleLogout">
          <template v-slot:prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
    >
      <v-list>
        <v-list-item to="/" prepend-icon="mdi-home">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/read" prepend-icon="mdi-book-open-page-variant">
          <v-list-item-title>Bible Reader</v-list-item-title>
        </v-list-item>
        <v-list-item to="/search" prepend-icon="mdi-magnify">
          <v-list-item-title>Search</v-list-item-title>
        </v-list-item>
        <v-list-item to="/topics" prepend-icon="mdi-bookmark-multiple">
          <v-list-item-title>Topics</v-list-item-title>
        </v-list-item>
        <v-list-item to="/reading-plans" prepend-icon="mdi-book-clock">
          <v-list-item-title>Reading Plans</v-list-item-title>
        </v-list-item>
        <v-list-item to="/prayer-journal" prepend-icon="mdi-notebook">
          <v-list-item-title>Prayer Journal</v-list-item-title>
        </v-list-item>
        <v-list-item to="/notes" prepend-icon="mdi-pencil-box">
          <v-list-item-title>Study Notes</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/profile" prepend-icon="mdi-account">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/verse-memorization" prepend-icon="mdi-brain">
          <v-list-item-title>Verse Memorization</v-list-item-title>
        </v-list-item>
        <v-list-item to="/audio-bible" prepend-icon="mdi-headphones">
          <v-list-item-title>Audio Bible</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter()
    const drawer = ref(false)
    const activeTab = ref(null)

    const handleLogout = () => {
      // Add your logout logic here
      router.push('/login')
    }

    return {
      drawer,
      activeTab,
      handleLogout
    }
  }
}
</script> 