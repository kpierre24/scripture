<template>
  <v-footer
    class="bg-primary text-center d-flex flex-column"
  >
    <div class="d-flex flex-wrap justify-center align-center px-4">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="mx-4 my-2 text-white text-decoration-none"
      >
        {{ link.text }}
      </router-link>
    </div>

    <v-divider class="my-4"></v-divider>

    <div class="px-4 py-2 text-center text-white w-100">
      <div class="mb-4">
        <v-btn
          v-for="icon in socialIcons"
          :key="icon.icon"
          :href="icon.link"
          target="_blank"
          icon
          class="mx-2"
          variant="text"
          color="white"
        >
          <v-icon>{{ icon.icon }}</v-icon>
        </v-btn>
      </div>
      <div>
        {{ new Date().getFullYear() }} — <strong>Bible App</strong>
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  setup() {
    const links = [
      { to: '/read', text: 'Bible Reader' },
      { to: '/search', text: 'Search' },
      { to: '/topics', text: 'Topics' },
      { to: '/reading-plans', text: 'Reading Plans' },
      { to: '/prayer-journal', text: 'Prayer Journal' },
      { to: '/notes', text: 'Study Notes' },
      { to: '/favorites', text: 'Favorites' }
    ]

    const socialIcons = [
      { icon: 'mdi-facebook', link: '#' },
      { icon: 'mdi-twitter', link: '#' },
      { icon: 'mdi-instagram', link: '#' },
      { icon: 'mdi-youtube', link: '#' }
    ]

    return {
      links,
      socialIcons
    }
  }
}
</script>

<style scoped>
.v-footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style> 