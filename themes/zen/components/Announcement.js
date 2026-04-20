import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  if (!post) {
    return <></>
  }
  return (
    <div id='announcement-content' className={`px-3 ${className || ''}`}>
      <div
        className='zen-meta uppercase tracking-widest text-xs mb-3'
        style={{ color: 'var(--zen-gray)' }}>
        Notice
      </div>
      <NotionPage post={post} />
    </div>
  )
}
export default Announcement
