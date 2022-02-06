import Layout from '../layout'

export const asyncRoutes = [
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/category',
    name: 'goods',
    alwaysShow: true,
    meta: { title: '商品管理', icon: 'el-icon-s-goods', menuUrl: '/goods' },
    children: [
      {
        path: 'category',
        name: 'goodsCategory',
        component: () => import('@/views/goods/category'),
        meta: { title: '商品分类管理', icon: 'el-icon-paperclip', menuUrl: '/goods/category' }
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/goods/brand'),
        meta: { title: '品牌管理', icon: 'el-icon-price-tag', menuUrl: '/goods/brand' }
      },
      {
        path: 'attrGroup',
        name: 'attrGroup',
        component: () => import('@/views/goods/attrGroup'),
        meta: { title: '属性分组管理', icon: 'el-icon-set-up', menuUrl: '/goods/attrGroup' }
      },
      {
        path: 'attr',
        name: 'attr',
        component: () => import('@/views/goods/attr'),
        meta: { title: '规格参数&销售属性', icon: 'el-icon-guide', menuUrl: '/goods/attr' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    name: 'permission',
    alwaysShow: true,
    meta: { title: '权限管理', icon: 'el-icon-key', menuUrl: '/permission' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/permission/user'),
        meta: { title: '用户管理', icon: 'el-icon-user', menuUrl: '/permission/user' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/permission/role'),
        meta: { title: '角色管理', icon: 'el-icon-connection', menuUrl: '/permission/role' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
