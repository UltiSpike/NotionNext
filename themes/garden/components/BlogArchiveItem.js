import SmartLink from '@/components/SmartLink'

/**
 * 归档分组文章 —— 树干分支样式
 */
export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  return (
    <div key={archiveTitle} className='mb-10'>
      <div
        id={archiveTitle}
        className='pt-12 pb-5 font-serif-garden text-4xl flex items-baseline gap-3'
        style={{ color: 'var(--garden-text)' }}
      >
        <span
          className='garden-marker italic'
          style={{ color: 'var(--garden-coral)' }}
        >
          {archiveTitle}
        </span>
        <span
          className='text-sm font-sans uppercase tracking-widest'
          style={{ color: 'var(--garden-text-soft)' }}
        >
          {archivePosts[archiveTitle]?.length || 0} 篇
        </span>
      </div>

      <ul
        className='pl-5 border-l-2 border-dashed'
        style={{ borderColor: 'var(--garden-coral-soft)' }}
      >
        {archivePosts[archiveTitle].map(post => (
          <li
            key={post.id}
            className='relative py-2 pl-4 text-sm md:text-base transition-all hover:pl-6'
          >
            <span
              className='absolute -left-[9px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full'
              style={{
                background: 'var(--garden-cream)',
                border: '2px solid var(--garden-coral)'
              }}
            />
            <div id={post?.publishDay} className='flex items-baseline gap-3'>
              <span
                className='font-mono text-xs'
                style={{ color: 'var(--garden-text-soft)' }}
              >
                {post.date?.start_date}
              </span>
              <SmartLink
                href={post?.href}
                passHref
                className='hover:underline'
                style={{ color: 'var(--garden-text)' }}
              >
                {post.title}
              </SmartLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
