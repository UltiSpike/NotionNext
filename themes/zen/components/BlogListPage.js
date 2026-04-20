import { AdSlot } from '@/components/GoogleAdsense'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'
import { BlogItem } from './BlogItem'

/**
 * Zen 分页博客列表
 * 分页按钮风格：纯文字 + 朱红细下划线（hover 生长），与 NEWER/OLDER 横向分立
 */
export default function BlogListPage(props) {
  const { page = 1, posts, postCount } = props
  const router = useRouter()
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const currentPage = +page

  const ZEN_POST_AD_ENABLE = siteConfig('ZEN_POST_AD_ENABLE', false, CONFIG)

  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  return (
    <div className='w-full mb-16'>
      <div id='posts-wrapper'>
        {posts?.map((p, index) => (
          <div key={p.id}>
            {ZEN_POST_AD_ENABLE && (index + 1) % 3 === 0 && (
              <AdSlot type='in-article' />
            )}
            {ZEN_POST_AD_ENABLE && index + 1 === 4 && <AdSlot type='flow' />}
            <BlogItem post={p} />
          </div>
        ))}
      </div>

      {/* 分页 */}
      <nav
        className='flex justify-between items-center mt-12 text-xs tracking-widest uppercase'
        style={{ color: 'var(--zen-gray)' }}>
        <SmartLink
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${showPrev ? 'visible zen-menu-link' : 'invisible pointer-events-none'}`}>
          ← Newer
        </SmartLink>

        <span className='text-xs' style={{ color: 'var(--zen-gray)' }}>
          {currentPage} / {totalPage || 1}
        </span>

        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`${showNext ? 'visible zen-menu-link' : 'invisible pointer-events-none'}`}>
          Older →
        </SmartLink>
      </nav>
    </div>
  )
}
