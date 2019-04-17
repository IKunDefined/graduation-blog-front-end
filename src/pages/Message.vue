<template>
  <div id="message">
    <div class="main">
      <div class="content">
        {{ message.content }}
      </div>
    </div>
    <div class="footer">
      - Blog of IKunDefined -
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      messageId: '',
      message: {}
    }
  },
  created () {
    this.messageId = location.href.split('?')[1].split('=')[1]
    let userinfo = this.$cookies.get('userinfo')
    if (userinfo) {
      this.isLogin = true
      this.userId = userinfo._id
      this.isAdmin = userinfo.isAdmin
      this.username = userinfo.username
    }
    this.getMessage()
  },
  methods: {
    getMessage () {
      axios.get(`http://localhost:4000/blog/api/message/query?id=${this.messageId}`).then(res => {
        if (res.data.code === 0) {
          this.message = res.data.message
        } else {
        }
      })
    },
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
    }
  }
}
</script>

<style scoped>
#message {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  padding: 20px;
}

.footer {
  height: 80px;
  line-height: 80px;
  text-align: center;
  width: 100%;
  background: #fff;
  border-top: 1px solid #f5f5f5;
}
</style>
