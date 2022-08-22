import MainPage from '@/view/MainPage.vue'
import TelegramPage from '@/view/TelegramPage.vue';
import WhatsAppPage from '@/view/WhatsAppPage.vue';
import ChatIdPage from '@/view/ChatIdPage.vue';

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/whatsapp',
    component: WhatsAppPage
  },
  { 
  path: '/whatsapp/:id',
  component: ChatIdPage
  },
  {
    path: '/telegram',
    component: TelegramPage
  },
  {
    path: '/telegram/:id',
    component: ChatIdPage
  },

]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

export default router