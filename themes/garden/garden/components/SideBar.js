import { AdSlot } from '@/components/GoogleAdsense'
import Live2D from '@/components/Live2D'
import WWAds from '@/components/WWAds'
import Announcement from './Announcement'
import Catalog from './Catalog'

/**
 * 右侧边栏 —— 卡片式目录、公告；带便签角装饰
 */
export default function SideBar(props) {
  const { notice } = props

  return (
    <aside className='flex flex-col gap-6'>
      {/* 目录卡片 */}
      <div
        className='garden-sticky-corner rounded-xl border p-5'
        style={{
          background: 'var(--garden-bg-raise)',
          borderColor: 'var(--garden-line)'
        }}
      >
        <Catalog {...props} />
      </div>

      {/* 公告 */}
      {notice && (
        <div
          className='rounded-xl border p-5'
          style={{
            background: 'var(--garden-bg-raise)',
            borderColor: 'var(--garden-line)'
          }}
        >
          <div
            className='text-xs uppercase tracking-widest mb-2'
            style={{ color: 'var(--garden-mustard)' }}
          >
            <i className='fa-regular fa-note-sticky mr-1' />
            便签
          </div>
          <Announcement post={notice} />
        </div>
      )}

      <Live2D />
      <AdSlot />
      <WWAds orientation='vertical' className='w-full' />
    </aside>
  )
}
