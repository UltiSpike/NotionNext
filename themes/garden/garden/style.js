/* eslint-disable react/no-unknown-property */
/**
 * Garden 主题样式
 *
 * 使用 Google Fonts CDN 以避免引入新 npm 依赖（next/font 会增加构建体积）。
 * CSS 变量集中在 :root / .dark 下，便于组件复用。
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* ========== Fonts (CSS import, no new npm dep) ========== */
      @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Noto+Serif+SC:wght@400;600;700&family=Source+Han+Sans+SC&display=swap');

      /* ========== Design tokens ========== */
      :root {
        --garden-coral: #e8796d;
        --garden-coral-soft: #f3a499;
        --garden-moss: #7a9b76;
        --garden-mustard: #d4a84b;
        --garden-cream: #faf6f1;
        --garden-cream-deep: #f2ebdd;
        --garden-charcoal: #2a2a2a;
        --garden-line: #e8dfce;

        --garden-font-serif: 'Crimson Pro', 'Noto Serif SC', 'Songti SC', serif;
        --garden-font-sans: 'Inter', 'Source Han Sans SC', system-ui,
          -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
        --garden-font-mono: 'JetBrains Mono', 'SF Mono', Menlo, Consolas,
          monospace;

        --garden-bg: var(--garden-cream);
        --garden-bg-raise: #ffffff;
        --garden-text: var(--garden-charcoal);
        --garden-text-soft: #575757;
        --garden-code-bg: #fbf3df;
      }

      .dark {
        --garden-cream: #1e2139;
        --garden-cream-deep: #262a46;
        --garden-charcoal: #f0ebe0;
        --garden-line: #353a5c;
        --garden-bg: #1e2139;
        --garden-bg-raise: #262a46;
        --garden-text: #f0ebe0;
        --garden-text-soft: #b9b3a3;
        --garden-code-bg: #2a2f4d;
      }

      /* ========== Base ========== */
      html {
        scroll-behavior: smooth;
      }

      #theme-garden {
        font-family: var(--garden-font-sans);
        color: var(--garden-text);
        background-color: var(--garden-bg);
        /* subtle paper-like grain */
        background-image: radial-gradient(
            rgba(212, 168, 75, 0.06) 1px,
            transparent 1px
          ),
          radial-gradient(rgba(232, 121, 109, 0.04) 1px, transparent 1px);
        background-size: 28px 28px, 40px 40px;
        background-position: 0 0, 14px 14px;
      }
      .dark #theme-garden {
        background-image: radial-gradient(
            rgba(240, 235, 224, 0.04) 1px,
            transparent 1px
          ),
          radial-gradient(rgba(232, 121, 109, 0.05) 1px, transparent 1px);
      }

      body {
        background-color: var(--garden-bg);
      }

      /* ========== Typography ========== */
      #theme-garden h1,
      #theme-garden h2,
      #theme-garden h3,
      #theme-garden .font-serif-garden {
        font-family: var(--garden-font-serif);
        font-weight: 600;
        letter-spacing: -0.01em;
      }

      /* Chinese body line-height for serif readability */
      #theme-garden .garden-prose,
      #theme-garden article p,
      #theme-garden .notion-text {
        line-height: 1.85;
      }

      /* ========== Hand-drawn underline (for nav/menu links) ========== */
      #theme-garden .garden-wiggle-link {
        position: relative;
        display: inline-block;
        transition: color 180ms ease;
      }
      #theme-garden .garden-wiggle-link::after {
        content: '';
        position: absolute;
        left: -2px;
        right: -2px;
        bottom: -3px;
        height: 6px;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 6'><path d='M0 3 Q 7.5 0 15 3 T 30 3 T 45 3 T 60 3' fill='none' stroke='%23E8796D' stroke-width='1.5'/></svg>");
        background-repeat: repeat-x;
        background-size: 60px 6px;
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 250ms ease;
      }
      #theme-garden .garden-wiggle-link:hover::after,
      #theme-garden .garden-wiggle-link.active::after {
        transform: scaleX(1);
      }
      #theme-garden .garden-wiggle-link:hover {
        color: var(--garden-coral);
      }

      /* ========== Marker highlight ========== */
      #theme-garden .garden-marker {
        background-image: linear-gradient(
          180deg,
          transparent 55%,
          rgba(212, 168, 75, 0.45) 55%,
          rgba(212, 168, 75, 0.45) 92%,
          transparent 92%
        );
        padding: 0 0.18em;
      }
      .dark #theme-garden .garden-marker {
        background-image: linear-gradient(
          180deg,
          transparent 55%,
          rgba(212, 168, 75, 0.3) 55%,
          rgba(212, 168, 75, 0.3) 92%,
          transparent 92%
        );
      }

      /* ========== Article card hover ========== */
      #theme-garden .garden-card {
        transition: transform 300ms ease, box-shadow 300ms ease;
      }
      #theme-garden .garden-card:hover {
        transform: translateY(-4px) rotate(-0.4deg);
        box-shadow: 0 18px 40px -24px rgba(42, 42, 42, 0.35);
      }
      .dark #theme-garden .garden-card:hover {
        box-shadow: 0 18px 40px -24px rgba(0, 0, 0, 0.6);
      }

      /* ========== Sticky-note corner decoration ========== */
      #theme-garden .garden-sticky-corner {
        position: relative;
      }
      #theme-garden .garden-sticky-corner::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 28px;
        height: 28px;
        background: linear-gradient(
          225deg,
          var(--garden-mustard) 50%,
          transparent 50%
        );
        opacity: 0.35;
        border-top-right-radius: 6px;
      }

      /* ========== Notion page overrides ========== */
      #theme-garden .notion {
        font-family: var(--garden-font-sans);
        color: var(--garden-text);
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }

      #theme-garden .notion-h,
      #theme-garden .notion-h1,
      #theme-garden .notion-h2,
      #theme-garden .notion-h3 {
        font-family: var(--garden-font-serif);
        color: var(--garden-text);
      }

      /* Code blocks: cream-yellow tinted + lang badge */
      #theme-garden .notion-code {
        background-color: var(--garden-code-bg) !important;
        border: 1px solid var(--garden-line);
        border-radius: 10px;
        font-family: var(--garden-font-mono) !important;
        font-size: 0.9em;
        position: relative;
        padding: 1.25rem 1.1rem !important;
        box-shadow: inset 0 0 0 1px rgba(212, 168, 75, 0.08);
      }
      #theme-garden .notion-code::before {
        content: attr(data-language);
        position: absolute;
        top: 0.5rem;
        right: 0.8rem;
        font-family: var(--garden-font-mono);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--garden-coral);
        background: var(--garden-bg-raise);
        padding: 0.15rem 0.55rem;
        border-radius: 999px;
        border: 1px solid var(--garden-line);
      }
      #theme-garden .notion-code code {
        font-family: var(--garden-font-mono) !important;
      }

      /* Inline code */
      #theme-garden .notion-inline-code {
        background-color: var(--garden-code-bg) !important;
        color: var(--garden-coral) !important;
        font-family: var(--garden-font-mono) !important;
        padding: 0.1em 0.4em;
        border-radius: 4px;
        border: 1px solid rgba(212, 168, 75, 0.2);
      }

      /* Blockquote: a hand-drawn left bar */
      #theme-garden .notion-quote {
        border-left: 3px solid var(--garden-coral) !important;
        background: linear-gradient(
          90deg,
          rgba(232, 121, 109, 0.06),
          transparent
        );
        font-style: italic;
        font-family: var(--garden-font-serif);
        padding: 0.6rem 1.2rem !important;
        border-radius: 0 6px 6px 0;
      }

      /* Links inside notion body */
      #theme-garden .notion-link {
        color: var(--garden-coral) !important;
        border-bottom: 1px dashed var(--garden-coral-soft);
        opacity: 1 !important;
      }
      #theme-garden .notion-link:hover {
        background: rgba(232, 121, 109, 0.08);
      }

      /* ========== Misc ========== */
      .forbid-copy {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }

      /* scrollbar */
      #theme-garden ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      #theme-garden ::-webkit-scrollbar-thumb {
        background: var(--garden-coral-soft);
        border-radius: 4px;
      }
      #theme-garden ::-webkit-scrollbar-track {
        background: transparent;
      }

      /* animation keyframes */
      @keyframes garden-float {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-4px);
        }
      }
      #theme-garden .garden-float {
        animation: garden-float 4s ease-in-out infinite;
      }
    `}</style>
  )
}

export { Style }
