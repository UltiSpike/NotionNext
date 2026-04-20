import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 顶栏提示条 —— 温暖色带，右下装饰贴纸角
 */
export default function TopBar(props) {
  const content = siteConfig('GARDEN_TOP_BAR_CONTENT', null, CONFIG)

  if (!content) return <></>

  return (
    <header
      className='relative w-full flex justify-center items-center'
      style={{
        background:
          'linear-gradient(90deg, var(--garden-coral), var(--garden-mustard))'
      }}
    >
      <div id='top-bar-inner' className='max-w-5xl w-full px-6'>
        <div
          className='text-xs md:text-sm text-center py-2 font-medium text-white'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </header>
  )
}
