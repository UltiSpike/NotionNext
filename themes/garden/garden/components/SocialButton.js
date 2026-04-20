import { siteConfig } from '@/lib/config'
import { useRef } from 'react'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'

/**
 * 社交按钮组
 */
const SocialButton = () => {
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
  const emailIcon = useRef(null)

  const btn = 'text-xl md:text-2xl transition-transform duration-200 hover:scale-125 hover:-rotate-6'

  return (
    <div
      className='inline-flex flex-wrap items-center gap-4'
      style={{ color: 'var(--garden-text-soft)' }}
    >
      {siteConfig('CONTACT_GITHUB') && (
        <a
          target='_blank'
          rel='noreferrer'
          title='github'
          href={siteConfig('CONTACT_GITHUB')}
          className={btn}
        >
          <i className='fab fa-github' />
        </a>
      )}
      {siteConfig('CONTACT_TWITTER') && (
        <a
          target='_blank'
          rel='noreferrer'
          title='twitter'
          href={siteConfig('CONTACT_TWITTER')}
          className={btn}
        >
          <i className='fab fa-twitter' />
        </a>
      )}
      {siteConfig('CONTACT_TELEGRAM') && (
        <a
          target='_blank'
          rel='noreferrer'
          href={siteConfig('CONTACT_TELEGRAM')}
          title='telegram'
          className={btn}
        >
          <i className='fab fa-telegram' />
        </a>
      )}
      {siteConfig('CONTACT_LINKEDIN') && (
        <a
          target='_blank'
          rel='noreferrer'
          href={siteConfig('CONTACT_LINKEDIN')}
          title='linkedIn'
          className={btn}
        >
          <i className='fab fa-linkedin' />
        </a>
      )}
      {siteConfig('CONTACT_WEIBO') && (
        <a
          target='_blank'
          rel='noreferrer'
          title='weibo'
          href={siteConfig('CONTACT_WEIBO')}
          className={btn}
        >
          <i className='fab fa-weibo' />
        </a>
      )}
      {siteConfig('CONTACT_INSTAGRAM') && (
        <a
          target='_blank'
          rel='noreferrer'
          title='instagram'
          href={siteConfig('CONTACT_INSTAGRAM')}
          className={btn}
        >
          <i className='fab fa-instagram' />
        </a>
      )}
      {CONTACT_EMAIL && (
        <a
          onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
          target='_blank'
          rel='noreferrer'
          className={`cursor-pointer ${btn}`}
          title='email'
          ref={emailIcon}
        >
          <i className='fas fa-envelope' />
        </a>
      )}
      {JSON.parse(siteConfig('ENABLE_RSS')) && (
        <a
          target='_blank'
          rel='noreferrer'
          title='RSS'
          href='/rss/feed.xml'
          className={btn}
        >
          <i className='fas fa-rss' />
        </a>
      )}
      {siteConfig('CONTACT_BILIBILI') && (
        <a
          target='_blank'
          rel='noreferrer'
          title='bilibili'
          href={siteConfig('CONTACT_BILIBILI')}
          className={btn}
        >
          <i className='fab fa-bilibili' />
        </a>
      )}
      {siteConfig('CONTACT_YOUTUBE') && (
        <a
          target='_blank'
          rel='noreferrer'
          title='youtube'
          href={siteConfig('CONTACT_YOUTUBE')}
          className={btn}
        >
          <i className='fab fa-youtube' />
        </a>
      )}
      {siteConfig('CONTACT_THREADS') && (
        <a
          target='_blank'
          rel='noreferrer'
          title='threads'
          href={siteConfig('CONTACT_THREADS')}
          className={btn}
        >
          <i className='fab fa-threads' />
        </a>
      )}
    </div>
  )
}
export default SocialButton
