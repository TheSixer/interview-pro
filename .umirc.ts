import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'HSBC Interview',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8000/', // 目标域名
      changeOrigin: true, // 是否改变源地址
      pathRewrite: { '^/api': '' }, // 重写路径
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Chat',
    },
    {
      name: 'Funds',
      path: '/funds',
      component: './Funds',
    },
    {
      name: 'FundDetail',
      path: '/fund/:symbol',
      component: './FundDetail',
      hideInMenu: true,
    },
    {
      name: 'SymbolDetail',
      path: '/symbol/:symbol',
      component: './SymbolDetail',
      hideInMenu: true,
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  npmClient: 'pnpm',
});
