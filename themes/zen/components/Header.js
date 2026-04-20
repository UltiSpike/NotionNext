import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'

/**
 * Zen 主题网站顶部
 * 书页化：作者名 / 描述 / 社交 — 极简纵向堆叠，居中，大量留白
 * 无 logo 图片（纯文字署名感）；装饰仅一条朱红短线
 */
export default function Header(props) {
  const heroEnabled = siteConfig('ZEN_HERO_ENABLE', true, CONFIG)
  if (!heroEnabled) {
    // 极简情况下，仅保留一条标题栏
    return (
      <header
        className='w-full py-6 text-center'
        style={{
          backgroundColor: 'var(--zen-bg)',
          borderBottom: '1px solid var(--zen-divider)'
        }}>
        <SmartLink
          href='/'
          className='zen-article-title text-xl md:text-2xl font-medium'>
          {siteConfig('AUTHOR')}
        </SmartLink>
      </header>
    )
  }

  return (
    <header
      className='w-full pt-20 pb-14 md:pt-28 md:pb-16 px-6 text-center relative z-10'
      style={{ backgroundColor: 'var(--zen-bg)' }}>
      {/* 顶栏署名（小号、置于 hero 之上） */}
      <div className='zen-meta text-xs uppercase tracking-[0.3em] mb-6 opacity-80'>
        {siteConfig('BLOG_TITLE') || siteConfig('TITLE') || 'Notes'}
      </div>

      {/* 作者名——作为书名页的主标题 */}
      <SmartLink href='/'>
        <h1
          className='zen-article-title mb-4 font-semibold tracking-wider'
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontFamily: 'var(--zen-font-cjk)',
            letterSpacing: '0.08em'
          }}>
          {siteConfig('AUTHOR')}
        </h1>
      </SmartLink>

      {/* 朱红细线（书页装饰） */}
      <div className='zen-divider-accent' style={{ margin: '1.25rem auto' }} />

      {/* 描述 */}
      <div
        className='max-w-xl mx-auto text-sm md:text-base italic mb-3'
        style={{
          color: 'var(--zen-indigo)',
          fontFamily: 'var(--zen-font-latin)',
          lineHeight: 1.7
        }}
        dangerouslySetInnerHTML={{
          __html:
            siteConfig('ZEN_LOGO_DESCRIPTION', '', CONFIG) ||
            siteConfig('DESCRIPTION', '')
        }}
      />

      {/* 社交图标 */}
      <div className='flex justify-center mt-4'>
        <SocialButton />
      </div>
    </header>
  )
}
