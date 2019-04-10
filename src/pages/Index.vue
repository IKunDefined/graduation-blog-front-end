<template>
  <div>
    <!-- page header -->
    <mu-appbar>
      <mu-menu slot="left">
        <mu-button icon large class="sub-nav">
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="linkTo('about')">
            <mu-list-item-content>
              <mu-list-item-title>关于我</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="linkTo('resume')">
            <mu-list-item-content>
              <mu-list-item-title>个人简历</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      IKunDefined
      <mu-button v-if="!isLogin" slot="right" flat @click="showDialog('login')">登录</mu-button>
      <mu-button v-if="!isLogin" slot="right" flat @click="showDialog('register')">注册</mu-button>
      <mu-avatar v-if="isLogin" slot="right" style="margin-right: 10px;"></mu-avatar>
      <mu-button v-if="isLogin" slot="right" color="primary" @click="isPersonalDrawerShow = !isPersonalDrawerShow">{{ username }}</mu-button>
    </mu-appbar>
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
    <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  center>
      <mu-tab>文章</mu-tab>
      <mu-tab>动态</mu-tab>
      <mu-tab>留言</mu-tab>
    </mu-tabs>
    <!-- page main -->
    <div class="main">
      <div v-if="active === 0">
        <mu-list textline="three-line" style="padding: 0">
          <mu-list-item class="list-item" v-for="(postItem, index) in postList" :ripple="false" button :key="index" @click="linkTo('post')">
            <mu-list-item-content>
              <mu-list-item-title style="text-align: center;">{{ postItem.title }}</mu-list-item-title>
              <mu-list-item-sub-title style="text-align: center;">
                {{ postItem.summary }}
              </mu-list-item-sub-title>
              <mu-list-item-sub-title style="text-align: center;">
                {{ postItem.createAt }}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </div>
      <div v-if="active === 1">
        <mu-text-field v-if="isLogin && isAdmin" v-model="activity.content" @keypress.enter="createActivity" style="margin: 0 auto; width: 100%;" class="activity-input"></mu-text-field>
        <mu-list v-if="isLogin" style="padding: 0">
          <mu-list-item class="list-item" v-for="(activityItem, index) in activityList" :ripple="false" button :key="index" @click="linkTo('activity')">
            <mu-list-item-content>
              <mu-list-item-title style="text-align: center;">{{ activityItem.content }}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <div class="un-login" v-else>
          未登录不能够浏览此内容，请登录
        </div>
      </div>
      <div v-if="active === 2">
        <mu-text-field v-if="isLogin && !isAdmin" @keypress.enter="createMessage" v-model="message.content" style="margin: 0 auto; width: 100%;" class="activity-input"></mu-text-field>
        <mu-list v-if="isLogin" textline="two-line" style="padding: 0">
          <mu-list-item class="list-item" v-for="(messageItem, index) in messageList" :ripple="false" button :key="index" @click="linkTo('message')">
            <mu-list-item-content>
              <mu-list-item-title style="text-align: center;">{{ messageItem.username }}</mu-list-item-title>
              <mu-list-item-sub-title style="text-align: center;">
                {{ messageItem.content }}
              </mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
        <div class="un-login" v-else>
          未登录不能够浏览此内容，请登录
        </div>
      </div>
    </div>
    <div class="footer">
      - Blog of IKunDefined -
    </div>
    <!-- login dialog -->
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="isLoginDialogShow">
      <mu-appbar color="primary" title="登录">
        <mu-button slot="right" icon  @click="hideDialog('login')">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
          <mu-form-item prop="input" label="用户名">
            <mu-text-field v-model="form.username"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="password" label="密码">
            <mu-text-field type="password" v-model="form.password"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="primary" @click="login">提交</mu-button>
            <mu-button @click="linkTo('register')">去注册</mu-button>
          </mu-form-item>
        </mu-form>
      </div>
    </mu-dialog>
    <!-- register dialog -->
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="isRegisterDialogShow">
      <mu-appbar color="primary" title="注册">
        <mu-button slot="right" icon @click="hideDialog('register')">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
          <mu-form-item prop="input" label="用户名">
            <mu-text-field v-model="form.username"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" label="密码">
            <mu-text-field type="password" v-model="form.password"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" label="重复密码">
            <mu-text-field type="password" v-model="form.repassword"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="primary" @click="register">提交</mu-button>
            <mu-button @click="linkTo('login')">去登录</mu-button>
          </mu-form-item>
        </mu-form>
      </div>
    </mu-dialog>
    <mu-drawer :open.sync="isPersonalDrawerShow" :docked="isDocked" :right="drawerPosition === 'right'">
      <mu-list>
        <mu-list-item v-if="isLogin && isAdmin" button href="http://localhost:8081/">
          <mu-list-item-action>
            <mu-icon value="perm_identity"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            进入管理空间
          </mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="logout">
          <mu-list-item-action>
            <mu-icon value="power_settings_new"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>注销</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="isPersonalDrawerShow = false" button>
          <mu-list-item-action>
            <mu-icon value="highlight_off"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>关闭</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import axios from 'axios'
