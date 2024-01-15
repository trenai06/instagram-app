import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Feed from '../views/Feed.vue'
import Post from '../views/NewPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/register',
      name: 'register',
      component: Register
    }, 
    {
      path:'/feed',
      name:'feed',
      component: Feed
    },
    {
      path:'/post',
      name:'post',
      component: Post
    }
  ]
})

export default router
