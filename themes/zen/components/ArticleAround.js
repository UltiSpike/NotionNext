import SmartLink from '@/components/SmartLink'

/**
 * 上一篇 / 下一篇
 * 两行式：小号标签 "Previous / Next" + 标题
 */
export default function ArticleAround({ prev, next }) {
  if (!prev && !next) {
    return <></>
  }
  return (
    <nav
      className='grid grid-cols-1 md:grid-cols-2 gap-6 my-10 py-6'
      style={{
        borderTop: '1px solid var(--zen-divider)',
        borderBottom: '1px solid var(--zen-divider)'
      }}>
      <div>
        {prev && (
          <SmartLink href={`/${prev.slug}`} passHref className='block group'>
            <div className='zen-meta uppercase tracking-widest text-xs mb-2'>
              ← 上一篇
            </div>
            <div className='zen-article-title text-sm md:text-base group-hover:text-[color:var(--zen-vermillion)] transition-colors duration-200'>
              {prev.title}
            </div>
          </SmartLink>
        )}
      </div>
      <div className='md:text-right'>
        {next && (
          <SmartLink href={`/${next.slug}`} passHref className='block group'>
            <div className='zen-meta uppercase tracking-widest text-xs mb-2'>
              下一篇 →
            </div>
            <div className='zen-article-title text-sm md:text-base group-hover:text-[color:var(--zen-vermillion)] transition-colors duration-200'>
              {next.title}
            </div>
          </SmartLink>
        )}
      </div>
    </nav>
  )
}
