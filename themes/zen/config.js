const CONFIG = {
  // 主题 logo 图片（可为静态 webp / svg / png）
  ZEN_LOGO_IMG: '/Logo.webp',

  // 顶栏（极简提示条），zen 主题默认关闭，保持纯粹
  ZEN_TOP_BAR: process.env.NEXT_PUBLIC_THEME_ZEN_TOP_BAR === 'true',
  ZEN_TOP_BAR_CONTENT: process.env.NEXT_PUBLIC_THEME_ZEN_TOP_TIPS || '',

  // 首屏作者简介（替代 simple 的 LOGO_DESCRIPTION，更强调「署名」气质）
  ZEN_LOGO_DESCRIPTION:
    process.env.NEXT_PUBLIC_THEME_ZEN_LOGO_DESCRIPTION || '',

  // 作者链接
  ZEN_AUTHOR_LINK: process.env.NEXT_PUBLIC_AUTHOR_LINK || '#',

  // 文章列表广告插入开关（默认关闭——zen 主张无干扰阅读）
  ZEN_POST_AD_ENABLE: process.env.NEXT_PUBLIC_ZEN_POST_AD_ENABLE === 'true',

  // 博客列表封面图展示开关（默认关闭——追求文字优先的版面）
  ZEN_POST_COVER_ENABLE: process.env.NEXT_PUBLIC_ZEN_POST_COVER_ENABLE === 'true',

  // 文章详情底部「相关阅读」
  ZEN_ARTICLE_RECOMMEND_POSTS:
    process.env.NEXT_PUBLIC_ZEN_ARTICLE_RECOMMEND_POSTS !== 'false',

  // 文章底部「上一篇 / 下一篇」导航
  ZEN_ARTICLE_AROUND:
    process.env.NEXT_PUBLIC_THEME_ZEN_ARTICLE_AROUND !== 'false',

  // 页脚「Powered by NotionNext」，默认保留（致敬）
  ZEN_FOOTER_POWERED_BY:
    process.env.NEXT_PUBLIC_THEME_ZEN_FOOTER_POWERED_BY !== 'false',

  // 右侧栏——zen 主题默认关闭，文章页永远隐藏侧栏
  // 仅在列表页可选择性启用（保持「单列居中」的书页感）
  ZEN_SIDEBAR_ENABLE:
    process.env.NEXT_PUBLIC_THEME_ZEN_SIDEBAR_ENABLE === 'true',

  // 文章页永远隐藏侧栏（书本式阅读，不破坏视觉流）
  ZEN_SIDEBAR_HIDE_ON_ARTICLE: true,

  // 顶部书名页 hero 的显示（首页和部分列表使用）
  ZEN_HERO_ENABLE:
    process.env.NEXT_PUBLIC_THEME_ZEN_HERO_ENABLE !== 'false',

  // 菜单项
  ZEN_MENU_CATEGORY: true,
  ZEN_MENU_TAG: true,
  ZEN_MENU_ARCHIVE: true,
  ZEN_MENU_SEARCH: true
}
export default CONFIG
