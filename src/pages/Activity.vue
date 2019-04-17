<template>
  <div id="activity">
    <div class="main">
      <div class="left">
        <div class="activity">
          <mu-list textline="three-line" style="padding: 0; box-shadow: 0 0 1px 1px #ccc;">
            <mu-list-item avatar :ripple="false" button style="background: #fff;">
              <mu-list-item-action>
                <mu-avatar>
                  <!-- <img src="../../assets/images/avatar1.jpg"> -->
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ activity.createAt }}</mu-list-item-title>
                <mu-list-item-sub-title>
                  {{ activity.content }}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </div>
        <div class="comment" v-if="isLogin">
          <div class="comment-main" v-if="activity.comment.length !== 0">
            <mu-expansion-panel v-for="(item, index) in activity.comment" :key="index">
              <div slot="header">{{ item.username }}</div>
              {{ item.content }}
            </mu-expansion-panel>
          </div>
          <div class="no-content" v-if="activity.comment.length === 0">还没有评论，来抢沙发吧！</div>
          <div class="comment-input" v-if="!isAdmin">
            <mu-text-field v-model="comment" label="评论一下这条动态吧" full-width @keypress.enter="leaveComment"></mu-text-field>
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
      activityId: '',
      activity: {
        comment: []
      },
      comment: ''
    }
  },
  created () {
    this.activityId = location.href.split('?')[1].split('=')[1]
    let userinfo = this.$cookies.get('userinfo')
    if (userinfo) {
      this.isLogin = true
      this.userId = userinfo._id
      this.isAdmin = userinfo.isAdmin
      this.username = userinfo.username
    }
    this.getActivity()
  },
  methods: {
    getActivity () {
      axios.get(`http://localhost:4000/blog/api/activity/query?id=${this.activityId}`).then(res => {
        if (res.data.code === 0) {
          this.activity = res.data.activity
        } else {
        }
      })
    },
    leaveComment () {
      let comment = {}
      comment.content = this.comment
      comment.username = this.$cookies.get('userinfo').username
      comment.userId = this.$cookies.get('userinfo')._id
      comment.activityId = this.activityId
      axios.post(`http://localhost:4000/blog/api/activity/comment/leave`, { comment }).then(res => {
        if (res.data.code === 0) {
          this.comment = ''
          this.getActivity()
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
#activity {
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

.left {
  width: 69%;
}

.right {
  width: 30%;
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

.footer {
  height: 80px;
  line-height: 80px;
  text-align: center;
  width: 100%;
  background: #fff;
  border-top: 1px solid #f5f5f5;
}
</style>
