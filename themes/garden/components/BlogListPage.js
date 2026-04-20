import { AdSlot } from '@/components/GoogleAdsense'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'
import { BlogItem } from './BlogItem'

/**
 * 分页式博客列表 —— 手绘箭头分页、交替倾斜的卡片
 */
export default function BlogListPage(props) {
  const { page = 1, posts, postCount } = props
  const router = useRouter()
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const currentPage = +page

  const GARDEN_POST_AD_ENABLE = siteConfig(
    'GARDEN_POST_AD_ENABLE',
    false,
    CONFIG
  )

  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  return (
    <div className='w-full mb-12'>
      {/* Section label */}
      <div className='mb-6 flex items-center gap-3'>
        <span
          className='font-serif-garden italic text-2xl'
          style={{ color: 'var(--garden-coral)' }}
        >
          笔记本
        </span>
        <span
          className='flex-1 h-px'
          style={{ background: 'var(--garden-line)' }}
        />
        <span
          className='text-xs uppercase tracking-widest'
          style={{ color: 'var(--garden-text-soft)' }}
        >
          Page {currentPage} / {totalPage || 1}
        </span>
      </div>

      <div id='posts-wrapper'>
        {posts?.map((p, index) => (
          <div key={p.id}>
            {GARDEN_POST_AD_ENABLE && (index + 1) % 3 === 0 && (
              <AdSlot type='in-article' />
            )}
            {GARDEN_POST_AD_ENABLE && index + 1 === 4 && <AdSlot type='flow' />}
            <BlogItem post={p} index={index} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-between items-center mt-10'>
        <SmartLink
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${
            showPrev ? 'visible' : 'invisible pointer-events-none'
          } inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm transition-all hover:bg-[color:var(--garden-coral)] hover:text-white hover:border-[color:var(--garden-coral)]`}
          style={{
            borderColor: 'var(--garden-line)',
            color: 'var(--garden-text)'
          }}
        >
          <svg width='16' height='10' viewBox='0 0 20 12' fill='none' aria-hidden>
            <path
              d='M19 6 Q 14 2 6 6 L 9 3 M 6 6 L 9 9'
              stroke='currentColor'
              strokeWidth='1.6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          更近的笔记
        </SmartLink>

        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${
            showNext ? 'visible' : 'invisible pointer-events-none'
          } inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm transition-all hover:bg-[color:var(--garden-coral)] hover:text-white hover:border-[color:var(--garden-coral)]`}
          style={{
            borderColor: 'var(--garden-line)',
            color: 'var(--garden-text)'
          }}
        >
          更早的笔记
          <svg width='16' height='10' viewBox='0 0 20 12' fill='none' aria-hidden>
            <path
              d='M1 6 Q 6 2 14 6 L 11 3 M 14 6 L 11 9'
              stroke='currentColor'
              strokeWidth='1.6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </SmartLink>
      </div>
    </div>
  )
}
