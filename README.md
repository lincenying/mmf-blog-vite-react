# mmf-blog react v3版

demo: [http://react.mmxiaowu.com](http://react.mmxiaowu.com)

#### 说明

本站采用 React, React-Router v4, Redux 搭建, 分成前台和后台

主要功能包括: 管理员, 用户, 分类, 文章, 评论, 文章点赞

主要技术栈: react, react-router, redux, redux-toolkit, vitejs, eslint

---

#### 其他版本

react spa class版本: [https://github.com/lincenying/mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)

react spa hooks版本: [https://github.com/lincenying/mmf-blog-vite-react](https://github.com/lincenying/mmf-blog-vite-react)

vue2 spa版本: [https://github.com/lincenying/mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)

vue2 ssr版本: [https://github.com/lincenying/mmf-blog-vue2-ssr](https://github.com/lincenying/mmf-blog-vue2-ssr)

vue3 spa版本: [https://github.com/lincenying/mmf-blog-vite-vue3](https://github.com/lincenying/mmf-blog-vite-vue3)

vue3 pwa ssr版本: [https://github.com/lincenying/mmf-blog-vite-vue3-ssr](https://github.com/lincenying/mmf-blog-vite-vue3-ssr)

---

先安装 api server:

koa2版: https://github.com/lincenying/mmf-blog-api-koa2-v2

express版: https://github.com/lincenying/mmf-blog-api-v2

```bash
# 1. 安装依赖 (不要用 cnpm 安装)
$ npm install
# or
$ yarn

# 2.1 产品模式
$ npm run build
# or
$ yarn build

# 2.2 开发模式
$ npm run serve
# or
$ yarn serve

```

## docker-compose

使用`docker-compose`, 将会从`docker hub`拉取`api-server`镜像, 并且启动容器

```yaml
api:
  container_name: api-server
  image: lincenying/api-server:1.0.1
```

修改`docker-compose.yml`中的`mongo.volumes`配置, 将宿主机数据库路径映射到容器中

```yaml
volumes:
  - /Users/lincenying/web/mongodb/data:/data/db
```

```bash
# 生成镜像及启动容器
# 后端服务器一起启动
docker-compose build
docker-compose up -d

# 如果后端服务器在宿主机或者其他容器上, 按照如下命令启动, 并且修改`nginx/conf.d/vue3-api.conf`里的`proxy_pass`配置
docker-compose -f docker-compose.api.yml build
docker-compose -f docker-compose.api.yml up -d
```

首页
http://localhost:7778

管理员登录
http://localhost:7778/backend

# LICENSE

MIT
