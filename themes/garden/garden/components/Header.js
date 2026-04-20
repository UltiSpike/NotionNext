import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'

/**
 * 网站顶部 Header —— 手绘风格头像 + 问候语 + 波浪线装饰
 * Intentionally asymmetric: avatar left, text right, a squiggle underneath.
 */
export default function Header(props) {
  const { siteInfo } = props
  const greeting = siteConfig('GARDEN_HERO_GREETING', null, CONFIG)
  const tagline = siteConfig('GARDEN_HERO_TAGLINE', null, CONFIG)

  return (
    <header className='relative w-full px-6 pt-10 pb-8 md:pt-16 md:pb-12'>
      <div className='relative max-w-5xl mx-auto'>
        {/* 背景装饰圆 */}
        <div
          aria-hidden
          className='absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-60 blur-2xl pointer-events-none'
          style={{ background: 'radial-gradient(circle, var(--garden-coral-soft), transparent 70%)' }}
        />
        <div
          aria-hidden
          className='absolute -bottom-8 right-8 w-40 h-40 rounded-full opacity-40 blur-2xl pointer-events-none'
          style={{ background: 'radial-gradient(circle, var(--garden-mustard), transparent 70%)' }}
        />

        <div className='relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10'>
          {/* 头像 */}
          <SmartLink href='/' className='shrink-0'>
            <div
              className='garden-float relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-white dark:ring-[color:var(--garden-cream-deep)]'
              style={{ boxShadow: '0 10px 30px -10px rgba(232,121,109,0.5)' }}
            >
              <LazyImage
                priority={true}
                src={siteInfo?.icon}
                className='w-full h-full object-cover'
                width={112}
                height={112}
                alt={siteConfig('AUTHOR')}
              />
            </div>
          </SmartLink>

          {/* 文本区 */}
          <div className='flex-1'>
            <div
              className='text-xs uppercase tracking-[0.2em] mb-2'
              style={{ color: 'var(--garden-coral)' }}
            >
              {greeting}
            </div>

            <SmartLink href='/'>
              <h1 className='font-serif-garden text-4xl md:text-5xl font-bold leading-tight'>
                <span style={{ color: 'var(--garden-text)' }}>
                  {siteConfig('AUTHOR')}
                </span>
                <span className='ml-2 garden-marker font-serif-garden italic text-3xl md:text-4xl'>
                  的花园
                </span>
              </h1>
            </SmartLink>

            {/* 手绘波浪线 */}
            <svg
              aria-hidden
              className='my-3'
              width='120'
              height='10'
              viewBox='0 0 120 10'
              fill='none'
            >
              <path
                d='M0 5 Q 10 0 20 5 T 40 5 T 60 5 T 80 5 T 100 5 T 120 5'
                stroke='var(--garden-coral)'
                strokeWidth='2'
                strokeLinecap='round'
                fill='none'
              />
            </svg>

            <p
              className='text-base md:text-lg max-w-2xl leading-relaxed'
              style={{ color: 'var(--garden-text-soft)' }}
              dangerouslySetInnerHTML={{
                __html:
                  siteConfig('GARDEN_LOGO_DESCRIPTION', null, CONFIG) || tagline
              }}
            />

            <div className='mt-4 flex items-center gap-4'>
              <SocialButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
