<template>
  <div id="app">
    <!-- page header -->
    <mu-appbar style="width: 100%;">
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
      <span class="main-title" @click="linkTo('index')">IKunDefined</span>
      <mu-button v-if="!isLogin" slot="right" flat @click="showDialog('login')">登录</mu-button>
      <mu-button v-if="!isLogin" slot="right" flat @click="showDialog('register')">注册</mu-button>
      <mu-avatar v-if="isLogin" slot="right" style="margin-right: 10px;"></mu-avatar>
      <mu-button v-if="isLogin" slot="right" color="primary" @click="isPersonalDrawerShow = !isPersonalDrawerShow">{{ username }}</mu-button>
    </mu-appbar>
    <!-- main content -->
    <router-view :is-login="isLogin" :is-admin="isAdmin"/>
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
    <!-- personal dialog -->
    <mu-dialog width="360" transition="slide-right" fullscreen :open.sync="isPersonalDialogShow">
      <mu-appbar color="primary" title="个人信息修改">
        <mu-button slot="right" icon @click="hideDialog('personal')">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        <div>修改头像</div>
        <div>修改用户名</div>
        <div>修改密码</div>
      </div>
    </mu-dialog>
    <!-- personal sidebar -->
    <mu-drawer :open.sync="isPersonalDrawerShow" :docked="isDocked" :right="drawerPosition === 'right'">
      <mu-list>
        <mu-list-item v-if="isLogin" button @click="isPersonalDialogShow = true">
          <mu-list-item-action>
            <mu-icon value="account_circle"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            修改个人资料
          </mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="isLogin && isAdmin" button href="http://localhost:3000/">
          <mu-list-item-action>
            <mu-icon value="perm_identity"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            进入管理空间
          </mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="confirm">
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
  name: 'App',
  data () {
    return {
      url: 'http://localhost:4000/blog/api/',
      isLogin: false,
      isAdmin: false,
      username: '',
      userId: '',
      isLoginDialogShow: false,
      isRegisterDialogShow: false,
      isPersonalDialogShow: false,
      // 登录 | 注册 弹框显示控制开关
      labelPosition: 'top',
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      isPersonalDrawerShow: false,
      drawerPosition: 'right',
      isDocked: false
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
    showDialog (type) {
      switch (type) {
        case 'login':
          this.isLoginDialogShow = true
          break
        case 'register':
          this.isRegisterDialogShow = true
          break
        case 'personal':
          this.isPersonalDialogShow = true
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
        case 'personal':
          this.isPersonalDialogShow = false
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
          window.location.reload()
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
      window.location.reload()
      Toast.success('注销成功')
    },
    confirm () {
      this.$confirm('是否退出登录', '注意').then(res => {
        if (res.result) {
          this.logout()
        }
      })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}

.sub-nav {
  top: 50%;
  transform: translateY(-50%);
}

.main-title {
  cursor: pointer;
}
</style>