import Toast from 'muse-ui-toast'

export default {
  data () {
    return {
      // 临时ajax请求url
      url: 'http://localhost:3000/blog/api/',
      // banner图片 3张
      // bannerImg1: 'https://placem.at/places?w=750&h=400&txt=0',
      // bannerImg2: 'https://placem.at/things?w=750&h=400&txt=0',
      // bannerImg3: 'https://placem.at/people?w=750&h=400&txt=0',
      // tab激活状态 0 文章 | 1 动态 | 2 留言
      active: 0,
      // 登录 | 注册 弹框显示控制开关
      isLoginDialogShow: false,
      isRegisterDialogShow: false,
      labelPosition: 'top',
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      activityList: [],
      messageList: [],
      postList: [],
      isLogin: false,
      isAdmin: false,
      username: '',
      userId: '',
      isPersonalDrawerShow: false,
      drawerPosition: 'right',
      isDocked: false,
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
  created () {
    let userinfo = this.$cookies.get('userinfo')
    if (userinfo) {
      this.isLogin = true
      this.userId = userinfo._id
      this.isAdmin = userinfo.isAdmin
      this.username = userinfo.username
    }
    this.getPostList()
    this.getActivityList()
    this.getMessageList()
  },
  methods: {
    linkTo (page) {
      switch (page) {
        case 'about':
          this.$router.push('about')
          break
        case 'resume':
          this.$router.push('resume')
          break
        case 'post':
          this.$router.push('post')
          break
        case 'activity':
          this.$router.push('activity')
          break
        case 'message':
          this.$router.push('message')
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
    showDialog (type) {
      switch (type) {
        case 'login':
          this.isLoginDialogShow = true
          break
        case 'register':
          this.isRegisterDialogShow = true
          break
        default:
          break
      }
    },
    hideDialog (type) {
      switch (type) {
        case 'login':
          this.isLoginDialogShow = false
          break
        case 'register':
          this.isRegisterDialogShow = false
          break
        default:
          break
      }
    },
    login () {
      axios.post(`${this.url}user/login`, {
        username: this.form.username,
        password: this.form.password
      }).then(res => {
        if (res.data.code === 0) {
          this.form.username = ''
          this.form.password = ''
          this.isLogin = true
          this.username = res.data.userinfo.username
          this.userId = res.data.userinfo.username
          this.isAdmin = res.data.userinfo.isAdmin
          this.$cookies.set('userinfo', res.data.userinfo)
          Toast.success(res.data.message)
          this.hideDialog('login')
        } else {
          Toast.warning(res.data.message)
        }
      })
    },
    register () {
      axios.post(`${this.url}user/register`, {
        username: this.form.username,
        password: this.form.password,
        repassword: this.form.repassword
      }).then(res => {
        if (res.data.code === 0) {
          Toast.success(res.data.message)
          this.hideDialog('register')
          this.showDialog('login')
        } else {
          Toast.warning(res.data.message)
        }
      })
    },
    logout () {
      this.isLogin = false
      this.$cookies.remove('userinfo')
      this.isPersonalDrawerShow = false
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
    }
  }
}
</script>

<style scoped>
.sub-nav {
  top: 50%;
  transform: translateY(-50%);
}

.main {
  margin-bottom: 80px;
}

.footer {
  position: fixed;
  bottom: 0;
  height: 80px;
  line-height: 80px;
  text-align: center;
  width: 100%;
  background: #fff;
  border-top: 1px solid #f5f5f5;
}

.un-login {
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
