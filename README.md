# Graduation blog front end for graduation design

为毕业设计而制作的个性化分享博客**前端展示部分**

## 技术选型

### 核心技术

* Vue

### 相关辅助

* vue-cli@2
  * 快速构建基于Vue的SPA雏形
* muse-ui
  * 快速构建一套美观实用的UI界面
* vue-router
  * Vue的路由库
* axios
  * 向后端发送数据请求并处理返回结果
* vue-cookies
  * 处理Cookie
* material-icons
  * MuseUI使用到的图标库

## 项目部署

1. `git clone https://github.com/IKunDefined/graduation-blog-front-end-vue.git`
2. `npm install`
3. `npm start`
4. 在浏览器的`http://localhost:8080`运行

> 必须需搭配`graduation-blog-back-end-nodejs`才能正常运作，数据管理在`graduation-blog-cms-react`中展示，需要管理员身份
> 管理员身份需要手动修改，详情见`graduation-blog-back-end-nodejs`