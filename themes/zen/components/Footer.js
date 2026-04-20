import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * Zen 页脚 — 极简、对齐中轴，不喧宾夺主
 */
export default function Footer(props) {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '—' + currentYear : currentYear

  return (
    <footer
      className='relative w-full mt-16 pt-10 pb-12 px-6'
      style={{
        backgroundColor: 'var(--zen-bg)',
        borderTop: '1px solid var(--zen-divider)'
      }}>
      {/* 小号朱红点 —— 终章印记 */}
      <div className='flex justify-center mb-8'>
        <span
          style={{
            width: 6,
            height: 6,
            backgroundColor: 'var(--zen-vermillion)',
            display: 'inline-block',
            borderRadius: '50%'
          }}
        />
      </div>

      <DarkModeButton className='text-center mb-6' />

      <div
        className='container mx-auto max-w-3xl text-center text-xs md:text-sm'
        style={{
          color: 'var(--zen-gray)',
          fontFamily: 'var(--zen-font-latin)',
          letterSpacing: '0.04em',
          lineHeight: 1.9
        }}>
        <div className='mb-2'>
          &copy; {copyrightDate} · {siteConfig('AUTHOR')}
        </div>

        <div
          className='space-x-3 text-xs'
          style={{ color: 'var(--zen-gray)' }}>
          {siteConfig('BEI_AN') && (
            <a
              href={siteConfig('BEI_AN_LINK')}
              className='zen-link'>
              {siteConfig('BEI_AN')}
            </a>
          )}
          <BeiAnGongAn />
          {siteConfig('ZEN_FOOTER_POWERED_BY', true, CONFIG) && (
            <span>
              Powered by{' '}
              <a
                href='https://github.com/tangly1024/NotionNext'
                className='zen-link'>
                NotionNext {siteConfig('VERSION')}
              </a>
            </span>
          )}
        </div>

        {/* 俳句式收束——可选，作者气质 */}
        <div
          className='mt-6 italic opacity-60 text-xs'
          style={{ fontFamily: 'var(--zen-font-cjk)' }}>
          静水流深，云淡风轻。
        </div>
      </div>
    </footer>
  )
}
