const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Bobby home',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    displayAllHeaders: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Github',
        link: 'https://github.com/mxmaxime/bobby-home'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'setup/',
            'setup/deploy',
          ]
        },
        {
          title: 'Docker',
          children: [
            'docker/',
          ]
        },
        // {
        //   title: 'Webapp',
        //   children: [
        //     'webapp/',
        //     'webapp/camera',
        //     'webapp/orm-pitfalls',
        //   ]
        // },
        {
          title: 'MQTT',
          children: [
            'mqtt/',
            'mqtt/docker.md'
          ]
        },
        {
          title: 'Logs',
          children: [
            'logs/'
          ]
        },
        {
          title: 'Smart camera',
          children: [
            'smart-camera/',
            'smart-camera/docker.md',
            'smart-camera/tensorflow.md',
          ]
        },
        // {
        //   title: 'Network',
        //   children: [
        //     'network/'
        //   ]
        // },
      ],
      // '/smart-camera/': [
      //   {
      //     title: 'Smart camera',
      //     children: [
      //       '',
      //       'tensorflow'
      //     ]
      //   }
      // ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
