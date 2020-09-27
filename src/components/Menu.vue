<template>
  <div>
    <template v-for="(menu,index) in menuList">
      <el-submenu :index="menu.name"
                  :key="index"
                  :class="{'menu-active': menu.name == activeRouteName}"
                  v-if="menu.renderChildren || (menu.children && menu.children.length > 1)">
        <template slot="title">
          <i :class="menu.meta.iconClass"></i>
          <span slot="title">{{ menu.meta.label }}</span>
        </template>
        <Menu :menu-list="menu.children"></Menu>
      </el-submenu>
      <el-menu-item v-else
                    :index="menu.name"
                    :key="index"
                    :class="{'menu-active': menu.name == activeRouteName}"
                    @click="$router.push({name:menu.name})">
        <i :class="menu.meta.iconClass"></i>
        <span slot="title">{{ menu.meta.label }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import Menu from './Menu'
export default {
  name: 'Menu',
  components: {
    Menu
  },
  props: {
    menuList: {
      type: Array
    },
    activeRouteName: {
      type: String
    }
  },
  data () {
    return {}
  }

}
</script>

<style>
.el-menu--collapse .el-submenu .el-submenu__title > span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse .el-submenu .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
