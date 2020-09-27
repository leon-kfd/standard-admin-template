window.config = {
  publicPath: '/',                 // 资源打包路径
  baseURL: '/api',                    // 后端API请求地址BaseURL
  routerMode: 'history',              // Vue-router路由模式

  navConfig: {
    backgroundColor: '#545c64',       // 导航栏背景色
    textColor: '#fff',                // 导航栏字体颜色
    activeTextColor: '#ffd04b',       // 导航栏激活状态字体颜色
    navDefaultWidth: 200,             // 导航栏展开宽度
    navCollapseWidth: 64              // 导航栏缩起宽度
  },
  axiosPendingListAutoCancel: true    // 切换导航自动取消之前未完成请求
}
