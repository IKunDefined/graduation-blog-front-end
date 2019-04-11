<template>
  <div id="about">
    <div class="main">
      <div>
        <h1>关于我</h1>
        <div>
          <p>我是一名ACG爱好者，同时也是一名前端技术爱好者和开发者。</p>
          <p>关于技术相关的详细信息可以去<a href="#">个人简历页面</a>浏览，在这里，我会把我想说的<strong>关于我的内容</strong>告诉能来到这里的你！</p>
        </div>
        <div class="basic-info">
          <h2>基本信息</h2>
          <div class="content">
            <div>
              <p>性别：男</p>
              <p>生日：1996-10-05</p>
              <p>血型：O</p>
              <p>星座：天秤</p>
            </div>
            <div>
              <p>常驻：上海</p>
              <p>家乡：芜湖</p>
              <p>职业：前端工程师</p>
              <p>邮箱：1581740452@qq.com</p>
            </div>
            <div>
              <p>QQ：1581740452</p>
              <p>手机：13955416891</p>
              <p>住址：上海市长宁区新泾镇新泾家苑1号302室</p>
            </div>
          </div>
        </div>
        <div class="nickname">
          <h2>昵称</h2>
          <div>
            <h3>IKunDefined</h3>
            <p>作为程序员身份活动的称呼，根据ike的称呼而来，ike的来源在下一个关于依可这个名字的由来里会介绍。</p>
            <p>原本是想叫做IKun，IK即ike的IK，后面加上un和前面的K合在一起即Kun，是日语中的君的发音，这样一来IKun这个名字也可以看成是IK君！并不是cxk粉丝的自称！不过这个名字在B站被使用了，所以就没有采用了。</p>
            <p>因为这个名字被注册了，所以思考了片刻后冒出了注册过的话那就是已经被定义了，而未被定义的变量是undefined，可以和之前的IKun这个名字叠加起来编程IKundefined，但是这样看起来有点枯燥，就加上了js中常用的变量驼峰式命名，即IKunDefined！</p>
            <h3>依可</h3>
            <p>依可是我作为WOTA艺打师活动的名字，对于我来说有重要的意义，因为WOTA艺对我来说是非比寻常的存在，同时依可这个身份也是我生活中最重要的一面。</p>
            <p>依可这个名字并不是我早期活动的称呼，而是在打艺的第二年改用的，其原因是因为当初非常沉迷的乐队SPYAIR的主唱的称呼是ike，当时SPYAIR的很多歌的歌词都影响了我的生活心态，也是因为这点才有了以这个乐队的因素作为新的圈名重新开始的念头。</p>
            <p>跟WOTA艺的关联也是命名原因的重点！喜爱上SPYAIR是因为我非常憧憬的WOTA艺打师夜瞑经常使用SPYAIR的歌曲作为剧情向企划的使用歌曲，在沉迷于暴力的打风的同时，被激烈的旋律所吸引了。</p>
            <h3>珏</h3>
            <p>偶尔会有人称我为珏、珏儿、珏少、珏爷等等。。。是因为现实生活中的名字里有珏这个字，我也并不讨厌这样的称呼，硬要说的话，还是喜欢更多一点。</p>
          </div>
        </div>
        <div class="hobby">
          <h2>爱好</h2>
          <div>
            <h3>WOTA艺</h3>
            <h3>ACG文化</h3>
            <h3>前端编程</h3>
          </div>
        </div>
        <div class="character">
          <h2>人设</h2>
          <div>
            <h3>自我主义</h3>
            <h3>打痴</h3>
            <h3>中二病</h3>
            <h3>渣男</h3>
            <h3>社畜</h3>
            <h3>极端</h3>
            <h3>SNS依存症</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      - Blog of IKunDefined -
    </div>
  </div>
</template>

<style scoped>
#about {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  padding: 20px;
}

.main > div {
  border-radius: 5px;
  box-shadow: 0 0 1px 1px #ccc;
  padding: 20px;
}

h1, h2 {
  margin: 0;
}

.basic-info,
.nickname,
.hobby,
.character {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.basic-info .content {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}

.character {
  margin-bottom: 0;
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
