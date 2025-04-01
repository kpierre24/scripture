<template>
  <v-app>
    <app-header />
    
    <v-main>
      <router-view></router-view>
    </v-main>

    <app-footer />
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
})
</script>

<style>
.v-main {
  min-height: calc(100vh - 128px); /* Adjust based on your header/footer height */
}
</style>
