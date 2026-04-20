import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

/**
 * 文章目录 —— 温暖珊瑚色激活项
 */
const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null)
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const throttleMs = 200
    const actionSectionScrollSpy = throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = activeSection
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        break
      }
      setActiveSection(currentSectionId)
      const index = post?.toc?.findIndex(
        obj => uuidToId(obj.id) === currentSectionId
      )
      tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
    }, throttleMs)

    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [post])

  if (!post || !post?.toc || post?.toc?.length < 1) {
    return <></>
  }

  return (
    <div>
      <div
        className='mb-3 text-xs uppercase tracking-widest font-semibold'
        style={{ color: 'var(--garden-coral)' }}
      >
        <i className='mr-1 fas fa-stream' />
        {locale.COMMON.TABLE_OF_CONTENTS}
      </div>

      <div
        className='overflow-y-auto overscroll-none max-h-36 lg:max-h-96 scroll-hidden'
        ref={tRef}
      >
        <nav className='h-full'>
          {post?.toc?.map(tocItem => {
            const id = uuidToId(tocItem.id)
            const isActive = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`block border-l pl-3 py-1 text-sm transition-all notion-table-of-contents-item-indent-level-${tocItem.indentLevel} catalog-item`}
                style={{
                  borderColor: isActive
                    ? 'var(--garden-coral)'
                    : 'var(--garden-line)',
                  color: isActive
                    ? 'var(--garden-coral)'
                    : 'var(--garden-text-soft)',
                  fontWeight: isActive ? 700 : 400
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: tocItem.indentLevel * 12
                  }}
                  className='truncate'
                >
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
