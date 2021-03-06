import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index'
import Post from '@/pages/Post'
import Message from '@/pages/Message'
import Activity from '@/pages/Activity'
import About from '@/pages/About'
import Resume from '@/pages/Resume'
import NotFound from '@/pages/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
