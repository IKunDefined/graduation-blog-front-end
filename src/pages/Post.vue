<template>
  <div id="post">
    <div class="main">
      <div class="post">
        <h1>{{ post.title }}</h1>
        <div class="info">
          <span>发布时间：{{ post.createAt }}</span>
        </div>
        <div class="content">
          {{ post.content }}
        </div>
        <div class="tag"></div>
      </div>
      <mu-card style="width: 30%;">
        <mu-card-header title="Myron Avatar" sub-title="sub title">
          <mu-avatar slot="avatar">
            <!-- <img src="../../assets/images/uicon.jpg"> -->
          </mu-avatar>
        </mu-card-header>
        <mu-card-media title="Image Title" sub-title="Image Sub Title">
          <img src="../assets/images/post/1.jpg">
        </mu-card-media>
        <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
        <mu-card-text>
          还不知道放什么东西
        </mu-card-text>
        <mu-card-actions>
          <mu-button flat>Action 1</mu-button>
          <mu-button flat>Action 2</mu-button>
        </mu-card-actions>
      </mu-card>
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
      postId: '',
      post: {}
    }
  },
  created () {
    this.postId = location.href.split('?')[1].split('=')[1]
    let userinfo = this.$cookies.get('userinfo')
    if (userinfo) {
      this.isLogin = true
      this.userId = userinfo._id
      this.isAdmin = userinfo.isAdmin
      this.username = userinfo.username
    }
    this.getPost()
  },
  methods: {
    getPost () {
      axios.get(`http://localhost:3000/blog/api/post/query?id=${this.postId}`).then(res => {
        if (res.data.code === 0) {
          this.post = res.data.post
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
#post {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.post {
  height: 100%;
  width: 69%;
  padding: 20px;
  box-shadow: 0 0 1px 1px #ccc;
}

.post .info {
  display: flex;
  justify-content: center;
}

h1 {
  margin: 0;
  text-align: center;
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
