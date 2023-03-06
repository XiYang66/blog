module.exports = {
  host: 'localhost',
  title: '曦杨小破站',
  description: '不要因为没有掌声而丢掉自信.',
  dest: 'public',
  // base: '/xiyang66.github.io/',  
  extraWatchFiles: [
    '../docs/*', // 使用相对路径
    '../README.md',
  ],
  head: [
    ['link', { rel: 'icon', href: '/img/tangmi.ico' }],
    ['meta',{name: 'viewport',content: 'width=device-width,initial-scale=1,user-scalable=no',},],
    // ["link", { rel: "stylesheet", href: "/css/font.min.css" }],
    // ["link", { rel: "stylesheet", href: "/css/style.css" }],
    // ["script", { src: "/js/windows.js" }],
    // ["script", { src: "/js/main.js" }],
    // ["script", { src: "/js/background.js" }],
  ],
  // 挂载的主题
  theme: 'reco',
  // 主题配置
  themeConfig: {
    subSidebar: 'auto',
    // 导航栏
    nav: [
      {
        text: '首页',
        link: '/',
        icon: 'reco-home',
      },
      {
        text: '技术笔记',
        icon: 'reco-document',
        items: [
          {
            text: 'VUE',
            link: '/docs/VUE/',
          },
          {
            text: '博客搭建',
            link: '/docs/博客搭建/',
          },
          {
            text: 'JavaScript',
            link: '/docs/JavaScript/',
          },
          {
            text: 'cesium三维地图',
            link: '/docs/cesium三维地图/',
          },
          {
            text: 'TypeScript',
            link: '/docs/TypeScript/',
          },
          {
            text: 'One Piece',
            link: '/docs/One Piece/',
          },
        ],
      },
      {
        text: '日志',
        link: '/timeline/',
        icon: 'reco-date',
      },
      {
        text: '外联',
        icon: 'reco-message',
        items: [
          {
            text: '炫酷首页',
            link: 'http://xiyang.online/',
            icon: 'reco-home',
          },
          {
            text: '腾讯QQ',
            link: 'http://wpa.qq.com/msgrd?v=3&uin=314781333&site=qq&menu=yes',
            icon: 'reco-qq',
          },
          {
            text: '曦杨导航栏',
            link: 'https://xiyang66.github.io/xiyang66/cn/index.html',
            icon: 'reco-other',
          },
        ],
      },
    ],
    //风格
    type: 'blog',
    // 分类和标签
    blogConfig: {
      category: {
        location: 3,
        text: '分类',
      },
      tag: {
        location: 4,
        text: '标签',
      },
    },
    //链接
    friendLink: [
      {
        title: '路过图床',
        desc: '一个免费制作网络图片连接工具',
        email: '314781333@qq.com',
        logo: 'https://imgtu.com/content/images/system/favicon_1587118523486_91617a.png',
        link: 'https://imgtu.com/',
      },
      {
        title: 'MP3音乐连接',
        desc: '从各大平台爬取音乐链接',
        email: '314781333@qq.com',
        logo: '/img/tangmi.ico',
        link: 'https://music.liuzhijin.cn/',
      },
    ],
    //高亮模式
    mode: 'light',
    // 背景图随机列表
    covers: [
      "https://s1.ax1x.com/2022/09/30/xuYYZj.jpg",
      "https://s1.ax1x.com/2022/09/30/xuJq2T.jpg",
      "https://s1.ax1x.com/2022/09/30/xuJRxS.jpg",
      "https://s1.ax1x.com/2022/09/30/xuJ228.png",
      "https://z3.ax1x.com/2021/11/30/olvbe1.png",
      "https://s1.ax1x.com/2022/09/30/xuYryF.jpg"
    ],
    //评论
    valineConfig: {
      appId: 'M3gzGIpnfpx7i5UYepo4HHtc-gzGzoHsz',// your appId
      appKey: 'jo1HbkGYuYFepCvxokfFEaer', // your appKey
      visitor: true, // 阅读量统计
      avatar: "monsterid",//评论者头像
      enableQQ: true, // 是否启用昵称框自动获取QQ昵称和QQ头像
      placeholder: '昵称填写qq可以显示qq头像和昵称哦~ ',
    },

    // 颜色模式面板
    modePicker: false,
    codeTheme: 'tomorrow',
    logo: '/img/tangmi.ico',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: '曦杨',
    authorAvatar: '/img/tangmi.jpg',
    record: 'xxxx',
    startYear: '2017',
  },
  // 语言
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      title: '曦杨小破站',
      description: 'Vue 驱动的静态网站生成器',
    },
  },
  // 插件
  plugins: [
    // 自动生成侧边栏的插件
    [
      'vuepress-plugin-auto-sidebar',
      {
        collapse: {
          open: false,
          uncollapseList: [
            "/docs/高效开发/"
          ]
        },
      },
    ],
    //随机名言
    ['vuepress-plugin-boxx'],
    // 打赏功能
    [
      'vuepress-plugin-sponsor',
      {
        theme: 'simple',
        wechat: 'https://s1.ax1x.com/2022/08/01/vkzrK1.jpg',
        duration: 2000
      }
    ],
    // 刷新按钮
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: '发现新内容可用',
          buttonText: '刷新',
        },
      },
    ],
    //气泡
    ['vue-canvas-effect'],
    // 看板娘
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: ['haruto'],
        clean: true,
        messages: {
          welcome: '欢迎来到我的博客',
          home: '心里的花，我想要带你回家。',
          theme: '好吧，希望你能喜欢我的其他小伙伴。',
          close: '你不喜欢我了吗？痴痴地望着你。',
        },
        messageStyle: { right: '68px', bottom: '290px' },
        width: 140,
        height: 220,
      },
    ],
    // 图片放大
    ['@vuepress/plugin-medium-zoom'],
    //樱花
    // [
    //   'sakura',
    //   {
    //     num: 20, // 默认数量
    //     show: true, //  是否显示
    //     zIndex: -1, // 层级
    //     img: {
    //       replace: false, // false 默认图 true 换图 需要填写httpUrl地址
    //       httpUrl: '...', // 绝对路径
    //     },
    //   },
    // ],
    // 音乐插件
    [
      'meting',
      {
        meting: {
          // 歌单地址-> 如果输入可忽略server|type|mid
          auto: 'https://music.163.com/#/playlist?id=2974518382',
          // 当前服务为netease -> 网易
          server: 'netease',
          // 类型为歌单
          type: 'playlist',
          // 歌单id
          mid: '2974518382',
        },
        aplayer: {
          // 歌单为随机
          order: 'random',
          // 0为不显示歌词
          lrcType: 0,
          // 音量
          volume: 0.55,
          // 开启迷你模式
          mini: true,
          // 自动播放
          autoplay: true,
        },
      },
    ],
    // 进度条
    ['@vuepress/nprogress'],
    // 背景彩带
    [
      'ribbon-animation',
      {
        size: 90, // 默认数据
        opacity: 0.3, //  透明度
        zIndex: -1, //  层级
        opt: {
          // 色带HSL饱和度
          colorSaturation: '80%',
          // 色带HSL亮度量
          colorBrightness: '60%',
          // 带状颜色不透明度
          colorAlpha: 0.65,
          // 在HSL颜色空间中循环显示颜色的速度有多快
          colorCycleSpeed: 6,
          // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
          verticalPosition: 'center',
          // 到达屏幕另一侧的速度有多快
          horizontalSpeed: 200,
          // 在任何给定时间，屏幕上会保留多少条带
          ribbonCount: 2,
          // 添加笔划以及色带填充颜色
          strokeSize: 0,
          // 通过页面滚动上的因子垂直移动色带
          parallaxAmount: -0.5,
          // 随着时间的推移，为每个功能区添加动画效果
          animateSections: true,
        },
        ribbonShow: false, //  点击彩带  true显示  false为不显示
        ribbonAnimationShow: true, // 滑动彩带
      },
    ],
    // 可以复制代码
    [
      'vuepress-plugin-nuggets-style-copy',
      {
        copyText: '复制代码',
        tip: {
          content: '复制成功',
        },
      },
    ],
    // 添加著作权信息
    // [
    //   'copyright',
    //   {
    //     authorName: '曦杨', // 选中的文字将无法被复制
    //     minLength: 30, // 如果长度超过  30 个字符
    //   },
    // ],
    // 背景音乐
    // [
    //   '@vuepress-reco/vuepress-plugin-bgm-player',
    //   {
    //     audios: [
    //       {
    //         name: '每当我',
    //         artist: '刘诗人',
    //         cover:
    //           'https://y.gtimg.cn/music/photo_new/T002R300x300M0000047cVhS1LhLO7.jpg',
    //         url: 'http://ws.stream.qqmusic.qq.com/C400001t7xa208YSVH.m4a?guid=462798458&vkey=75E3D81EB8291AD403269482ACB5BA5F04CB13EC219429739DEAF798494174BDACC3E803CA9A57D60115164E1F6818BB772C43680DB26AD0&uin=&fromtag=120032',
    //       },
    //       {
    //         name: '不浪漫罪名',
    //         artist: '王杰',
    //         cover:
    //           'https://y.gtimg.cn/music/photo_new/T002R300x300M00000358tyA4TxXpk.jpg',
    //         url: 'http://ws.stream.qqmusic.qq.com/C400002koa9T1SLwku.m4a?guid=788523824&vkey=F1C8A950979DB95103F0BC4D574BDBCA0C4D61B90DC272063647E92E8E8B16F0ABCB9B3592975E1B8FA2E93F1B978D977EDF475818CAC258&uin=&fromtag=120032',
    //       },
    //     ],
    //     // 是否默认缩小
    //     autoShrink: true,
    //     // 缩小时缩为哪种模式
    //     shrinkMode: 'float',
    //     // 悬浮窗样式
    //     floatStyle: { bottom: '10px', 'z-index': '999999' },
    //   },
    // ],
    //动态标题展示
    [
      'dynamic-title',
      {
        // showIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
        showText: '(/≧▽≦/)欢迎回来~',
        // hideIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
        hideText: '(●—●)bye bye~',
        recoverTime: 1000,
      },
    ],
  ],
  markdown: {
    lineNumbers: false,
  },
}
