import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import BibleReader from '@/pages/BibleReader.vue';
import ReadingPlan from '@/components/ReadingPlan.vue';
import PrayerJournal from '@/components/PrayerJournal.vue';
import SearchScripture from '@/components/SearchScripture.vue';
import StudyNotes from '@/components/StudyNotes.vue';
import DailyScripture from '@/components/DailyScripture.vue';
import Topics from '@/components/Topics.vue';
import UserProfile from '@/components/UserProfile.vue';


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/read', name: 'BibleReader', component: BibleReader },
  { path: '/reading-plans', name: 'ReadingPlan', component: ReadingPlan },
  { path: '/prayer-journal', name: 'PrayerJournal', component: PrayerJournal },
  { path: '/search', name: 'SearchScripture', component: SearchScripture },
  { path: '/notes', name: 'StudyNotes', component: StudyNotes },
  { path: '/daily', name: 'DailyScripture', component: DailyScripture },
  { path: '/topics', name: 'Topics', component: Topics },
  { path: '/profile', name: 'UserProfile', component: UserProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
