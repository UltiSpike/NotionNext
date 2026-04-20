/* eslint-disable react/no-unknown-property */
/**
 * Zen 主题专属全局样式
 * 设计锚点：
 *   - 单列居中，书本式阅读
 *   - 宋体为正文与标题，衬线化一切
 *   - 朱红 (#A93A2E) 仅用于强调（链接、引号、分割符）
 *   - 无阴影、无渐变、无投影动画——仅色相位移
 *   - CJK 行高 ≥ 1.85，西文行高 1.7
 *
 * 注：不支持 tailwindCSS 的 @apply 语法；
 *     字体通过 @import Google Fonts 加载，避免增加 npm 依赖。
 */
const Style = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Fira+Code:wght@400;500&family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap');

      /* ----- 主题 CSS 变量 ----- */
      #theme-zen {
        --zen-ink: #1a1a1a;
        --zen-bg: #faf8f3;
        --zen-vermillion: #a93a2e;
        --zen-indigo: #3e4a59;
        --zen-gray: #8c8680;
        --zen-divider: #e8e3d8;
        --zen-paper: #f4efe5;

        --zen-font-cjk: 'Noto Serif SC', 'Songti SC', 'STSong', 'SimSun', serif;
        --zen-font-latin: 'EB Garamond', 'Noto Serif SC', Georgia, serif;
        --zen-font-mono: 'Fira Code', 'Menlo', 'Consolas', monospace;

        font-family: var(--zen-font-latin), var(--zen-font-cjk);
        color: var(--zen-ink);
        background-color: var(--zen-bg);
      }

      .dark #theme-zen {
        --zen-ink: #e8e3d8;
        --zen-bg: #15161a;
        --zen-vermillion: #c94a3d;
        --zen-indigo: #8a97a8;
        --zen-gray: #6b6660;
        --zen-divider: #2a2b30;
        --zen-paper: #1d1e23;

        color: var(--zen-ink);
        background-color: var(--zen-bg);
      }

      /* ----- body & root ----- */
      body {
        background-color: var(--zen-bg, #faf8f3);
      }
      .dark body {
        background-color: var(--zen-bg, #15161a);
      }

      /* ----- 正文排版 ----- */
      #theme-zen {
        font-size: 16.5px;
        line-height: 1.85;
        letter-spacing: 0.005em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      #theme-zen p,
      #theme-zen li,
      #theme-zen blockquote {
        line-height: 1.92;
      }

      /* 文章正文容器——贯彻单列居中 */
      #theme-zen .zen-prose {
        max-width: 680px;
        margin-left: auto;
        margin-right: auto;
      }
      #theme-zen .zen-list {
        max-width: 720px;
        margin-left: auto;
        margin-right: auto;
      }

      /* ----- 标题：宋体 + 微字距 + 左侧朱红竖条 ----- */
      #theme-zen h1,
      #theme-zen h2,
      #theme-zen h3,
      #theme-zen h4,
      #theme-zen h5,
      #theme-zen h6,
      #theme-zen .zen-heading {
        font-family: var(--zen-font-cjk);
        letter-spacing: 0.04em;
        color: var(--zen-ink);
        font-weight: 600;
        line-height: 1.5;
      }

      #theme-zen .notion-h {
        font-family: var(--zen-font-cjk) !important;
        letter-spacing: 0.04em;
        font-weight: 600;
        padding-left: 0.85rem;
        border-left: 3px solid var(--zen-vermillion);
        margin-top: 2.2em;
        margin-bottom: 0.8em;
      }

      #theme-zen .notion-h-2 {
        font-size: 1.4rem;
      }
      #theme-zen .notion-h-3 {
        font-size: 1.18rem;
        border-left-width: 2px;
      }

      /* ----- 链接：朱红，细下划线 ----- */
      #theme-zen a.zen-link,
      #theme-zen .notion-text a,
      #theme-zen .notion-link {
        color: var(--zen-vermillion);
        text-decoration: none;
        background-image: linear-gradient(var(--zen-vermillion), var(--zen-vermillion));
        background-repeat: no-repeat;
        background-position: 0 100%;
        background-size: 100% 1px;
        transition: background-size 200ms ease-in-out, color 200ms ease;
      }
      #theme-zen a.zen-link:hover,
      #theme-zen .notion-text a:hover,
      #theme-zen .notion-link:hover {
        background-size: 100% 2px;
      }

      /* ----- 菜单动画：朱红下划线从下往上生长 ----- */
      #theme-zen .zen-menu-link {
        color: var(--zen-ink);
        text-decoration: none;
        letter-spacing: 0.12em;
        font-family: var(--zen-font-latin);
        background-image: linear-gradient(var(--zen-vermillion), var(--zen-vermillion));
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 1px;
        transition: background-size 220ms ease-in-out, color 220ms ease;
        padding-bottom: 2px;
      }
      #theme-zen .zen-menu-link:hover {
        background-size: 100% 1px;
        color: var(--zen-vermillion);
        cursor: pointer;
      }

      /* ----- 分割线（细朱红） ----- */
      #theme-zen .zen-divider {
        display: block;
        width: 100%;
        height: 1px;
        background-color: var(--zen-divider);
        border: 0;
        margin: 3rem 0;
      }
      #theme-zen .zen-divider-accent {
        background-color: var(--zen-vermillion);
        opacity: 0.55;
        width: 2.5rem;
        margin: 2rem auto;
        height: 1px;
      }

      /* ----- 引用：左侧朱红 + 内退字 ----- */
      #theme-zen blockquote,
      #theme-zen .notion-quote {
        border-left: 2px solid var(--zen-vermillion) !important;
        padding-left: 1.2em;
        margin-left: 0;
        color: var(--zen-indigo);
        font-style: italic;
        background: transparent !important;
      }
      #theme-zen blockquote::before {
        content: '「';
        color: var(--zen-vermillion);
        font-size: 1.2em;
        margin-right: 0.15em;
        font-family: var(--zen-font-cjk);
      }
      #theme-zen blockquote::after {
        content: '」';
        color: var(--zen-vermillion);
        font-size: 1.2em;
        margin-left: 0.15em;
        font-family: var(--zen-font-cjk);
      }

      /* ----- 代码块：纸色底 + 细边框 + 小号衬线语言标签 ----- */
      #theme-zen .notion-code {
        background: var(--zen-paper) !important;
        border: 1px solid var(--zen-divider) !important;
        border-radius: 2px !important;
        font-family: var(--zen-font-mono) !important;
        font-size: 0.88em !important;
        box-shadow: none !important;
        padding: 1em 1.2em !important;
        line-height: 1.7 !important;
      }
      .dark #theme-zen .notion-code {
        background: var(--zen-paper) !important;
        border-color: var(--zen-divider) !important;
      }

      /* 行内代码 */
      #theme-zen code,
      #theme-zen .notion-inline-code {
        font-family: var(--zen-font-mono) !important;
        background: var(--zen-paper) !important;
        color: var(--zen-indigo) !important;
        padding: 0.1em 0.4em !important;
        border-radius: 2px;
        font-size: 0.88em;
        border: 1px solid var(--zen-divider);
      }

      /* ----- notion 整体微调 ----- */
      #theme-zen .notion {
        color: var(--zen-ink) !important;
        font-family: var(--zen-font-latin), var(--zen-font-cjk) !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      #theme-zen .notion-text {
        font-family: var(--zen-font-latin), var(--zen-font-cjk) !important;
        color: var(--zen-ink) !important;
        line-height: 1.92 !important;
        padding: 0.3em 0 !important;
      }
      #theme-zen .notion-page {
        padding: 0 !important;
      }

      /* 表格 */
      #theme-zen .notion-table {
        border-color: var(--zen-divider) !important;
      }

      /* 图片——扁平化，无阴影 */
      #theme-zen .notion-asset-wrapper img {
        box-shadow: none !important;
        border: 1px solid var(--zen-divider);
        border-radius: 2px;
      }

      /* ----- 标签（文章 tag） ----- */
      #theme-zen .zen-tag {
        color: var(--zen-gray);
        font-family: var(--zen-font-latin);
        font-size: 0.85em;
        letter-spacing: 0.04em;
        border: 1px solid var(--zen-divider);
        padding: 0.15em 0.7em;
        display: inline-block;
        margin-right: 0.35em;
        transition: color 180ms ease, border-color 180ms ease;
      }
      #theme-zen .zen-tag:hover {
        color: var(--zen-vermillion);
        border-color: var(--zen-vermillion);
      }

      /* ----- 文章标题样式（列表 + 详情） ----- */
      #theme-zen .zen-article-title {
        font-family: var(--zen-font-cjk);
        font-weight: 600;
        color: var(--zen-ink);
        letter-spacing: 0.04em;
        line-height: 1.4;
        transition: color 180ms ease;
      }
      #theme-zen .zen-article-title:hover {
        color: var(--zen-vermillion);
      }

      /* ----- 副文字：meta / 日期 ----- */
      #theme-zen .zen-meta {
        font-family: var(--zen-font-latin);
        color: var(--zen-gray);
        font-size: 0.86em;
        letter-spacing: 0.06em;
      }

      /* ----- 文本不可选取（防复制） ----- */
      .forbid-copy {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }

      /* ----- 搜索结果高亮 ----- */
      #theme-zen .zen-search-hit {
        color: var(--zen-vermillion);
        border-bottom: 1px dashed var(--zen-vermillion);
      }

      /* ----- CJK 标点紧凑（半角) ----- */
      #theme-zen .zen-article-title,
      #theme-zen .notion-h,
      #theme-zen .notion-text {
        text-spacing: trim-start allow-end;
        font-variant-east-asian: proportional-width;
      }

      /* ----- 滚动条素雅化 ----- */
      #theme-zen *::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      #theme-zen *::-webkit-scrollbar-thumb {
        background: var(--zen-divider);
        border-radius: 2px;
      }
      #theme-zen *::-webkit-scrollbar-thumb:hover {
        background: var(--zen-vermillion);
      }

      /* ----- 响应式：移动端收紧 ----- */
      @media (max-width: 640px) {
        #theme-zen {
          font-size: 15.5px;
        }
        #theme-zen .notion-h {
          padding-left: 0.6rem;
        }
      }
    `}</style>
  )
}

export { Style }
