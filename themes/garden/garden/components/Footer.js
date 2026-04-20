import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 页脚 —— 手绘波浪分隔、温暖色块
 */
export default function Footer(props) {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer
      className='relative w-full mt-20 pt-12 pb-8'
      style={{
        background:
          'linear-gradient(180deg, transparent 0%, var(--garden-cream-deep) 40%)'
      }}
    >
      {/* 顶部手绘波浪分隔 */}
      <svg
        aria-hidden
        viewBox='0 0 1200 24'
        preserveAspectRatio='none'
        className='absolute top-0 left-0 w-full h-6 -translate-y-1/2'
      >
        <path
          d='M0 12 Q 75 0 150 12 T 300 12 T 450 12 T 600 12 T 750 12 T 900 12 T 1050 12 T 1200 12'
          stroke='var(--garden-coral)'
          strokeWidth='2'
          fill='none'
          opacity='0.6'
          strokeLinecap='round'
        />
      </svg>

      <div className='max-w-4xl mx-auto px-6'>
        <div className='flex justify-center mb-6'>
          <DarkModeButton />
        </div>

        <div
          className='text-center font-serif-garden italic text-lg mb-4'
          style={{ color: 'var(--garden-coral)' }}
        >
          种下一棵树最好的时间是十年前，其次是现在。
        </div>

        <div
          className='flex flex-col md:flex-row items-center md:justify-between gap-2 text-sm'
          style={{ color: 'var(--garden-text-soft)' }}
        >
          <div>
            &copy; {`${copyrightDate}`} {siteConfig('AUTHOR')} · crafted with{' '}
            <span style={{ color: 'var(--garden-coral)' }}>♥</span>
          </div>
          <div className='text-xs flex flex-wrap items-center gap-3'>
            {siteConfig('BEI_AN') && (
              <a
                href={siteConfig('BEI_AN_LINK')}
                className='hover:underline'
                style={{ color: 'var(--garden-text-soft)' }}
              >
                {siteConfig('BEI_AN')}
              </a>
            )}
            <BeiAnGongAn />
            {siteConfig('GARDEN_FOOTER_POWERED_BY', true, CONFIG) && (
              <span>
                Powered by{' '}
                <a
                  href='https://github.com/tangly1024/NotionNext'
                  className='hover:underline'
                  style={{ color: 'var(--garden-coral)' }}
                >
                  NotionNext {siteConfig('VERSION')}
                </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
