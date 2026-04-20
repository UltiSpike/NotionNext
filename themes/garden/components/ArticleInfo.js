import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'

/**
 * 文章头部信息 —— 大号衬线标题 + 手绘分隔
 */
export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()

  return (
    <section className='mt-4 mb-8'>
      <h1
        className='font-serif-garden font-bold text-3xl md:text-5xl leading-tight mb-5'
        style={{ color: 'var(--garden-text)' }}
      >
        {siteConfig('POST_TITLE_ICON') && (
          <NotionIcon icon={post?.pageIcon} />
        )}
        {post?.title}
      </h1>

      {/* 手绘分隔 */}
      <svg
        aria-hidden
        className='mb-5'
        width='100'
        height='8'
        viewBox='0 0 100 8'
        fill='none'
      >
        <path
          d='M0 4 Q 8 0 16 4 T 32 4 T 48 4 T 64 4 T 80 4 T 100 4'
          stroke='var(--garden-coral)'
          strokeWidth='1.8'
          strokeLinecap='round'
          fill='none'
        />
      </svg>

      {post?.type !== 'Page' && (
        <div
          className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm'
          style={{ color: 'var(--garden-text-soft)' }}
        >
          <span>
            <i className='fa-regular fa-user mr-1.5' />
            <a
              href={siteConfig('GARDEN_AUTHOR_LINK', null, CONFIG)}
              className='hover:text-[color:var(--garden-coral)]'
            >
              {siteConfig('AUTHOR')}
            </a>
          </span>

          <SmartLink
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            className='hover:text-[color:var(--garden-coral)]'
          >
            <i className='fa-regular fa-clock mr-1.5' />
            {post?.publishDay}
          </SmartLink>

          {post?.category && (
            <SmartLink
              href={`/category/${post?.category}`}
              className='hover:text-[color:var(--garden-coral)]'
            >
              <i className='fa-regular fa-folder mr-1.5' />
              {post.category}
            </SmartLink>
          )}

          {post?.tags?.length > 0 && (
            <span className='inline-flex flex-wrap gap-1.5'>
              {post.tags.map(t => (
                <SmartLink
                  key={t}
                  href={`/tag/${t}`}
                  className='px-2 py-0.5 rounded-full border text-xs hover:border-[color:var(--garden-coral)] hover:text-[color:var(--garden-coral)] transition-colors'
                  style={{ borderColor: 'var(--garden-line)' }}
                >
                  #{t}
                </SmartLink>
              ))}
            </span>
          )}

          <span
            className='ml-auto text-xs'
            style={{ color: 'var(--garden-text-soft)' }}
          >
            {locale.COMMON.LAST_EDITED_TIME}: {post?.lastEditedDay}
          </span>
        </div>
      )}
    </section>
  )
}
