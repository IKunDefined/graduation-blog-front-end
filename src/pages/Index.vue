<template>
  <div id="index">
    <!-- page banner -->
    <mu-carousel style="height: 400px;">
      <mu-carousel-item>
        <img src="@/assets/images/banner/1.jpg">
        <!-- <img :src="bannerImg1" /> -->
      </mu-carousel-item>
      <mu-carousel-item>
        <img src="@/assets/images/banner/2.jpg">
        <!-- <img :src="bannerImg2" /> -->
      </mu-carousel-item>
      <mu-carousel-item>
        <img src="@/assets/images/banner/3.jpg">
        <!-- <img :src="bannerImg3" /> -->
      </mu-carousel-item>
    </mu-carousel>
    <!-- page tab -->
    <mu-tabs
      :value.sync="active"
      inverse color="secondary"
      text-color="rgba(0, 0, 0, .54)"
      center
    >
      <mu-tab>文章</mu-tab>
      <mu-tab>动态</mu-tab>
      <mu-tab>留言</mu-tab>
      <!-- <mu-tab>视频</mu-tab> -->
    </mu-tabs>
    <!-- page main -->
    <div class="bottom-layout">
      <div class="main">
        <div v-if="active === 0">
          <mu-list v-if="postList.length !== 0" textline="three-line" style="padding: 0">
            <mu-list-item class="list-item" v-for="(postItem, index) in postList" :ripple="false" button :key="index" @click="linkTo('post', postItem._id)">
              <mu-list-item-content>
                <mu-list-item-title style="text-align: center;">
                  {{ postItem.title }}
                  <mu-badge
                    v-if="activityList.length === (index + 2)"
                    style="margin-left: 10px;"
                    content="new"
                    color="secondary"
                  ></mu-badge>
                </mu-list-item-title>
                <mu-list-item-sub-title style="text-align: center;">
                  {{ postItem.summary }}
                </mu-list-item-sub-title>
                <mu-list-item-sub-title style="text-align: center;">
                  {{ postItem.createAt }}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <div v-else class="no-content">暂时没有文章</div>
        </div>
        <div v-if="active === 1">
          <mu-text-field
            v-if="isLogin && isAdmin"
            v-model="activity.content"
            @keypress.enter="createActivity"
            placeholder="说说看自己的心情或者最近发生了什么事情吧"
            style="margin: 0 auto; width: 100%;"
            class="activity-input"
          ></mu-text-field>
          <mu-list v-if="isLogin" style="padding: 0">
            <mu-list-item
              class="list-item"
              v-for="(activityItem, index) in activityList"
              :ripple="true"
              button
              :key="index"
              @click="linkTo('activity', activityItem._id)"
            >
              <mu-list-item-content>
                <mu-list-item-title style="text-align: center;">
                  {{ activityItem.content }}
                  <mu-badge
                    v-if="activityList.length === (index + 2)"
                    style="margin-left: 10px;"
                    content="new"
                    color="secondary"
                  ></mu-badge>
                  <span
                    v-if="isAdmin"
                    style="color: #ccc; margin-left: 10px; cursor: pointer; position: relative; z-index: 10"
                    @click.stop="confirm(activityItem._id)"
                  >
                    删除
                  </span>
                </mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <div class="un-login" v-if="!isLogin">
            未登录不能够浏览此内容，请登录
          </div>
          <div class="no-content" v-if="activityList.length === 0 && isLogin">
            暂时没有动态
          </div>
        </div>
        <div v-if="active === 2">
          <mu-text-field v-if="isLogin && !isAdmin" @keypress.enter="createMessage" v-model="message.content" placeholder="留下点什么痕迹吧" style="margin: 0 auto; width: 100%;" class="activity-input"></mu-text-field>
          <mu-list v-if="isLogin" textline="two-line" style="padding: 0">
            <mu-list-item class="list-item" v-for="(messageItem, index) in messageList" :ripple="false" button :key="index" @click="linkTo('message', messageItem._id)">
              <mu-list-item-content>
                <mu-list-item-title style="text-align: center;">{{ messageItem.username }}</mu-list-item-title>
                <mu-list-item-sub-title style="text-align: center;">
                  {{ messageItem.content }}
                  <mu-badge
                    v-if="activityList.length === (index + 2)"
                    style="margin-left: 10px;"
                    content="new"
                    color="secondary"
                  ></mu-badge>
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
          <div class="un-login" v-else>
            未登录不能够浏览此内容，请登录
          </div>
          <div class="no-content" v-if="messageList.length === 0 && isLogin">
            暂时没有动态
          </div>
        </div>
        <!-- <div v-if="active === 3">
          <div v-if="isLogin && videoList.length !== 0">
          </div>
          <div v-else-if="videoList.length === 0 && isLogin" class="no-content">
            暂时没有视频
          </div>
          <div class="un-login" v-else>
            未登录不能够浏览此内容，请登录
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Toast from 'muse-ui-toast'

