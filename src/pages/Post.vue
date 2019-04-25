<template>
  <div id="post">
    <div class="main">
      <div class="left">
        <div class="post">
          <h1>{{ post.title }}</h1>
          <div class="info">
            <span>发布时间：{{ post.createAt }}</span>
            <span>分类：{{ post.category.name }}</span>
          </div>
          <post-content :content="post.content"/>
          <div class="post-bottom">
            <div>
              <mu-chip v-for="(item, index) in post.tags" :key="index" color="primary">{{ item.name }}</mu-chip>
            </div>
            <mu-button v-if="likeStatus" fab small color="red" @click="like(true)">
              <mu-icon value="thumb_up"></mu-icon>
              {{ likeCount }}
            </mu-button>
            <mu-button v-else fab small color="gray" @click="like(false)">
              <mu-icon value="thumb_up"></mu-icon>
              <span v-if="!(likeCount === 0)">{{ likeCount }}</span>
            </mu-button>
          </div>
        </div>
        <div class="comment" v-if="isLogin">
          <div class="comment-main" v-if="post.comment.length !== 0">
            <mu-expansion-panel v-for="(item, index) in post.comment" :key="index">
              <div slot="header">{{ item.username }}</div>
              {{ item.content }}
            </mu-expansion-panel>
          </div>
          <div class="no-content" v-if="post.comment.length === 0">还没有评论，来抢沙发吧！</div>
          <div class="comment-input" v-if="!isAdmin">
            <mu-text-field v-model="comment" label="评论一下这篇文章吧" full-width @keypress.enter="leaveComment"></mu-text-field>
          </div>
        </div>
        <div class="un-login" v-if="!isLogin">未登录，不能查看评论</div>
      </div>
      <div class="right">
        <mu-card>
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Toast from 'muse-ui-toast'
import PostContent from '../components/PostContent.vue'

export default {
  components: {
    PostContent
  },
  data () {
    return {
      postId: '',
      post: {
        createAt: '',
        category: {
          name: ''
        },
        comment: []
      },
      comment: '',
      likeStatus: false,
      likeCount: 0
    }
  },
  created () {
    this.postId = location.href.split('?')[1].split('=')[1]
    this.getPost()
  },
  props: ['isLogin', 'isAdmin', 'username', 'userId'],
  methods: {
    getPost () {
      axios.get(`http://localhost:4000/blog/api/post/query?id=${this.postId}`).then(res => {
        if (res.data.code === 0) {
          this.post = res.data.post
          this.post.like.map(item => {
            if (item.likeStatus) {
              this.likeCount++
            }
          })
          this.post.like.map(item => {
            if (item.userId === this.userId) {
              this.likeStatus = item.likeStatus
            }
          })
        } else {
        }
      })
    },
    leaveComment () {
      let comment = {}
      comment.content = this.comment
      comment.username = this.$cookies.get('userinfo').username
      comment.userId = this.$cookies.get('userinfo')._id
      comment.postId = this.postId
      axios.post(`http://localhost:4000/blog/api/post/comment/leave`, { comment }).then(res => {
        if (res.data.code === 0) {
          this.comment = ''
          this.getPost()
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
    },
    like (status) {
      if (!this.userId) {
        Toast.warning('未登录无法点赞')
      } else {
        axios.post(`http://localhost:4000/blog/api/post/update`, {
          id: this.postId,
          userId: this.userId,
          username: this.username,
          status
        }).then(res => {
          if (res.data.code === 0) {
            Toast.success(res.data.message)
          } else {
            Toast.warning(res.data.message)
          }
        })
        this.likeStatus = !this.likeStatus
        if (status) {
          this.likeCount--
        } else {
          this.likeCount++
        }
      }
    }
  }
}
</script>

<style scoped>
#post {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.left {
  width: 69%;
}

.right {
  width: 30%;
}

.post {
  padding: 20px;
  box-shadow: 0 0 1px 1px #ccc;
}

.post .info {
  display: flex;
  justify-content: center;
}

.post-bottom {
  display: flex;
  justify-content: space-evenly;
}

.comment {
  margin-top: 20px;
}

.comment-input {
  margin-top: 20px;
}

.un-login,
.no-content {
  margin-top: 20px;
}

h1 {
  margin: 0;
  text-align: center;
}
</style>
