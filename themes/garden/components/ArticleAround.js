import SmartLink from '@/components/SmartLink'

/**
 * 上一篇 / 下一篇
 */
export default function ArticleAround({ prev, next }) {
  if (!prev || !next) return <></>

  return (
    <section
      className='my-8 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'
      style={{ color: 'var(--garden-text)' }}
    >
      {prev && (
        <SmartLink
          href={`/${prev.slug}`}
          passHref
          className='group block rounded-xl border px-4 py-3 transition-all hover:border-[color:var(--garden-coral)]'
          style={{ borderColor: 'var(--garden-line)' }}
        >
          <div
            className='text-xs uppercase tracking-widest mb-1'
            style={{ color: 'var(--garden-text-soft)' }}
          >
            ← 上一篇
          </div>
          <div
            className='font-serif-garden text-base truncate group-hover:text-[color:var(--garden-coral)]'
          >
            {prev.title}
          </div>
        </SmartLink>
      )}
      {next && (
        <SmartLink
          href={`/${next.slug}`}
          passHref
          className='group block rounded-xl border px-4 py-3 transition-all hover:border-[color:var(--garden-coral)] text-right'
          style={{ borderColor: 'var(--garden-line)' }}
        >
          <div
            className='text-xs uppercase tracking-widest mb-1'
            style={{ color: 'var(--garden-text-soft)' }}
          >
            下一篇 →
          </div>
          <div
            className='font-serif-garden text-base truncate group-hover:text-[color:var(--garden-coral)]'
          >
            {next.title}
          </div>
        </SmartLink>
      )}
    </section>
  )
}
