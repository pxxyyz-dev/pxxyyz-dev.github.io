const moment = require('moment-timezone');
// const moment = require('moment');
const path = require('path');

module.exports = {
  base: '/',
  title: 'pxxyyz',
  theme: 'antdocs',
  description: '秃头怪的自娱自乐',
  port: 4000,
  lang: 'zh-CN',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/pxxyyz-dev/pxxyyz-dev.github.io',
    // 自定义仓库链接文字。
    // repoLabel: 'GitHub',
    nav: [
      { 
        text: "profile", items: [
          { text: "Resume", link: "/resume/" },
          { text: "About", link: "/about/" },
          { text: "Projects", link: "/projects/" },
        ],
      },
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Post", link: "/posts/" },
      { 
        text: "Plugins", items: [
          { text: "mathjax", link: "/vuepress-plugins/mathjax" },
          { text: "medium-zoom", link: "/vuepress-plugins/medium-zoom" },
        ],
      },
    ],
    sidebar: {
      '/guide/': getGuideSidebar('指南', '深入'),
      '/posts/': getPostSidebar('展示'),
    },
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新时间',
    docsRepo: 'pxxyyz-dev/pxxyyz-dev.github.io',
    docsDir: 'docs',
    docsBranch: 'source',
    editLinks: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  plugins: [
    ['@vuepress/back-to-top'],
    ['vuepress-plugin-smooth-scroll'],
    [
      '@vuepress/medium-zoom',
      {
        selector: '.theme-antdocs-content :not(a) > img',
        options: {
          margin: 16
        }
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
    [
      'vuepress-plugin-mathjax',
      {
        target: 'chtml',
        macros: {
          '*': '\\times',
          '\\Z': '\\mathbb{Z}',
        },
      },
    ],
  ],
};

function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'advanced',
        'customize',
        'frontmatter',
        'permalinks',
        'markdown-slot',
        'global-computed'
      ]
    }
  ]
}

function getPostSidebar (groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'hello-world',
        'ant-design-components'
      ]
    }
  ]
}