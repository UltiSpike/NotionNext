import { AdSlot } from '@/components/GoogleAdsense'
import Announcement from './Announcement'
import Catalog from './Catalog'
import WWAds from '@/components/WWAds'

/**
 * Zen SideBar
 * 极简——仅目录与公告（Live2D / 广告位移除，保持视觉禅意）
 * 文章页默认不显示（由 LayoutBase 控制）
 */
export default function SideBar(props) {
  const { notice } = props
  return (
    <div
      className='zen-sidebar space-y-10 py-6'
      style={{ fontFamily: 'var(--zen-font-latin)' }}>
      <Catalog {...props} />
      <Announcement post={notice} />
      <div className='opacity-60'>
        <AdSlot />
        <WWAds orientation='vertical' className='w-full' />
      </div>
    </div>
  )
}
