import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'

/**
 * 回到顶部 — Zen 样式：方形细边，纯色，无阴影
 */
const JumpToTopButton = () => {
  const { locale } = useGlobal()
  const [show, switchShow] = useState(false)
  const scrollListener = () => {
    const scrollY = window.pageYOffset
    const shouldShow = scrollY > 200
    if (shouldShow !== show) {
      switchShow(shouldShow)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [show])

  return (
    <div
      title={locale.POST.TOP}
      className={`${show ? 'opacity-100' : 'invisible opacity-0'} transition-opacity duration-300 flex items-center justify-center cursor-pointer h-10 w-10 hover:text-[color:var(--zen-vermillion)] hover:border-[color:var(--zen-vermillion)]`}
      style={{
        backgroundColor: 'var(--zen-bg)',
        border: '1px solid var(--zen-divider)',
        color: 'var(--zen-gray)'
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <i className='fas fa-angle-up' />
    </div>
  )
}

export default JumpToTopButton
