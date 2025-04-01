import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import DailyScripture from '../pages/DailyScripture.vue';
import Search from '../pages/Search.vue';
import Favorites from '../pages/Favorites.vue';
import Topics from '../pages/Topics.vue';
import TopicDetails from '../pages/TopicDetails.vue';
import ChapterView from '../pages/ChapterView.vue';
import About from '../pages/About.vue';
import Profile from '../pages/Profile.vue'; // Create this file
import Settings from '../pages/Settings.vue'; // Create this file


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/daily-scripture', component: DailyScripture },
  { path: '/search', component: Search },
  { path: '/favorites', component: Favorites },
  { path: '/topics', component: Topics },
  { path: '/topics/:topic', component: TopicDetails, props: true },
  { path: '/chapter/:book/:chapter', component: ChapterView, props: true },
  { path: '/about', component: About },
  { path: '/profile', component: Profile },
  { path: '/settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
