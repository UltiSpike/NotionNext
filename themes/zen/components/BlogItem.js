import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * Zen 文章列表项
 * 书页目录式：小号日期（左）/ 标题 / 摘要 / tag 列表（右下）
 * 每条之间以朱红半角点分隔或细线，不使用按钮
 */
export const BlogItem = props => {
  const { post } = props
  const { NOTION_CONFIG } = useGlobal()
  const showPageCover = siteConfig('ZEN_POST_COVER_ENABLE', false, CONFIG)
  const showPreview =
    siteConfig('POST_LIST_PREVIEW', false, NOTION_CONFIG) && post.blockMap

  return (
    <article
      key={post.id}
      className='zen-blog-item py-10 md:py-12'
      style={{ borderBottom: '1px solid var(--zen-divider)' }}>
      {/* 顶部 meta：日期 · 分类 */}
      <header className='zen-meta mb-3 flex flex-wrap items-center gap-x-3 gap-y-1'>
        <SmartLink
          href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
          className='inline-flex items-center'>
          <span className='uppercase tracking-widest text-xs'>
            {post.date?.start_date || post.createdTime}
          </span>
        </SmartLink>
        {post.category && (
          <>
            <span
              style={{
                width: 3,
                height: 3,
                backgroundColor: 'var(--zen-vermillion)',
                display: 'inline-block',
                borderRadius: '50%',
                opacity: 0.6
              }}
            />
            <SmartLink
              href={`/category/${post.category}`}
              className='uppercase tracking-widest text-xs hover:text-[color:var(--zen-vermillion)] transition-colors duration-200'>
              {post.category}
            </SmartLink>
          </>
        )}
        <span className='ml-auto'>
          <TwikooCommentCount post={post} />
        </span>
      </header>

      <div className={showPageCover ? 'md:flex md:gap-6' : ''}>
        {showPageCover && post?.pageCoverThumbnail && (
          <SmartLink
            href={post.href}
            passHref
            legacyBehavior>
            <div
              className='flex-none mb-4 md:mb-0 md:w-48 overflow-hidden cursor-pointer'
              style={{ border: '1px solid var(--zen-divider)' }}>
              <LazyImage
                src={post.pageCoverThumbnail}
                className='w-full h-32 md:h-full object-cover'
              />
            </div>
          </SmartLink>
        )}

        <div className='flex-1 min-w-0'>
          {/* 标题——大号宋体 */}
          <h2 className='mb-3'>
            <SmartLink
              href={post.href}
              className='zen-article-title text-xl md:text-2xl'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post.pageIcon} />
              )}
              {post.title}
            </SmartLink>
          </h2>

          {/* 摘要 */}
          <div
            className='mb-4 text-[0.95rem] md:text-base leading-[1.92]'
            style={{ color: 'var(--zen-indigo)' }}>
            {!showPreview && (
              <>
                {post.summary}
                {post.summary && <span>…</span>}
              </>
            )}
            {showPreview && post?.blockMap && (
              <div className='overflow-ellipsis truncate'>
                <NotionPage post={post} />
              </div>
            )}
          </div>

          {/* 底部：tags + 「读」链接 */}
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex flex-wrap gap-2'>
              {post?.tags &&
                post?.tags?.length > 0 &&
                post?.tags.slice(0, 4).map(t => (
                  <SmartLink key={t} href={`/tag/${t}`}>
                    <span className='zen-tag cursor-pointer'>{t}</span>
                  </SmartLink>
                ))}
            </div>

            <SmartLink
              href={post.href}
              className='zen-menu-link text-xs uppercase tracking-widest whitespace-nowrap'>
              Read ›
            </SmartLink>
          </div>
        </div>
      </div>
    </article>
  )
}
