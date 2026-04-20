import { siteConfig } from '@/lib/config'
import { useRef } from 'react'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'

/**
 * 社交联系方式按钮组 — Zen 样式
 * 小号图标，字间距宽，hover 朱红
 */
const SocialButton = () => {
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
  const emailIcon = useRef(null)

  const iconClass =
    'transition-colors duration-200 hover:text-[color:var(--zen-vermillion)]'

  return (
    <div className='flex justify-center flex-wrap my-1'>
      <div
        className='flex gap-5 text-base'
        style={{ color: 'var(--zen-gray)' }}>
        {siteConfig('CONTACT_GITHUB') && (
          <a
            target='_blank'
            rel='noreferrer'
            title='github'
            href={siteConfig('CONTACT_GITHUB')}>
            <i className={`fab fa-github ${iconClass}`} />
          </a>
        )}
        {siteConfig('CONTACT_TWITTER') && (
          <a
            target='_blank'
            rel='noreferrer'
            title='twitter'
            href={siteConfig('CONTACT_TWITTER')}>
            <i className={`fab fa-twitter ${iconClass}`} />
          </a>
        )}
        {siteConfig('CONTACT_TELEGRAM') && (
          <a
            target='_blank'
            rel='noreferrer'
            href={siteConfig('CONTACT_TELEGRAM')}
            title='telegram'>
            <i className={`fab fa-telegram ${iconClass}`} />
          </a>
        )}
        {siteConfig('CONTACT_LINKEDIN') && (
          <a
            target='_blank'
            rel='noreferrer'
            href={siteConfig('CONTACT_LINKEDIN')}
            title='linkedIn'>
            <i className={`fab fa-linkedin ${iconClass}`} />
          </a>
        )}
        {siteConfig('CONTACT_WEIBO') && (
          <a
            target='_blank'
            rel='noreferrer'
            title='weibo'
            href={siteConfig('CONTACT_WEIBO')}>
            <i className={`fab fa-weibo ${iconClass}`} />
          </a>
        )}
        {siteConfig('CONTACT_INSTAGRAM') && (
          <a
            target='_blank'
            rel='noreferrer'
            title='instagram'
            href={siteConfig('CONTACT_INSTAGRAM')}>
            <i className={`fab fa-instagram ${iconClass}`} />
          </a>
        )}
        {CONTACT_EMAIL && (
          <a
            onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
            target='_blank'
            rel='noreferrer'
            className='cursor-pointer'
            title='email'
            ref={emailIcon}>
            <i className={`fas fa-envelope ${iconClass}`} />
          </a>
        )}
        {JSON.parse(siteConfig('ENABLE_RSS')) && (
          <a
            target='_blank'
            rel='noreferrer'
            title='RSS'
            href='/rss/feed.xml'>
            <i className={`fas fa-rss ${iconClass}`} />
          </a>
        )}
        {siteConfig('CONTACT_BILIBILI') && (
          <a
            target='_blank'
            rel='noreferrer'
            title='bilibili'
            href={siteConfig('CONTACT_BILIBILI')}>
            <i className={`fab fa-bilibili ${iconClass}`} />
          </a>
        )}
        {siteConfig('CONTACT_YOUTUBE') && (
          <a
            target='_blank'
            rel='noreferrer'
            title='youtube'
            href={siteConfig('CONTACT_YOUTUBE')}>
            <i className={`fab fa-youtube ${iconClass}`} />
          </a>
        )}
        {siteConfig('CONTACT_THREADS') && (
          <a
            target='_blank'
            rel='noreferrer'
            title='threads'
            href={siteConfig('CONTACT_THREADS')}>
            <i className={`fab fa-threads ${iconClass}`} />
          </a>
        )}
      </div>
    </div>
  )
}
export default SocialButton
