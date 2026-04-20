import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'

/**
 * 文章头信息 — 书籍章首页气质
 * 顺序：栏目（小号大写）/ 标题（大号宋体）/ 朱红短线 / meta（作者 · 日期 · 标签）
 */
export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()

  return (
    <section className='pt-8 pb-6'>
      {/* 分类作为栏目签 */}
      {post?.category && (
        <div className='zen-meta uppercase tracking-[0.25em] text-xs mb-4 text-center'>
          <SmartLink
            href={`/category/${post.category}`}
            className='hover:text-[color:var(--zen-vermillion)] transition-colors duration-200'>
            {post.category}
          </SmartLink>
        </div>
      )}

      {/* 标题——居中大号宋体 */}
      <h1
        className='zen-article-title text-center font-semibold'
        style={{
          fontSize: 'clamp(1.65rem, 3.2vw, 2.25rem)',
          lineHeight: 1.4,
          letterSpacing: '0.05em'
        }}>
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        {post?.title}
      </h1>

      {/* 朱红短线（章首装饰） */}
      <div className='zen-divider-accent' />

      {/* meta 一行 */}
      {post?.type !== 'Page' && (
        <div
          className='zen-meta flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs mb-2'
          style={{ letterSpacing: '0.08em' }}>
          <span>
            <a
              href={siteConfig('ZEN_AUTHOR_LINK', null, CONFIG)}
              className='hover:text-[color:var(--zen-vermillion)] transition-colors duration-200'>
              {siteConfig('AUTHOR')}
            </a>
          </span>
          <span
            style={{
              width: 3,
              height: 3,
              backgroundColor: 'var(--zen-vermillion)',
              opacity: 0.55,
              borderRadius: '50%'
            }}
          />
          <SmartLink
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            className='hover:text-[color:var(--zen-vermillion)] transition-colors duration-200'>
            {post?.publishDay}
          </SmartLink>
          {post?.lastEditedDay && post.lastEditedDay !== post.publishDay && (
            <>
              <span
                style={{
                  width: 3,
                  height: 3,
                  backgroundColor: 'var(--zen-vermillion)',
                  opacity: 0.55,
                  borderRadius: '50%'
                }}
              />
              <span className='opacity-70'>
                {locale.COMMON.LAST_EDITED_TIME}: {post.lastEditedDay}
              </span>
            </>
          )}
        </div>
      )}

      {/* 标签 */}
      {post?.tags && post?.tags?.length > 0 && (
        <div className='flex flex-wrap justify-center gap-2 mt-4'>
          {post.tags.map(t => (
            <SmartLink key={t} href={`/tag/${t}`}>
              <span className='zen-tag cursor-pointer'>{t}</span>
            </SmartLink>
          ))}
        </div>
      )}
    </section>
  )
}
