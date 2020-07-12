const moment = require('moment-timezone');
// const moment = require('moment');
const path = require('path');

module.exports = {
  base: '/',
  title: 'pxxyyz',
  description: '秃头怪的自娱自乐',
  port: 4000,
  lang: 'zh-CN',
  themeConfig: {
   // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/pxxyyz-dev/pxxyyz-dev.github.io',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    nav: [
      { text: "Resume", link: "/resume/" },
      { text: "About", link: "/about/" },
      { text: "Projects", link: "/projects/" },
      { text: "Guide", link: "/guide/" },
      { 
        text: "Plugins", items: [
          { text: "mathjax", link: "/vuepress-plugins/mathjax" },
          { text: "medium-zoom", link: "/vuepress-plugins/medium-zoom" },
        ],
      },
    ],
    sidebar: {
      '/guide/': genSidebarConfig('Guide'),
    },
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
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
    ['@vuepress/medium-zoom'],
    ['vuepress-plugin-smooth-scroll'],
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

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'customize',
        'advanced',
      ]
    }
  ]
}