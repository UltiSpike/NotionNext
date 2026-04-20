import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

/**
 * 目录导航 — Zen 样式
 * 左侧细线，当前项朱红高亮
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
    <div className='px-1'>
      <div
        className='zen-meta uppercase tracking-widest text-xs mb-4'
        style={{ color: 'var(--zen-gray)' }}>
        {locale.COMMON.TABLE_OF_CONTENTS}
      </div>

      <div
        className='overflow-y-auto overscroll-none max-h-[70vh] scroll-hidden'
        ref={tRef}>
        <nav className='h-full'>
          {post?.toc?.map(tocItem => {
            const id = uuidToId(tocItem.id)
            const active = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`block py-1 text-sm transition-colors duration-200 catalog-item notion-table-of-contents-item-indent-level-${tocItem.indentLevel}`}
                style={{
                  borderLeft: active
                    ? '2px solid var(--zen-vermillion)'
                    : '1px solid var(--zen-divider)',
                  paddingLeft: '0.75rem',
                  color: active
                    ? 'var(--zen-vermillion)'
                    : 'var(--zen-indigo)',
                  fontWeight: active ? 500 : 400,
                  fontFamily: 'var(--zen-font-cjk)'
                }}>
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: tocItem.indentLevel * 12
                  }}
                  className='truncate'>
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
