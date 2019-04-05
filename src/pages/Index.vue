<template>
  <div>
    <mu-appbar>
      <mu-menu slot="left">
        <mu-button icon large>
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>关于我</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>个人简历</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      IKunDefined
      <mu-button slot="right" flat @click="showDialog('login')">登录</mu-button>
      <mu-button slot="right" flat @click="showDialog('register')">注册</mu-button>
    </mu-appbar>
    <mu-carousel style="height: 400px;">
      <mu-carousel-item>
        <img :src="bannerImg1" />
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="bannerImg2" />
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="bannerImg3" />
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="bannerImg4" />
      </mu-carousel-item>
      <mu-carousel-item>
        <img :src="bannerImg5" />
      </mu-carousel-item>
    </mu-carousel>
    <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  center>
      <mu-tab>文章</mu-tab>
      <mu-tab>动态</mu-tab>
      <mu-tab>留言</mu-tab>
    </mu-tabs>
    <div v-if="active === 0">
      文章内容
    </div>
    <div v-if="active === 1">
      动态内容
    </div>
    <div v-if="active === 2">
      留言内容
    </div>
    <mu-dialog title="Dialog" width="360" :open.sync="isLoginDialogShow">
      this is login Dialog
      <mu-button slot="actions" flat color="primary" @click="hideDialog('login')">Close</mu-button>
    </mu-dialog>
    <mu-dialog title="Dialog" width="360" :open.sync="isRegisterDialogShow">
      this is register Dialog
      <mu-button slot="actions" flat color="primary" @click="hideDialog('register')">Close</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bannerImg1: 'https://placem.at/places?w=750&h=400&txt=0',
      bannerImg2: 'https://placem.at/things?w=750&h=400&txt=0',
      bannerImg3: 'https://placem.at/people?w=750&h=400&txt=0',
      bannerImg4: 'https://placem.at/places?w=750&h=400&txt=0',
      bannerImg5: 'https://placem.at/places?w=750&h=400&txt=0',
      active: 0,
      isLoginDialogShow: false,
      isRegisterDialogShow: false
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
a.mu-button {
  vertical-align: middle;
}
</style>
