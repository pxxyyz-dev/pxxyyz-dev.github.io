const moment = require('moment-timezone');
// const moment = require('moment');
const path = require('path');

module.exports = {
  base: '/',
  title: 'pxxyyz',
  // theme: 'antdocs',
  description: '卤蛋的自我修养',
  globalUIComponents: [
    'ThemeManager'
  ],
  port: 4000,
  lang: 'zh-CN',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/pxxyyz-dev/pxxyyz-dev.github.io',
    // 自定义仓库链接文字。
    // repoLabel: 'GitHub',
    nav: [
      { 
        text: "Profile", items: [
          { text: "Resume", link: "/profile/resume/" },
          { text: "About", link: "/profile/about/" },
          { text: "Projects", link: "/profile/projects/" },
        ],
      },
      { text: "Guide", link: "/guide/" },
      { text: "Math", link: "/posts/" }
    ],
    sidebar: {
      '/guide/': getGuideSidebar('样例','指南', '深入','插件'),
      '/posts/': getPostSidebar('应用','基础'),
    },
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    docsRepo: 'pxxyyz-dev/pxxyyz-dev.github.io',
    docsDir: 'docs',
    docsBranch: 'source',
    editLinks: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'author', content: 'pxxyyz' }],
    ['meta', { name: 'keywords', content: 'pxxyyz,blog' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#42b983' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/icons/icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icon_pxxyyz.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/images/icons/icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['script', {
      src: 'https://at.alicdn.com/t/font_1806861_o87e98icohb.js'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://at.alicdn.com/t/font_1806861_o87e98icohb.css'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css'
    }],
    ['link', {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.css"
    }]
  ],
  markdown: {
    extendMarkdown: md => {
      md.set({ html: true })
      md.use(require('@iktakahiro/markdown-it-katex'))
      md.use(require('markdown-it-footnote'))
    }
  },
  plugins: [
    ['@vuepress/back-to-top'],
    ['vuepress-plugin-smooth-scroll'],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    [
      '@vuepress/medium-zoom',
      {
        selector: '.theme-antdocs-content :not(a) > img',
        options: {
          margin: 24,
          background: '#bfbfbf',
          scrollOffset: 0,
        },
      }
    ],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // const moment = require('moment')
          // moment.locale(lang)
          // return moment(timestamp).fromNow()
          return moment(timestamp).tz('Asia/Shanghai').locale('zh-CN').format('lll')
        },
      },
    ],
  ],
};

function getGuideSidebar (groupA, groupB, groupC, groupD) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '/guide/demo/',
        '/guide/demo/markdown-demo',
        '/guide/demo/ant-design-components',
        '/guide/demo/advanced',
        '/guide/demo/customize'
      ]
    },
    {
    title: groupB,
      collapsable: false,
      children: [
        '/guide/guide/',
        '/guide/guide/getting-started',
        '/guide/guide/directory-structure',
        '/guide/guide/basic-config',
        '/guide/guide/assets',
        '/guide/guide/markdown',
        '/guide/guide/using-vue',
        '/guide/guide/i18n',
        '/guide/guide/deploy'
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        '/guide/advanced/frontmatter',
        '/guide/advanced/permalinks',
        '/guide/advanced/markdown-slot',
        '/guide/advanced/global-computed'
      ]
    },
    {
      title: groupD,
      collapsable: false,
      children: [
        '/guide/vuepress-plugins/mathjax',
        '/guide/vuepress-plugins/medium-zoom'
      ]
    }
  ]
}

function getPostSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        'SSA-L1',
        'PCA-L1',
        'PCA-Lp',
        'heteroskedastic-PCA',
        'Kernel-PCA',
        'functional-ssa',
        'circulant-ssa',
        'VMD',
        'VNCMD',
        'manifold-learning',
        'manifold-graph',
        'Sparse-PCA',
        'common-spatial-patterns',
        'nonlinear-projection-trick',
        'minimization-l1-l2',
        'majorization-minimization',
        'Structured-low-rank-approximation'
      ]
    },
    {
    title: groupB,
      collapsable: false,
      children: [
        'Fock-Bargmann-Hartogs'
      ]
    }
  ]
}