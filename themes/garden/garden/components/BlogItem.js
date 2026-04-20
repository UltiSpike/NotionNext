import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 文章卡片 —— 明信片式，便签角 + hover 微旋转
 * 交替左右方向，整个列表看起来像笔记本里的贴纸。
 */
export const BlogItem = props => {
  const { post, index = 0 } = props
  const showPageCover = siteConfig('GARDEN_POST_COVER_ENABLE', true, CONFIG)
  const tilt = index % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]'

  return (
    <article
      key={post.id}
      className={`garden-card garden-sticky-corner relative ${tilt} rounded-xl border p-5 md:p-7 mb-8`}
      style={{
        background: 'var(--garden-bg-raise)',
        borderColor: 'var(--garden-line)',
        boxShadow: '0 4px 14px -8px rgba(42,42,42,0.1)'
      }}
    >
      <div className='flex flex-col md:flex-row gap-5'>
        {/* 封面 */}
        {showPageCover && post?.pageCoverThumbnail && (
          <div className='md:w-48 md:shrink-0'>
            <SmartLink href={post.href} passHref legacyBehavior>
              <div
                className='overflow-hidden rounded-lg aspect-[4/3] md:aspect-square border'
                style={{ borderColor: 'var(--garden-line)' }}
              >
                <LazyImage
                  src={post.pageCoverThumbnail}
                  className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                />
              </div>
            </SmartLink>
          </div>
        )}

        <div className='flex-1 min-w-0'>
          {/* 分类胶囊 */}
          {post.category && (
            <SmartLink href={`/category/${post.category}`}>
              <span
                className='inline-block text-xs font-semibold uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full'
                style={{
                  color: 'var(--garden-moss)',
                  background: 'rgba(122,155,118,0.12)'
                }}
              >
                <i className='fa-regular fa-folder mr-1' />
                {post.category}
              </span>
            </SmartLink>
          )}

          {/* 标题 */}
          <h2 className='mb-3'>
            <SmartLink
              href={post.href}
              className='font-serif-garden font-bold text-2xl md:text-3xl leading-tight hover:text-[color:var(--garden-coral)] transition-colors'
              style={{ color: 'var(--garden-text)' }}
            >
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post.pageIcon} />
              )}
              {post.title}
            </SmartLink>
          </h2>

          {/* 摘要 */}
          {post.summary && (
            <p
              className='text-base leading-relaxed mb-4 line-clamp-3'
              style={{ color: 'var(--garden-text-soft)' }}
            >
              {post.summary}
            </p>
          )}

          {/* 元信息 */}
          <div
            className='flex flex-wrap items-center gap-3 text-xs'
            style={{ color: 'var(--garden-text-soft)' }}
          >
            <SmartLink
              className='inline-flex items-center hover:text-[color:var(--garden-coral)] transition-colors'
              href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            >
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                className='mr-1'
                aria-hidden
              >
                <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
                <path d='M12 7v5l3 2' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
              </svg>
              {post.date?.start_date || post.createdTime}
            </SmartLink>

            <span className='inline-flex items-center'>
              <TwikooCommentCount post={post} />
            </span>

            {post?.tags?.length > 0 && (
              <span className='inline-flex flex-wrap gap-1.5'>
                {post.tags.map(t => (
                  <SmartLink
                    key={t}
                    href={`/tag/${t}`}
                    className='px-2 py-0.5 rounded-full border hover:border-[color:var(--garden-coral)] hover:text-[color:var(--garden-coral)] transition-colors'
                    style={{ borderColor: 'var(--garden-line)' }}
                  >
                    #{t}
                  </SmartLink>
                ))}
              </span>
            )}

            {/* 箭头进入 */}
            <SmartLink
              href={post.href}
              className='ml-auto inline-flex items-center font-semibold'
              style={{ color: 'var(--garden-coral)' }}
            >
              读下去
              <svg
                width='14'
                height='14'
                viewBox='0 0 20 12'
                fill='none'
                className='ml-1'
                aria-hidden
              >
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
      </div>
    </article>
  )
}
