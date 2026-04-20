import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * Zen 顶部提示条 — 细线下的小号字
 */
export default function TopBar(props) {
  const content = siteConfig('ZEN_TOP_BAR_CONTENT', null, CONFIG)

  if (!content) {
    return <></>
  }

  return (
    <header
      className='flex justify-center items-center'
      style={{
        backgroundColor: 'var(--zen-paper)',
        borderBottom: '1px solid var(--zen-divider)'
      }}>
      <div id='top-bar-inner' className='max-w-6xl w-full z-20 px-5 sm:px-8'>
        <div
          className='text-xs text-center py-2 tracking-wider'
          style={{
            color: 'var(--zen-indigo)',
            fontFamily: 'var(--zen-font-latin)'
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </header>
  )
}
