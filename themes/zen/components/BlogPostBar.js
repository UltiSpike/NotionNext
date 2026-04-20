import { useGlobal } from '@/lib/global'

/**
 * 列表页顶部的提示栏（标签 / 分类筛选时）
 */
export default function BlogPostBar(props) {
  const { tag, category } = props
  const { locale } = useGlobal()

  if (tag) {
    return (
      <div className='py-8 md:py-12 text-center'>
        <div className='zen-meta uppercase tracking-[0.25em] text-xs mb-3'>
          {locale.COMMON.TAGS}
        </div>
        <h1
          className='zen-heading text-2xl md:text-3xl'
          style={{ fontFamily: 'var(--zen-font-cjk)' }}>
          # {tag}
        </h1>
        <div className='zen-divider-accent' />
      </div>
    )
  } else if (category) {
    return (
      <div className='py-8 md:py-12 text-center'>
        <div className='zen-meta uppercase tracking-[0.25em] text-xs mb-3'>
          {locale.COMMON.CATEGORY}
        </div>
        <h1
          className='zen-heading text-2xl md:text-3xl'
          style={{ fontFamily: 'var(--zen-font-cjk)' }}>
          {category}
        </h1>
        <div className='zen-divider-accent' />
      </div>
    )
  }
  return <></>
}
