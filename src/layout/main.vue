<template>
  <div class="home-page">
    <div class="app-nav"
         :style="{width: navWidth, background: backgroundColor}">
      <el-menu class="el-menu-vertical-demo"
               :collapse="isCollapse"
               :default-active="activeRouteName"
               :background-color="backgroundColor"
               :text-color="textColor"
               :active-text-color="activeTextColor">
        <Menu :menu-list="menuList" :active-route-name="activeRouteName"></Menu>
      </el-menu>
    </div>
    <div class="app-header clear"
         :style="{left: navWidth}">
      <span class="icon-bar-box"
            :class="{'is-collapse': isCollapse}"
            @click="isCollapse= !isCollapse">
        <i class="el-icon-minus"></i>
        <i class="el-icon-minus"></i>
        <i class="el-icon-minus"></i>
      </span>
      <el-breadcrumb separator="/"
                     class="breadcrumb-box">
        <el-breadcrumb-item :to="{'name': 'Home'}">
          <span>主页</span>
        </el-breadcrumb-item>
        <template v-for="(item, index) in breadList">
          <el-breadcrumb-item :key="index"
                              v-if="item.meta.label"
                              :to="{'name': item.name}">
            <span>{{ item.meta.label }}</span>
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <div class="user-info-box fr">
        <el-dropdown>
          <div>
            <img class="user-img" :src="userImg">
            <span class="username">{{username}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="toLogout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="app-content"
         ref="appContent"
         :style="{ left: navWidth }">
      <router-view :is-collapse="isCollapse" />
    </div>
  </div>
</template>
<script>
import { menuRouter } from '@/router/index'
import Menu from '@/components/Menu'
/* eslint-disable */
const { navConfig:config } = window.config
export default {
  name: 'MainLayout',
  components: {
    Menu
  },
  data () {
    return {
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      activeTextColor: config.activeTextColor,
      navDefaultWidth: config.navDefaultWidth,
      navCollapseWidth: config.navCollapseWidth,
      menuList: menuRouter,
      activeRouteName: null,
      isCollapse: false,
      username: 'Nick',
      userImg: 'https://placem.at/people?w=80'
    }
  },
  computed: {
    navWidth () {
      return this.isCollapse ? `${this.navCollapseWidth}px` : `${this.navDefaultWidth}px`
    },
    breadList () {
      const temp = this.$route.matched
      temp.shift()
      return temp
    }
  },
  watch: {
    '$route.path': {
      handler (val) {
        const nameArr = val.split('/')
        if (nameArr[nameArr.length - 1] !== 'index') {
          this.activeRouteName = nameArr[nameArr.length - 1]
        } else {
          this.activeRouteName = nameArr[nameArr.length - 2]
        }
      },
      immediate: true
    }
  },
  methods: {
    toLogout () {
      sessionStorage.removeItem('token')
      this.$message.success('退出登录....')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.home-page {
  min-width: 500px;
}
.app-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 0 0 10px 0 #ccc;
  z-index: 2001;
  overflow: hidden;
  overflow-y: auto;
  transition: all 0.4s;
  padding-top: 100px;
  .el-menu {
    border-right: none;
  }
}
.app-header {
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  height: 48px;
  line-height: 48px;
  background: #fff;
  box-shadow: 0 0 10px 0 #80848f;
  padding: 0 10px;
  transition: all 0.4s;
  min-width: 400px;
  .icon-bar-box {
    display: inline-block;
    position: relative;
    height: 30px;
    width: 30px;
    transform: rotate(0);
    transition: all 0.4s;
    vertical-align: middle;
    cursor: pointer;
    i {
      position: absolute;
      font-size: 24px;
      left: 3px;
      color: #262626;
      font-weight: bold;
      &:nth-child(1) {
        top: -2px;
      }
      &:nth-child(2) {
        top: 4px;
      }
      &:nth-child(3) {
        top: 10px;
      }
    }
    &.is-collapse {
      transform: rotate(90deg);
      transition: all 0.4s;
    }
  }
  .breadcrumb-box {
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
  }
  .user-info-box {
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    cursor: pointer;
    img {
      width: 36px;
      height: 36px;
      box-sizing: border-box;
      border: 2px solid #f0a044;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .username {
      font-size: 14px;
      color: #778;
      font-weight: bold;
      margin-left: 3px;
      text-transform: capitalize;
    }
  }
}
.app-content {
  position: absolute;
  top: 48px;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 20px;
  background: #f8f8f9;
  font-size: 14px;
  transition: all 0.4s;
  min-width: 400px;
}
</style>
