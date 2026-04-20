import SmartLink from '@/components/SmartLink'
import { RecentComments } from '@waline/client'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 最近评论（Waline）示例
 */
const ExampleRecentComments = () => {
  const [comments, updateComments] = useState([])
  const [onLoading, changeLoading] = useState(true)
  useEffect(() => {
    RecentComments({
      serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
      count: 5
    }).then(({ comments }) => {
      changeLoading(false)
      updateComments(comments)
    })
  }, [])

  return (
    <>
      {onLoading && (
        <div style={{ color: 'var(--garden-text-soft)' }}>
          Loading...<i className='ml-2 fas fa-spinner animate-spin' />
        </div>
      )}
      {!onLoading && comments?.length === 0 && (
        <div style={{ color: 'var(--garden-text-soft)' }}>No Comments</div>
      )}
      {!onLoading &&
        comments?.length > 0 &&
        comments.map(comment => (
          <div key={comment.objectId} className='pb-3'>
            <div
              className='text-xs'
              style={{ color: 'var(--garden-text-soft)' }}
              dangerouslySetInnerHTML={{ __html: comment.comment }}
            />
            <div
              className='text-xs text-right cursor-pointer hover:underline pt-1'
              style={{ color: 'var(--garden-coral)' }}
            >
              <SmartLink
                href={{
                  pathname: comment.url,
                  hash: comment.objectId,
                  query: { target: 'comment' }
                }}
              >
                -- {comment.nick}
              </SmartLink>
            </div>
          </div>
        ))}
    </>
  )
}

export default ExampleRecentComments
