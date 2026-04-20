import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 相关阅读推荐 — 书末附录样式
 */
const RecommendPosts = ({ recommendPosts }) => {
  const { locale } = useGlobal()
  if (
    !siteConfig('ZEN_ARTICLE_RECOMMEND_POSTS', null, CONFIG) ||
    !recommendPosts ||
    recommendPosts.length < 1
  ) {
    return <></>
  }

  return (
    <aside className='my-10 py-6'>
      <div className='zen-meta uppercase tracking-widest text-xs mb-4'>
        {locale.COMMON.RELATE_POSTS}
      </div>
      <ul className='space-y-2'>
        {recommendPosts.map(post => (
          <li key={post.id} className='py-1'>
            <SmartLink
              href={`/${post.slug}`}
              className='zen-article-title text-sm md:text-base'>
              — {post.title}
            </SmartLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
export default RecommendPosts
