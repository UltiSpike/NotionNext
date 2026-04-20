import { siteConfig } from '@/lib/config'

/**
 * 通用标题块（归档、分类、标签等页面）
 */
export const Title = props => {
  const { post } = props
  const title = post?.title || siteConfig('DESCRIPTION')
  const description = post?.description || siteConfig('AUTHOR')

  return (
    <div
      className='text-center px-6 py-10 mb-6 rounded-2xl'
      style={{
        background: 'var(--garden-cream-deep)',
        border: '1px solid var(--garden-line)'
      }}
    >
      <h1
        className='font-serif-garden text-2xl md:text-4xl mb-2'
        style={{ color: 'var(--garden-text)' }}
      >
        {title}
      </h1>
      <p
        className='font-serif-garden italic leading-relaxed'
        style={{ color: 'var(--garden-text-soft)' }}
      >
        {description}
      </p>
    </div>
  )
}
