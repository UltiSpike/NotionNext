import SmartLink from '@/components/SmartLink'

/**
 * 归档分组 — 年月标题 + 左侧朱红细竖线的列表
 */
export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  return (
    <section key={archiveTitle} className='mb-10'>
      <h2
        id={archiveTitle}
        className='pt-10 pb-4 zen-heading text-2xl'
        style={{
          fontFamily: 'var(--zen-font-cjk)',
          letterSpacing: '0.05em'
        }}>
        {archiveTitle}
      </h2>

      <ul
        className='pl-4 space-y-2'
        style={{ borderLeft: '1px solid var(--zen-divider)' }}>
        {archivePosts[archiveTitle].map(post => (
          <li
            key={post.id}
            className='pl-3 py-1 transition-colors duration-200 hover:border-[color:var(--zen-vermillion)]'
            style={{ borderLeft: '2px solid transparent' }}>
            <div id={post?.publishDay} className='flex items-baseline gap-3'>
              <span
                className='zen-meta text-xs tabular-nums flex-none uppercase tracking-widest'
                style={{ minWidth: '5.5rem' }}>
                {post.date?.start_date}
              </span>
              <SmartLink
                href={post?.href}
                passHref
                className='zen-article-title text-sm md:text-base'>
                {post.title}
              </SmartLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
