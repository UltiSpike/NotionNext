import { siteConfig } from '@/lib/config'

/**
 * 标题栏 — Zen 风格（章页居中、朱红细线）
 */
export const Title = props => {
  const { post } = props
  const title = post?.title || siteConfig('DESCRIPTION')
  const description = post?.description || siteConfig('AUTHOR')

  return (
    <div
      className='text-center px-6 py-16 mb-8'
      style={{
        backgroundColor: 'var(--zen-paper)',
        borderBottom: '1px solid var(--zen-divider)'
      }}>
      <h1
        className='zen-heading text-xl md:text-4xl pb-4'
        style={{
          fontFamily: 'var(--zen-font-cjk)',
          letterSpacing: '0.06em'
        }}>
        {title}
      </h1>
      <div className='zen-divider-accent' />
      <p
        className='leading-loose text-sm italic'
        style={{ color: 'var(--zen-indigo)' }}>
        {description}
      </p>
    </div>
  )
}
