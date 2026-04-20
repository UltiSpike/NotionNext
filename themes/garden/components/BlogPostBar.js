import { useGlobal } from '@/lib/global'

/**
 * 文章列表顶部上下文条（分类/标签筛选时显示）
 */
export default function BlogPostBar(props) {
  const { tag, category } = props
  const { locale } = useGlobal()

  if (!tag && !category) return <></>

  const label = tag ? locale.COMMON.TAGS : locale.COMMON.CATEGORY
  const value = tag || category
  const icon = tag ? 'fa-tag' : 'fa-folder-open'

  return (
    <div
      className='mb-6 inline-flex items-baseline gap-2 pb-2 border-b-2'
      style={{ borderColor: 'var(--garden-coral)' }}
    >
      <i
        className={`fa-solid ${icon}`}
        style={{ color: 'var(--garden-coral)' }}
      />
      <span
        className='text-xs uppercase tracking-widest'
        style={{ color: 'var(--garden-text-soft)' }}
      >
        {label}
      </span>
      <span
        className='font-serif-garden text-2xl garden-marker'
        style={{ color: 'var(--garden-text)' }}
      >
        {value}
      </span>
    </div>
  )
}
