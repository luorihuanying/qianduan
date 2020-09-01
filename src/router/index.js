import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import devRouter from './modules/devManagement'
import dataCenterRouter from './modules/dataCenter'
import chartRouter from './modules/chartsDisplay'
import amap from '@/views/amap/'
/** hidden: true // (默认 false)

//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noRedirect'

//当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
//只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
//若你想不管路由下面的 children 声明的个数都显示你的根路由
//你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta: {
  roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' //设置该路由的图标
  noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
}
*/
/**
  * constantRoutes
  * a base page that does not have permission requirements
  * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: false
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: false
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: false
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: '首页',
    children: [
      {
        path: 'index',
        name: '地图监控',
        component: amap,
        meta: {
          title: '地图监控',
          icon: 'map'
        }
      }
    ]
  }
]
export const asyncRoutes = [
  devRouter,
  dataCenterRouter,
  chartRouter,

  // 404页必须放在末尾！!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
