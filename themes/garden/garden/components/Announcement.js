import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * 公告（通常用于站点置顶说明）
 */
const Announcement = ({ post }) => {
  if (!post) return <></>
  return (
    <div
      id='announcement-content'
      className='text-sm'
      style={{ color: 'var(--garden-text-soft)' }}
    >
      <NotionPage post={post} />
    </div>
  )
}

export default Announcement
