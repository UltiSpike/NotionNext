/**
 * Garden 主题专属配置
 *
 * 数字花园（Digital Garden）风格：暖色、手工感、有温度的个人博客空间。
 * 所有 GARDEN_ 前缀配置都可以通过 NEXT_PUBLIC_THEME_GARDEN_* 环境变量覆盖。
 */
const CONFIG = {
  // 顶部 logo
  GARDEN_LOGO_IMG: '/avatar.svg',
  GARDEN_LOGO_DESCRIPTION:
    process.env.NEXT_PUBLIC_THEME_GARDEN_LOGO_DESCRIPTION || '一个长在云原生里的花园 · K8s · Docker · SRE',

  // 顶部提示栏
  GARDEN_TOP_BAR: true,
  GARDEN_TOP_BAR_CONTENT:
    process.env.NEXT_PUBLIC_THEME_GARDEN_TOP_TIPS ||
    '正在种植中：Kubernetes 源码阅读笔记 🌱',

  // 作者链接
  GARDEN_AUTHOR_LINK: process.env.NEXT_PUBLIC_AUTHOR_LINK || '#',

  // 广告开关
  GARDEN_POST_AD_ENABLE:
    process.env.NEXT_PUBLIC_GARDEN_POST_AD_ENABLE || false,

  // 列表显示封面图
  GARDEN_POST_COVER_ENABLE:
    process.env.NEXT_PUBLIC_GARDEN_POST_COVER_ENABLE || true,

  // 推荐文章
  GARDEN_ARTICLE_RECOMMEND_POSTS:
    process.env.NEXT_PUBLIC_GARDEN_ARTICLE_RECOMMEND_POSTS || true,

  // 文章底部上/下篇
  GARDEN_ARTICLE_AROUND:
    process.env.NEXT_PUBLIC_THEME_GARDEN_ARTICLE_AROUND !== 'false',

  // 页脚 Powered by
  GARDEN_FOOTER_POWERED_BY:
    process.env.NEXT_PUBLIC_THEME_GARDEN_FOOTER_POWERED_BY !== 'false',

  // 右侧栏
  GARDEN_SIDEBAR_ENABLE:
    process.env.NEXT_PUBLIC_THEME_GARDEN_SIDEBAR_ENABLE !== 'false',

  // 菜单
  GARDEN_MENU_CATEGORY: true,
  GARDEN_MENU_TAG: true,
  GARDEN_MENU_ARCHIVE: true,
  GARDEN_MENU_SEARCH: true,

  // Garden 专属：首页欢迎语
  GARDEN_HERO_GREETING:
    process.env.NEXT_PUBLIC_THEME_GARDEN_HERO_GREETING || 'Hi · 你好 · 欢迎来到花园',
  GARDEN_HERO_TAGLINE:
    process.env.NEXT_PUBLIC_THEME_GARDEN_HERO_TAGLINE ||
    '这里是一个长期生长的技术笔记库，聚焦 Kubernetes / Docker / 基础设施。不追求日更，只留下值得回看的文字。'
}
export default CONFIG
