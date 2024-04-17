export default {
  pages: ['pages/index/index', 'pages/logs/logs'],
  window: { navigationBarTextStyle: 'black', navigationStyle: 'custom' },
  style: 'v2',
  rendererOptions: {
    skyline: {
      defaultDisplayBlock: true,
      disableABTest: true,
      sdkVersionBegin: '3.0.0',
      sdkVersionEnd: '15.255.255',
    },
  },
  resolveAlias: {
    'config/*': 'config/*',
    'services/*': 'services/*',
    'model/*': 'model/*',
    'utils/*': 'utils/*',
    'components/*': 'components/*',
    'tdesign-miniprogram/*': 'miniprogram_npm/tdesign-miniprogram/*',
  },
  componentFramework: 'glass-easel',
  sitemapLocation: 'sitemap.json',
  lazyCodeLoading: 'requiredComponents',
}
