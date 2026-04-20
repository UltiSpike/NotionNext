import SmartLink from '@/components/SmartLink'
import { RecentComments } from '@waline/client'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 最近评论
 * @see https://waline.js.org/guide/get-started.html
 */
const ExampleRecentComments = props => {
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
        <div className='zen-meta text-xs'>
          Loading…
          <i className='ml-2 fas fa-spinner animate-spin' />
        </div>
      )}
      {!onLoading && comments && comments.length === 0 && (
        <div className='zen-meta text-xs'>No Comments</div>
      )}
      {!onLoading &&
        comments &&
        comments.length > 0 &&
        comments.map(comment => (
          <div
            key={comment.objectId}
            className='pb-3 mb-3'
            style={{ borderBottom: '1px solid var(--zen-divider)' }}>
            <div
              className='text-xs waline-recent-content wl-content'
              style={{ color: 'var(--zen-indigo)' }}
              dangerouslySetInnerHTML={{ __html: comment.comment }}
            />
            <div
              className='zen-meta text-xs text-right pt-1 cursor-pointer'
              style={{ color: 'var(--zen-gray)' }}>
              <SmartLink
                href={{
                  pathname: comment.url,
                  hash: comment.objectId,
                  query: { target: 'comment' }
                }}>
                — {comment.nick}
              </SmartLink>
            </div>
          </div>
        ))}
    </>
  )
}

export default ExampleRecentComments
