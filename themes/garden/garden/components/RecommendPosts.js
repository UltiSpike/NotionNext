import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 相关文章推荐
 */
const RecommendPosts = ({ recommendPosts }) => {
  const { locale } = useGlobal()
  if (
    !siteConfig('GARDEN_ARTICLE_RECOMMEND_POSTS', null, CONFIG) ||
    !recommendPosts ||
    recommendPosts.length < 1
  ) {
    return <></>
  }

  return (
    <div
      className='my-6 rounded-xl border p-5'
      style={{
        background: 'var(--garden-bg-raise)',
        borderColor: 'var(--garden-line)'
      }}
    >
      <div
        className='font-serif-garden italic text-xl mb-3'
        style={{ color: 'var(--garden-coral)' }}
      >
        <span className='mr-2'>🌿</span>
        {locale.COMMON.RELATE_POSTS}
      </div>
      <ul className='space-y-2'>
        {recommendPosts.map(post => (
          <li key={post.id} className='flex items-baseline gap-2'>
            <span style={{ color: 'var(--garden-mustard)' }}>·</span>
            <SmartLink
              href={`/${post.slug}`}
              className='hover:text-[color:var(--garden-coral)] hover:underline transition-colors'
              style={{ color: 'var(--garden-text)' }}
            >
              {post.title}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default RecommendPosts