export default {
  data () {
    return {
      // 临时ajax请求url
      url: 'http://localhost:4000/blog/api/',
      // banner图片 3张
      // bannerImg1: 'https://placem.at/places?w=750&h=400&txt=0',
      // bannerImg2: 'https://placem.at/things?w=750&h=400&txt=0',
      // bannerImg3: 'https://placem.at/people?w=750&h=400&txt=0',
      // tab激活状态 0 文章 | 1 动态 | 2 留言
      active: 0,
      activityList: [],
      messageList: [],
      postList: [],
      videoList: [],
      activity: {
        content: '',
        createAt: ''
      },
      message: {
        content: '',
        createAt: '',
        username: ''
      }
    }
  },
  props: ['isLogin', 'isAdmin', 'username', 'userId'],
  created () {
    this.getPostList()
    this.getActivityList()
    this.getMessageList()
  },
  methods: {
    linkTo (page, id) {
      switch (page) {
        case 'index':
          this.$router.push('index')
          break
        case 'about':
          this.$router.push('about')
          break
        case 'resume':
          this.$router.push('resume')
          break
        case 'post':
          this.$router.push(`post?id=${id}`)
          break
        case 'activity':
          this.$router.push(`activity?id=${id}`)
          break
        case 'message':
          this.$router.push(`message?id=${id}`)
          break
        case 'login':
          this.hideDialog('register')
          this.showDialog('login')
          break
        case 'register':
          this.hideDialog('login')
          this.showDialog('register')
          break
        default:
          break
      }
    },
    getPostList () {
      axios.get(`${this.url}post/list`).then(res => {
        if (res.data.code === 0) {
          this.postList = res.data.result
        } else {
          Toast.warning(res.data.message)
        }
      })
    },
    getActivityList () {
      axios.get(`${this.url}activity/list`).then(res => {
        if (res.data.code === 0) {
          this.activityList = res.data.result
        } else {
        }
      })
    },
    getMessageList () {
      axios.get(`${this.url}message/list`).then(res => {
        if (res.data.code === 0) {
          this.messageList = res.data.result
        } else {
        }
      })
    },
    createActivity () {
      let activity = this.activity
      activity.createAt = new Date()
      axios.post(`${this.url}activity/create`, { activity }).then(res => {
        if (res.data.code === 0) {
          this.activity.content = ''
          this.getActivityList()
          Toast.success(res.data.message)
        } else {
          Toast.success(res.data.message)
        }
      })
    },
    createMessage () {
      let message = this.message
      message.createAt = new Date()
      message.username = this.$cookies.get('userinfo').username
      axios.post(`${this.url}message/create`, { message }).then(res => {
        if (res.data.code === 0) {
          this.message.content = ''
          this.getMessageList()
          Toast.success(res.data.message)
        } else {
          Toast.success(res.data.message)
        }
      })
    },
    deleteActivity (id) {
      axios.post(`${this.url}activity/delete`, { id }).then(res => {
        if (res.data.code === 0) {
          this.message.content = ''
          this.getActivityList()
          Toast.success(res.data.message)
        } else {
          Toast.success(res.data.message)
        }
      })
    },
    confirm (id) {
      this.$confirm('是否要删除这条动态', '注意').then(res => {
        if (res.result) {
          this.deleteActivity(id)
        }
      })
    }
  }
}
</script>

<style scoped>
#index {
  display: flex;
  flex-direction: column;
}

.bottom-layout {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.un-login, .no-content {
  text-align: center;
  padding: 20px;
}

.activity-input >>> input {
  text-align: center;
}

.list-item {
  border-bottom: 1px solid #f5f5f5;
}
</style>
